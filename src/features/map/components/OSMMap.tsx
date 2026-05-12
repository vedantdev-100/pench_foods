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

  // ✅ Request permission + start GPS
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.warn("⚠️ Location permission denied");
        return;
      }

      await startTracking();
    })();

    return () => stopTracking();
  }, []);

  // ✅ Fetch route stops
  useEffect(() => {
    const fetchRoute = async () => {
      if (!token || !domain_name) return;

      try {
        const url = `https://${domain_name}/api/erp/orders/driver/my-route/`;

        console.log("🌍 Fetching:", url);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.warn("⚠️ Route fetch failed:", res.status);
          return;
        }

        const data = await res.json();

        console.log("✅ Route data:", data);

        setRouteData(data);
      } catch (err) {
        console.error("❌ Route fetch error:", err);
      }
    };

    fetchRoute();
  }, [token, domain_name]);

  // ✅ Inject stops into WebView
  useEffect(() => {
    if (!routeData || !webViewReady || !webRef.current) return;

    const stops = routeData.stops || [];

    webRef.current.injectJavaScript(`
      (function() {
        if (window.loadStops) {
          window.loadStops(${JSON.stringify(stops)});
        }
      })();

      true;
    `);
  }, [routeData, webViewReady]);

  // ✅ Inject live location updates
  useEffect(() => {
    if (!location || !webViewReady || !webRef.current) return;

    webRef.current.injectJavaScript(`
      (function() {
        if (window.updateUserLocation) {
          window.updateUserLocation({
            lat: ${location.lat},
            lng: ${location.lng}
          });
        }
      })();

      true;
    `);
  }, [location, webViewReady]);

  const html = `
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet/dist/leaflet.css"
  />

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

  <style>
    html,
    body,
    #map {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    .leaflet-control-custom button {
      width: 48px;
      height: 48px;
      border: none;
      background: white;
      border-radius: 12px;
      font-size: 22px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
  </style>
</head>

<body>
  <div id="map"></div>

  <script>

    // ✅ Create map
    var map = L.map('map').setView([20.5937, 78.9629], 13);

    // ✅ Tiles
    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19
      }
    ).addTo(map);

    // ✅ Variables
    var userMarker = null;
    var customerMarkers = [];
    var routePolyline = null;

    // ✅ Auto-follow state
    var autoCenter = true;

    // ✅ Center button
    var centerControl = L.control({
      position: 'bottomright'
    });

    centerControl.onAdd = function () {

      var div = L.DomUtil.create(
        'div',
        'leaflet-control-custom'
      );

      div.innerHTML = \`
        <button id="centerBtn">📍</button>
      \`;

      return div;
    };

    centerControl.addTo(map);

    // ✅ Re-enable auto-center
    document.addEventListener('click', function(e) {

      if (e.target && e.target.id === 'centerBtn') {

        autoCenter = true;

        if (userMarker) {

          const pos = userMarker.getLatLng();

          map.flyTo(
            [pos.lat, pos.lng],
            16,
            {
              animate: true,
              duration: 1.5
            }
          );
        }
      }
    });

    // ✅ Disable auto-center if user drags map
    map.on('dragstart', function() {
      autoCenter = false;
    });

    // ✅ Update live location
    window.updateUserLocation = function(latlng) {

      // First time
      if (!userMarker) {

        userMarker = L.marker([
          latlng.lat,
          latlng.lng
        ])
        .addTo(map)
        .bindPopup("📍 You");

        map.setView(
          [latlng.lat, latlng.lng],
          15
        );

      } else {

        // Move marker smoothly
        userMarker.setLatLng([
          latlng.lat,
          latlng.lng
        ]);

        // Follow only if enabled
        if (autoCenter) {

          map.panTo(
            [latlng.lat, latlng.lng],
            {
              animate: true,
              duration: 1
            }
          );
        }
      }

      // Draw route
      if (customerMarkers.length) {
        drawRouteToCustomers(latlng);
      }
    };

    // ✅ Load customer stops
    window.loadStops = function(stops) {

      // Remove old markers
      customerMarkers.forEach(m => {
        map.removeLayer(m);
      });

      customerMarkers = [];

      // Add new markers
      stops.forEach(stop => {

        const marker = L.marker([
          stop.latitude,
          stop.longitude
        ])
        .addTo(map)
        .bindPopup(
          "<b>" + stop.customer_name + "</b><br/>" +
          stop.address
        );

        customerMarkers.push(marker);
      });

      // Fit all markers
      if (userMarker && customerMarkers.length) {

        const allPoints =
          customerMarkers.map(m => m.getLatLng());

        allPoints.push(userMarker.getLatLng());

        map.fitBounds(allPoints, {
          padding: [50, 50]
        });
      }
    };

    // ✅ Draw route using OSRM
    async function drawRouteToCustomers(user) {

      if (!customerMarkers.length) return;

      const coords = [
        [user.lng, user.lat]
      ];

      customerMarkers.forEach(m => {

        coords.push([
          m.getLatLng().lng,
          m.getLatLng().lat
        ]);
      });

      const coordString = coords
        .map(c => c.join(','))
        .join(';');

      const url =
        \`https://router.project-osrm.org/route/v1/driving/\${coordString}?overview=full&geometries=geojson\`;

      try {

        const res = await fetch(url);

        const json = await res.json();

        if (json.code === "Ok") {

          const route =
            json.routes[0]
            .geometry.coordinates
            .map(c => [c[1], c[0]]);

          // Remove previous route
          if (routePolyline) {
            map.removeLayer(routePolyline);
          }

          // Draw new route
          routePolyline = L.polyline(
            route,
            {
              color: '#2563eb',
              weight: 5,
              opacity: 0.9,
              dashArray: '8, 10'
            }
          ).addTo(map);
        }

      } catch (err) {
        console.error(
          "❌ OSRM routing failed:",
          err
        );
      }
    }

  </script>
</body>
</html>
`;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
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