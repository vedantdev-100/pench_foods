import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { tokenUtils } from "@/features/auth/utils/tokenUtils";

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    onPress?: () => void;
    danger?: boolean;
}

function MenuItem({ icon, label, value, onPress, danger }: MenuItemProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-4 border-b border-border-disable"
        >
            <View
                className={`w-9 h-9 rounded-full items-center justify-center mr-3 ${danger ? "bg-error/10" : "bg-brand-light"
                    }`}
            >
                <Ionicons
                    name={icon}
                    size={18}
                    color={danger ? "#E53E3E" : "#1B5E37"}
                />
            </View>
            <Text
                className={`flex-1 text-sm font-medium ${danger ? "text-error" : "text-text-primary"
                    }`}
            >
                {label}
            </Text>
            {value ? (
                <Text className="text-xs text-text-muted mr-2">{value}</Text>
            ) : null}
            {!danger && (
                <Ionicons name="chevron-forward" size={16} color="#9E9E9E" />
            )}
        </TouchableOpacity>
    );
}

export function CustomerProfileScreen() {
    const router = useRouter();
    const { user, clearAuth } = useAuthStore();

    function handleLogout() {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await tokenUtils.clearTokens();
                        clearAuth();
                        router.replace("/(auth)/login" as any);
                    },
                },
            ]
        );
    }

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "CU";

    const dashboard = user?.customer_dashboard;

    return (
        <View className="flex-1 bg-bg-screen">
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* ── Header ──────────────────────────────────────────── */}
                <View className="items-center pt-16 pb-8 px-6">
                    {/* Avatar */}
                    <View className="w-20 h-20 rounded-full bg-brand-light border-2 border-brand-secondary items-center justify-center mb-4">
                        <Text className="text-2xl font-bold text-brand-primary">
                            {initials}
                        </Text>
                    </View>

                    {/* Name */}
                    <Text className="text-xl font-bold text-text-primary mb-1">
                        {user?.username ?? "Customer"}
                    </Text>

                    {/* Role Badge */}
                    <View className="flex-row items-center gap-x-1.5 bg-brand-light px-3 py-1 rounded-full">
                        <Ionicons name="person-outline" size={12} color="#1B5E37" />
                        <Text className="text-xs font-medium text-brand-primary">
                            Customer
                        </Text>
                    </View>
                </View>

                {/* ── Dashboard Stats ──────────────────────────────────── */}
                {dashboard && (
                    <View className="flex-row mx-4 gap-x-3 mb-6">
                        <View className="flex-1 bg-bg-card rounded-2xl p-4 items-center shadow-card">
                            <Ionicons name="repeat-outline" size={18} color="#1B5E37" />
                            <Text className="text-xs text-text-muted mt-1">Subscriptions</Text>
                            <Text className="text-sm font-bold text-text-primary mt-0.5">
                                {dashboard.active_subscriptions}
                            </Text>
                        </View>
                        <View className="flex-1 bg-bg-card rounded-2xl p-4 items-center shadow-card">
                            <Ionicons name="receipt-outline" size={18} color="#1B5E37" />
                            <Text className="text-xs text-text-muted mt-1">Orders</Text>
                            <Text className="text-sm font-bold text-text-primary mt-0.5">
                                {dashboard.total_orders}
                            </Text>
                        </View>
                        <View className="flex-1 bg-bg-card rounded-2xl p-4 items-center shadow-card">
                            <Ionicons name="wallet-outline" size={18} color="#D4872A" />
                            <Text className="text-xs text-text-muted mt-1">Balance</Text>
                            <Text className="text-sm font-bold text-warning mt-0.5">
                                ₹{dashboard.pending_balance}
                            </Text>
                        </View>
                    </View>
                )}

                {/* ── Contact Info ─────────────────────────────────────── */}
                <View className="mx-4 bg-bg-card rounded-2xl overflow-hidden mb-4 shadow-card">
                    <Text className="text-xs font-semibold text-text-muted px-4 pt-4 pb-2 uppercase tracking-widest">
                        Contact Info
                    </Text>
                    <MenuItem
                        icon="call-outline"
                        label="Phone"
                        value={user?.phone ?? "—"}
                    />
                    <MenuItem
                        icon="mail-outline"
                        label="Email"
                        value={user?.email ?? "—"}
                    />
                    <MenuItem
                        icon="location-outline"
                        label="City"
                        value={user?.tenant_schema ?? "—"}
                    />
                </View>

                {/* ── Account Section ─────────────────────────────────── */}
                <View className="mx-4 bg-bg-card rounded-2xl overflow-hidden mb-4 shadow-card">
                    <Text className="text-xs font-semibold text-text-muted px-4 pt-4 pb-2 uppercase tracking-widest">
                        Account
                    </Text>
                    <MenuItem
                        icon="person-outline"
                        label="Edit Profile"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="lock-closed-outline"
                        label="Change Password"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="notifications-outline"
                        label="Notifications"
                        onPress={() => { }}
                    />
                </View>

                {/* ── Subscription Section ─────────────────────────────── */}
                <View className="mx-4 bg-bg-card rounded-2xl overflow-hidden mb-4 shadow-card">
                    <Text className="text-xs font-semibold text-text-muted px-4 pt-4 pb-2 uppercase tracking-widest">
                        Subscription
                    </Text>
                    <MenuItem
                        icon="add-circle-outline"
                        label="New Subscription"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="pause-circle-outline"
                        label="Pause Delivery"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="time-outline"
                        label="Delivery History"
                        onPress={() => { }}
                    />
                </View>

                {/* ── App Section ─────────────────────────────────────── */}
                <View className="mx-4 bg-bg-card rounded-2xl overflow-hidden mb-4 shadow-card">
                    <Text className="text-xs font-semibold text-text-muted px-4 pt-4 pb-2 uppercase tracking-widest">
                        App
                    </Text>
                    <MenuItem
                        icon="help-circle-outline"
                        label="Help & Support"
                        onPress={() => { }}
                    />
                    <MenuItem
                        icon="information-circle-outline"
                        label="App Version"
                        value="1.0.0"
                    />
                </View>

                {/* ── Logout ──────────────────────────────────────────── */}
                <View className="mx-4 bg-bg-card rounded-2xl overflow-hidden mb-10 shadow-card">
                    <MenuItem
                        icon="log-out-outline"
                        label="Logout"
                        onPress={handleLogout}
                        danger
                    />
                </View>

            </ScrollView>
        </View>
    );
}