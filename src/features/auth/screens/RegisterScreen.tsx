import React, { useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Animated
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthInput } from "../components/AuthInput";
import { useRegister } from "../hooks/useRegister";

const CITY_OPTIONS: { label: string; value: string }[] = [
    { label: "Nagpur", value: "nagpur" },
    { label: "Pune", value: "pune" },
    { label: "Mumbai", value: "mumbai" },
];

export default function RegisterScreen() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState(CITY_OPTIONS[0].value);
    const [showPassword, setShowPassword] = useState(false);
    const [showCityPicker, setShowCityPicker] = useState(false);

    const dropdownAnim = useRef(new Animated.Value(0)).current;

    const { mutate: register, isPending, isError, error } = useRegister();

    const isFormValid =
        username.trim() &&
        email.trim() &&
        phone.trim() &&
        password.trim() &&
        city;

    function handleRegister() {
        register({
            username: username.trim(),
            password,
            email: email.trim(),
            phone: phone.trim(),
            role: "Customers",
            is_customer: true,
            tenant_schema: city,
        });
    }

    function toggleCityPicker() {
        const toValue = showCityPicker ? 0 : 1;
        setShowCityPicker((v) => !v);
        Animated.spring(dropdownAnim, {
            toValue,
            useNativeDriver: false,
            damping: 18,
            stiffness: 200,
            mass: 0.8,
        }).start();
    }

    const selectedCity = CITY_OPTIONS.find((c) => c.value === city);

    return (
        <View
            className="flex-1 bg-bg-input"
        // style={{ backgroundColor: "#D6EDE4" }}
        >
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

                        {/* Back */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="self-start mb-4 flex-row items-center gap-x-1"
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
                            <Text className="text-sm text-text-primary font-medium">Back</Text>
                        </TouchableOpacity>

                        {/* 🖼️ Logo — replace with your asset */}
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

                            {/* Email */}
                            <AuthInput
                                placeholder="Email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />

                            {/* Phone */}
                            <AuthInput
                                placeholder="Phone number (e.g. 9100000015)"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={13}
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

                            {/* City Picker Trigger */}
                            <TouchableOpacity
                                onPress={toggleCityPicker}   // ← use toggleCityPicker instead of inline
                                activeOpacity={0.8}
                                className="flex-row items-center justify-between bg-border-disable rounded-full px-5 h-14"
                            >
                                <Text className="text-sm text-text-primary">
                                    {selectedCity?.label ?? "Select your city"}
                                </Text>
                                <Animated.View
                                    style={{
                                        transform: [{
                                            rotate: dropdownAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ["0deg", "180deg"],  // ← chevron flips on open
                                            }),
                                        }],
                                    }}
                                >
                                    <Ionicons name="chevron-down" size={18} color="#9E9E9E" />
                                </Animated.View>
                            </TouchableOpacity>

                            {/* City Dropdown — Animated */}
                            <Animated.View
                                style={{
                                    maxHeight: dropdownAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, CITY_OPTIONS.length * 52],  // 52px per option
                                    }),
                                    opacity: dropdownAnim,
                                    overflow: "hidden",
                                }}
                                className="-mt-2"
                            >
                                <View className="bg-white rounded-2xl border border-text-muted overflow-hidden">
                                    {CITY_OPTIONS.map((option) => (
                                        <TouchableOpacity
                                            key={option.value}
                                            onPress={() => {
                                                setCity(option.value);
                                                toggleCityPicker();   // ← close with animation
                                            }}
                                            className={`px-5 py-3.5 ${city === option.value ? "bg-brand-light" : "bg-white"
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
                            </Animated.View>
                            {/* Error */}
                            {isError && (
                                <Text className="text-error text-xs text-center">
                                    {(error as any)?.message ?? "Registration failed. Please try again."}
                                </Text>
                            )}

                            {/* Submit */}
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