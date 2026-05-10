import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { Input, Button, Card } from "@/shared/ui";
import { useMarkAttendance } from "../hooks/useMarkAttendance";
import { isValidSessionCode } from "@/utils/validators";

export function MarkAttendanceScreen() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { mutate: mark, isPending } = useMarkAttendance();

  const handleMark = () => {
    setError("");
    if (!isValidSessionCode(code)) {
      setError("Please enter a valid 6-character code.");
      return;
    }
    // Mocking sessionId for now
    mark({ sessionId: "session_123", code });
  };

  return (
    <ScreenWrapper scrollable className="p-6 justify-center">
      <Card className="p-6 items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Mark Attendance</Text>
        <Text className="text-base text-secondary text-center mb-6">
          Enter the session code provided by your teacher.
        </Text>

        <View className="w-full gap-4">
          <Input
            placeholder="Enter 6-character code"
            maxLength={6}
            autoCapitalize="characters"
            value={code}
            onChangeText={(text) => setCode(text.toUpperCase())}
            error={error}
          />
          <Button
            label="Submit"
            onPress={handleMark}
            loading={isPending}
            fullWidth
          />
        </View>
      </Card>
    </ScreenWrapper>
  );
}
