import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@/shared/ui";
import { isValidOTP } from "@/utils/validators";

interface Props {
  onSubmit: (otp: string) => void;
  isLoading: boolean;
}

export function OTPInput({ onSubmit, isLoading }: Props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!isValidOTP(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    onSubmit(otp);
  };

  return (
    <View className="gap-4 w-full">
      <Input
        label="OTP"
        placeholder="Enter 6-digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        error={error}
      />
      <Button
        label="Verify"
        onPress={handleSubmit}
        loading={isLoading}
        fullWidth
        className="mt-2"
      />
    </View>
  );
}
