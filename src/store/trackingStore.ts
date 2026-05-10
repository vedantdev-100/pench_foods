// src/store/trackingStore.ts
import { create } from "zustand";
import * as Location from "expo-location";
import { useAuthStore } from "./authStore";
import { Alert } from "react-native";

type LocationState = { lat: number; lng: number };

type TrackingStore = {
    isTripStarted: boolean;
    location: LocationState | null;
    socket: WebSocket | null;
    watcher: Location.LocationSubscription | null;
    loading: boolean;
    error: string | null;
    startTrip: (token: string) => Promise<boolean>;
    stopTrip: () => void;
    connectSocket: (domain: string, token: string) => void;
    disconnectSocket: () => void;
    startTracking: () => Promise<void>;
    stopTracking: () => void;
};

export const useTrackingStore = create<TrackingStore>((set, get) => ({
    isTripStarted: false,
    location: null,
    socket: null,
    watcher: null,
    loading: false,
    error: null,

    startTrip: async (token: string) => {
        set({ loading: true, error: null });
        try {
            const { domain_name } = useAuthStore.getState();

            if (!domain_name) {
                throw new Error("domain_name not set in authStore");
            }

            // ✅ No route_id needed — tenant-based routing via domain
            const url = `https://${domain_name}/api/erp/orders/driver/start-trip/`;
            console.log("🚀 Starting trip at:", url);

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("📡 Start trip status:", res.status);
            const text = await res.text();
            console.log("📦 Start trip response:", text.slice(0, 200));

            if (!res.ok) throw new Error(`Start trip failed: ${res.status}`);

            set({ isTripStarted: true, loading: false });
            return true;
        } catch (err: any) {
            console.error("❌ startTrip error:", err.message);
            set({ error: err.message, loading: false });
            return false;
        }
    },

    stopTrip: () => {
        get().stopTracking();
        get().disconnectSocket();
        set({ isTripStarted: false });
    },

    connectSocket: (domain: string, token: string) => {
        const ws = new WebSocket(`wss://${domain}/ws/tracking/?token=${token}`);
        ws.onopen = () => console.log("✅ WebSocket connected");
        ws.onclose = () => {
            console.log("🔄 WebSocket closed, reconnecting...");
            setTimeout(() => get().connectSocket(domain, token), 3000);
        };
        ws.onerror = (e: any) => console.log("❌ WebSocket error:", e.message);
        set({ socket: ws });
    },

    disconnectSocket: () => {
        get().socket?.close();
        set({ socket: null });
    },

    // startTracking: async () => {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     console.log("📍 Permission status in startTracking:", status);
    //     if (status !== "granted") {
    //         set({ error: "Location permission denied" });
    //         return;
    //     }
    //     const watcher = await Location.watchPositionAsync(
    //         { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 3 },
    //         (loc) => {
    //             const coords = { lat: loc.coords.latitude, lng: loc.coords.longitude };
    //             set({ location: coords });
    //             const { socket } = get();
    //             if (socket?.readyState === WebSocket.OPEN) {
    //                 socket.send(JSON.stringify(coords));
    //             }
    //         }
    //     );
    //     set({ watcher });
    // },
    startTracking: async () => {
        // ← Always request, even if called multiple times
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("📍 Permission status in startTracking:", status);

        if (status !== "granted") {
            set({ error: "Location permission denied" });
            Alert.alert(
                "Permission Required",
                "Location access is needed to track your delivery route.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => Location.enableNetworkProviderAsync() },
                ]
            );
            return;
        }

        const watcher = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 3,
            },
            (loc) => {
                const coords = { lat: loc.coords.latitude, lng: loc.coords.longitude };
                set({ location: coords });
                const { socket } = get();
                if (socket?.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(coords));
                }
            }
        );

        set({ watcher });
    },

    stopTracking: () => {
        get().watcher?.remove();
        set({ watcher: null });
    },
}));