import React from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { OTPInput } from "../components/OTPInput";
import { useOTP } from "../hooks/useOTP";
import { useLocalSearchParams } from "expo-router";

export function OTPScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { mutate: verifyOTP, isPending } = useOTP();

  return (
    <ScreenWrapper scrollable className="justify-center p-6">
      <View className="mb-10">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Verification</Text>
        <Text className="text-base text-secondary">
          Enter the 6-digit code sent to {phone}
        </Text>
      </View>

      <OTPInput onSubmit={(otp) => verifyOTP({ phone: phone || "", otp })} isLoading={isPending} />
    </ScreenWrapper>
  );
}
