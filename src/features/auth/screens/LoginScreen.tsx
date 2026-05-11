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
import { useLogin } from "../hooks/useLogin";

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, isError, error } = useLogin();

  return (
    <View className="flex-1 bg-bg-auth">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-between px-6 pt-16 pb-8">

            {/* ── Logo ── */}
            {/* 🖼️ REPLACE IMAGE: swap the require() path with your asset */}
            {/* Expected asset location: src/assets/images/pench-logo.png  */}
            <Image
              source={require("@assets/images/pench-logo.png")}
              className="w-48 h-36"
              resizeMode="contain"
              accessibilityLabel="Pench Foods logo"
            />

            {/* ── Title ── */}
            <Text className="text-2xl font-bold text-text-primary mt-6 mb-10">
              Welcome to Purity
            </Text>

            {/* ── Form ── */}
            <View className="w-full gap-y-4">
              <AuthInput
                placeholder="Enter your email/Mobile Number"
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <AuthInput
                placeholder="Enter your Password"
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

              {isError && (
                <Text className="text-error text-xs text-center">
                  {(error as any)?.message ?? "Invalid credentials. Please try again."}
                </Text>
              )}

              <TouchableOpacity
                onPress={() => login({ username: identifier, password })}
                disabled={isPending}
                activeOpacity={0.85}
                className="w-full h-14 bg-brand-primary rounded-full items-center justify-center mt-2"
              >
                <Text className="text-white text-base font-semibold tracking-wide">
                  {isPending ? "Logging in..." : "Log in"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ── Footer ── */}
            <View className="items-center gap-y-3 mt-10">
              <View className="flex-row items-center gap-x-1">
                <Text className="text-sm text-text-secondary">
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/otp")}>
                  <Text className="text-sm font-semibold text-brand-primary">
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-text-muted text-center">
                © 2024 Pench Foods. All rights reserved.
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}