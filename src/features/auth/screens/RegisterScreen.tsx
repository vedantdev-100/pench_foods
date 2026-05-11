import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthInput } from "../components/AuthInput";
import { useRegister } from "../hooks/useRegister";

// City → tenant_schema map — extend as new cities go live
const CITY_OPTIONS: { label: string; value: string }[] = [
    { label: "Nagpur", value: "nagpur" },
    { label: "Pune", value: "pune" },
    { label: "Mumbai", value: "mumbai" },
];

export default function RegisterScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState(CITY_OPTIONS[0].value);
    const [showPassword, setShowPassword] = useState(false);
    const [showCityPicker, setShowCityPicker] = useState(false);

    const { mutate: register, isPending, isError, error } = useRegister();

    const selectedCity = CITY_OPTIONS.find((c) => c.value === city);

    function handleRegister() {
        register({
            username,
            password,
            phone_number: phone,
            role: "Customer",
            tenant_schema: city,
        });
    }

    const isFormValid = username && password && phone && city;

    return (
        // 🎨 Background color → same token as LoginScreen
        <View className="flex-1" style={{ backgroundColor: "#D6EDE4" }}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerClassName="flex-grow"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-1 items-center px-6 pt-12 pb-8">

                        {/* Back button */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="self-start mb-4 flex-row items-center gap-x-1"
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
                            <Text className="text-sm text-text-primary font-medium">Back</Text>
                        </TouchableOpacity>

                        {/* 🖼️ Logo — same asset as LoginScreen */}
                        <Image
                            source={require("@assets/images/pench-logo.png")}
                            className="w-36 h-28"
                            resizeMode="contain"
                            accessibilityLabel="Pench Foods logo"
                        />

                        <Text className="text-2xl font-bold text-text-primary mt-4 mb-8">
                            Create Account
                        </Text>

                        {/* Form */}
                        <View className="w-full gap-y-4">

                            {/* Username */}
                            <AuthInput
                                placeholder="Choose a username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />

                            {/* Phone */}
                            <AuthInput
                                placeholder="Phone number (e.g. 919876543210)"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />

                            {/* Password */}
                            <AuthInput
                                placeholder="Create a password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                rightIcon={
                                    <TouchableOpacity
                                        onPress={() => setShowPassword((v) => !v)}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <Ionicons
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            size={20}
                                            color="#9E9E9E"
                                        />
                                    </TouchableOpacity>
                                }
                            />

                            {/* City Picker */}
                            <TouchableOpacity
                                onPress={() => setShowCityPicker((v) => !v)}
                                activeOpacity={0.8}
                                className="flex-row items-center justify-between bg-white rounded-full px-5 h-14 border border-border"
                            >
                                <Text className="text-sm text-text-primary">
                                    {selectedCity?.label ?? "Select your city"}
                                </Text>
                                <Ionicons
                                    name={showCityPicker ? "chevron-up" : "chevron-down"}
                                    size={18}
                                    color="#9E9E9E"
                                />
                            </TouchableOpacity>

                            {/* City Dropdown */}
                            {showCityPicker && (
                                <View className="bg-white rounded-2xl border border-border overflow-hidden -mt-2">
                                    {CITY_OPTIONS.map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            onPress={() => {
                                                setCity(option.value);
                                                setShowCityPicker(false);
                                            }}
                                            className={`px-5 py-3.5 border-b border-border last:border-b-0 ${city === option.value ? "bg-brand-light" : "bg-white"
                                                }`}
                                        >
                                            <Text
                                                className={`text-sm ${city === option.value
                                                        ? "font-semibold text-brand-primary"
                                                        : "text-text-primary"
                                                    }`}
                                            >
                                                {option.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {isError && (
                                <Text className="text-error text-xs text-center">
                                    {(error as any)?.message ?? "Registration failed. Please try again."}
                                </Text>
                            )}

                            {/* Submit Button */}
                            <TouchableOpacity
                                onPress={handleRegister}
                                disabled={isPending || !isFormValid}
                                activeOpacity={0.85}
                                className={`w-full h-14 rounded-full items-center justify-center mt-2 ${isPending || !isFormValid
                                        ? "bg-brand-primary/50"
                                        : "bg-brand-primary"
                                    }`}
                            >
                                <Text className="text-white text-base font-semibold tracking-wide">
                                    {isPending ? "Creating account..." : "Register"}
                                </Text>
                            </TouchableOpacity>

                            {/* Login link */}
                            <View className="flex-row items-center justify-center gap-x-1">
                                <Text className="text-sm text-text-secondary">
                                    Already have an account?
                                </Text>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text className="text-sm font-semibold text-brand-primary">
                                        Log in
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text className="text-xs text-text-muted text-center mt-auto pt-8">
                            © 2024 Pench Foods. All rights reserved.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}