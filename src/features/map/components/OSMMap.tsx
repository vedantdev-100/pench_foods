import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { useAuthStore } from "@/store/authStore";
import { useTrackingStore } from "@/store/trackingStore";

export default function OSMMap() {
  const webRef = useRef<WebView>(null);
  const [webViewReady, setWebViewReady] = useState(false);
  const [routeData, setRouteData] = useState<any>(null);

  const token = useAuthStore((s) => s.accessToken);
  const domain_name = useAuthStore((s) => s.domain_name);

  const location = useTrackingStore((s) => s.location);
  const startTracking = useTrackingStore((s) => s.startTracking);
  const stopTracking = useTrackingStore((s) => s.stopTracking);

  // ✅ 1. Request permission + start GPS on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("📍 Permission:", status);
      if (status !== "granted") return;
      await startTracking();
    })();
    return () => stopTracking();
  }, []);

  // ✅ 2. Fetch route stops
  useEffect(() => {
    const fetchRoute = async () => {
      if (!token || !domain_name) return;
      try {
        const url = `https://${domain_name}/api/erp/orders/driver/my-route/`;
        console.log("🌍 Fetching:", url);
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          console.warn("⚠️ Route fetch failed:", res.status);
          return;
        }
        const data = await res.json();
        setRouteData(data);
      } catch (err) {
        console.error("❌ Route fetch error:", err);
      }
    };
    fetchRoute();
  }, [token, domain_name]);

  // ✅ 3. Inject stops into WebView
  useEffect(() => {
    if (!routeData || !webViewReady || !webRef.current) return;
    const stops = routeData.stops || [];
    webRef.current.injectJavaScript(`
      (function() {
        if (window.loadStops) window.loadStops(${JSON.stringify(stops)});
      })();
      true;
    `);
  }, [routeData, webViewReady]);

  // ✅ 4. Inject live location into WebView
  useEffect(() => {
    if (!location || !webViewReady || !webRef.current) return;
    webRef.current.injectJavaScript(`
      if (window.updateUserLocation) {
        window.updateUserLocation({ lat: ${location.lat}, lng: ${location.lng} });
      }
      true;
    `);
  }, [location, webViewReady]);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <style>html, body, #map { height: 100%; margin: 0; padding: 0; }</style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map').setView([20.5937, 78.9629], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

    var userMarker = null;
    var customerMarkers = [];
    var routePolyline = null;

    window.updateUserLocation = function(latlng) {
      if (!userMarker) {
        userMarker = L.marker([latlng.lat, latlng.lng]).addTo(map).bindPopup("📍 You");
        map.setView([latlng.lat, latlng.lng], 15);
      } else {
        userMarker.setLatLng([latlng.lat, latlng.lng]);
      }
      if (customerMarkers.length) drawRouteToCustomers(latlng);
    };

    window.loadStops = function(stops) {
      customerMarkers = [];
      stops.forEach(stop => {
        const marker = L.marker([stop.latitude, stop.longitude]).addTo(map)
          .bindPopup(stop.customer_name + "<br/>" + stop.address);
        customerMarkers.push(marker);
      });
      if (userMarker) {
        const allPoints = customerMarkers.map(m => m.getLatLng()).concat(userMarker.getLatLng());
        map.fitBounds(allPoints);
      }
    };

    async function drawRouteToCustomers(user) {
      if (!customerMarkers.length) return;
      const coords = [[user.lng, user.lat]];
      customerMarkers.forEach(m => coords.push([m.getLatLng().lng, m.getLatLng().lat]));
      const coordString = coords.map(c => c.join(',')).join(';');
      const url = \`https://router.project-osrm.org/route/v1/driving/\${coordString}?overview=full&geometries=geojson\`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (json.code === "Ok") {
          const route = json.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
          if (routePolyline) map.removeLayer(routePolyline);
          routePolyline = L.polyline(route, { color: '#3b82f6', weight: 4, dashArray: '6,10' }).addTo(map);
        }
      } catch (err) {
        console.error("OSRM routing failed:", err);
      }
    }
  </script>
</body>
</html>`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <StatusBar barStyle="light-content" />
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onLoad={() => {
          console.log("🗺️ WebView ready");
          setWebViewReady(true);
        }}
      />
    </SafeAreaView>
  );
}


// import React, { useEffect, useRef, useState } from "react";
// import { StatusBar } from "react-native";
// import { WebView } from "react-native-webview";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useAuthStore } from "@/store/authStore";
// import { useTrackingStore } from "@/store/trackingStore";
// import * as Location from "expo-location";

// export default function OSMMap() {
//   const webRef = useRef<WebView>(null);

//   const token = useAuthStore((s) => s.accessToken);
//   const domain_name = useAuthStore((s) => s.domain_name);
//   const route_id = useAuthStore((s) => s.route_id);

//   const domain = domain_name ?? "nagpur.192.168.1.195.nip.io";

//   const location = useTrackingStore((s) => s.location);
//   const startTrip = useTrackingStore((s) => s.startTrip);
//   const connectSocket = useTrackingStore((s) => s.connectSocket);
//   const startTracking = useTrackingStore((s) => s.startTracking);
//   const stopTracking = useTrackingStore((s) => s.stopTracking);

//   const [routeData, setRouteData] = useState<any>(null);

//   useEffect(() => {
//     const requestPermission = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       console.log("📍 Location permission status:", status);

//       if (status !== "granted") {
//         console.warn("⚠️ Location permission denied");
//         return;
//       }

//       // Get one-time current location immediately
//       const current = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });
//       console.log("📍 Current location:", current.coords);
//     };

//     requestPermission();
//   }, []); // ← runs once on mount, no dependencies

//   // Fetch route & customer stops
//   // useEffect(() => {
//   //   const fetchRoute = async () => {
//   //     if (!token || !domain_name) {
//   //       console.log("⚠️ Missing token or domain_name");
//   //       return;
//   //     }

//   //     try {
//   //       // ✅ Always use domain_name — route_id not needed
//   //       const url = `https://${domain_name}/api/erp/orders/driver/my-route/`;
//   //       console.log("🌍 Fetching route URL:", url);

//   //       const res = await fetch(url, {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });

//   //       console.log("📡 Status:", res.status);
//   //       const text = await res.text();
//   //       console.log("📦 Raw response:", text.slice(0, 300));

//   //       if (!res.ok) {
//   //         console.error(`❌ HTTP ${res.status}`);
//   //         return;
//   //       }

//   //       const data = JSON.parse(text);
//   //       setRouteData(data);
//   //     } catch (err) {
//   //       console.error("❌ Failed to fetch route:", err);
//   //     }
//   //   };

//   //   fetchRoute();
//   // }, [token, domain_name]); // ← removed route_id dependency

//   // Inject customer stops into WebView

//   useEffect(() => {
//     const fetchRoute = async () => {
//       if (!token || !domain_name) {
//         console.log("⚠️ Missing token or domain_name");
//         return;
//       }

//       try {
//         // ✅ Always use domain_name — route_id not needed
//         const url = `https://${domain_name}/api/erp/orders/driver/my-route/`;
//         console.log("🌍 Fetching route URL:", url);

//         const res = await fetch(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("📡 Status:", res.status);
//         const text = await res.text();
//         console.log("📦 Raw response:", text.slice(0, 300));

//         if (!res.ok) {
//           console.error(`❌ HTTP ${res.status}`);
//           return;
//         }

//         const data = JSON.parse(text);
//         setRouteData(data);
//       } catch (err) {
//         console.error("❌ Failed to fetch route:", err);
//       }
//     };

//     fetchRoute();
//   }, [token, domain_name]); // ← removed route_id dependency

//   useEffect(() => {
//     if (routeData && webRef.current) {
//       const stops = routeData.stops || [];
//       webRef.current.injectJavaScript(`
//         (function() {
//           if (window.loadStops) window.loadStops(${JSON.stringify(stops)});
//         })();
//       `);
//     }
//   }, [routeData]);

//   // Inject live location into WebView
//   useEffect(() => {
//     if (location && webRef.current) {
//       webRef.current.injectJavaScript(`
//         if (window.updateUserLocation) {
//           window.updateUserLocation({ lat: ${location.lat}, lng: ${location.lng} });
//         }
//       `);
//     }
//   }, [location]);

//   // Start trip + socket + GPS tracking
//   useEffect(() => {
//     (async () => {
//       if (!token || !domain_name) return; // ← use domain_name, not route_id
//       const started = await startTrip(token);
//       if (!started) return;
//       connectSocket(domain_name, token); // ← pass domain_name directly
//       await startTracking();
//     })();
//     return () => stopTracking();
//   }, [token, domain_name]); // ← domain_name as dep

//   const html = `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
//   <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
//   <style>html, body, #map { height: 100%; margin: 0; padding: 0; }</style>
// </head>
// <body>
//   <div id="map"></div>
//   <script>
//     var map = L.map('map').setView([20.5937, 78.9629], 13);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

//     var userMarker = null;
//     var customerMarkers = [];
//     var routePolyline = null;

//     window.updateUserLocation = function(latlng) {
//       if (!userMarker) {
//         userMarker = L.marker([latlng.lat, latlng.lng]).addTo(map).bindPopup("📍 You");
//       } else {
//         userMarker.setLatLng([latlng.lat, latlng.lng]);
//       }
//       map.setView([latlng.lat, latlng.lng], map.getZoom(), { animate: true });
//       if (customerMarkers.length) drawRouteToCustomers(latlng);
//     };

//     window.loadStops = function(stops) {
//       customerMarkers = [];
//       stops.forEach(stop => {
//         const marker = L.marker([stop.latitude, stop.longitude]).addTo(map)
//           .bindPopup(stop.customer_name + "<br/>" + stop.address);
//         customerMarkers.push(marker);
//       });
//       if (userMarker) {
//         const allPoints = customerMarkers.map(m => m.getLatLng()).concat(userMarker.getLatLng());
//         map.fitBounds(allPoints);
//       }
//     };

//     async function drawRouteToCustomers(user) {
//       if (!customerMarkers.length) return;
//       const coords = [[user.lng, user.lat]];
//       customerMarkers.forEach(m => coords.push([m.getLatLng().lng, m.getLatLng().lat]));
//       const coordString = coords.map(c => c.join(',')).join(';');
//       const url = \`https://router.project-osrm.org/route/v1/driving/\${coordString}?overview=full&geometries=geojson\`;
//       try {
//         const res = await fetch(url);
//         const json = await res.json();
//         if (json.code === "Ok") {
//           const route = json.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
//           if (routePolyline) map.removeLayer(routePolyline);
//           routePolyline = L.polyline(route, { color: '#3b82f6', weight: 4, dashArray: '6,10' }).addTo(map);
//         }
//       } catch (err) {
//         console.error("OSRM routing failed:", err);
//       }
//     }
//   </script>
// </body>
// </html>`;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
//       <StatusBar barStyle="light-content" />
//       <WebView
//         ref={webRef}
//         originWhitelist={["*"]}
//         source={{ html }}
//         javaScriptEnabled
//         domStorageEnabled
//       />
//     </SafeAreaView>
//   );
// }