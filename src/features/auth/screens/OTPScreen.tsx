import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { OTPInput } from "../components/OTPInput";
import { useVerifyOTP, useRequestOTP } from "../hooks/useOTP";

export default function OTPScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  // useVerifyOTP handles token storage + role-based redirect on success
  const { mutate: verifyOTP, isPending: isVerifying, isError, error } = useVerifyOTP();

  // useRequestOTP for resend functionality
  const { mutate: requestOTP, isPending: isResending } = useRequestOTP();

  function handleVerify(otp: string) {
    if (!phone) return;
    verifyOTP({ phone_number: phone, otp });
  }

  function handleResend() {
    if (!phone) return;
    requestOTP({ phone_number: phone });
  }

  return (
    <ScreenWrapper scrollable className="justify-center p-6">

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center gap-x-1 mb-8 self-start"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
        <Text className="text-sm font-medium text-text-primary">Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View className="mb-10">
        <Text className="text-3xl font-bold text-text-primary mb-2">
          Verification
        </Text>
        <Text className="text-base text-text-secondary">
          Enter the 6-digit code sent to{" "}
          <Text className="font-semibold text-text-primary">{phone}</Text>
        </Text>
      </View>

      {/* OTP Input */}
      <OTPInput
        onSubmit={handleVerify}
        isLoading={isVerifying}
      />

      {/* Error */}
      {isError && (
        <Text className="text-error text-xs text-center mt-4">
          {(error as any)?.message ?? "Invalid OTP. Please try again."}
        </Text>
      )}

      {/* Resend */}
      <View className="flex-row items-center justify-center gap-x-1 mt-8">
        <Text className="text-sm text-text-secondary">
          Didn't receive the code?
        </Text>
        <TouchableOpacity
          onPress={handleResend}
          disabled={isResending}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <Text className="text-sm font-semibold text-brand-primary">
            {isResending ? "Sending..." : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      </View>

    </ScreenWrapper>
  );
}