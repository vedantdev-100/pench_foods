import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { LoginMethod } from "../types/auth.types";

interface LoginTabBarProps {
    active: LoginMethod;
    onChange: (method: LoginMethod) => void;
}

export function LoginTabBar({ active, onChange }: LoginTabBarProps) {
    return (
        <View className="flex-row w-full bg-white/50 rounded-full p-1 mb-6">
            <TabButton
                label="Username"
                isActive={active === "password"}
                onPress={() => onChange("password")}
            />
            <TabButton
                label="Phone / OTP"
                isActive={active === "otp"}
                onPress={() => onChange("otp")}
            />
        </View>
    );
}

function TabButton({
    label,
    isActive,
    onPress,
}: {
    label: string;
    isActive: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className={`flex-1 py-2.5 rounded-full items-center justify-center ${isActive ? "bg-brand-primary" : "bg-transparent"
                }`}
        >
            <Text
                className={`text-sm font-semibold ${isActive ? "text-white" : "text-text-secondary"
                    }`}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}