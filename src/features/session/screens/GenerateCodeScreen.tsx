import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "@/shared/components/ScreenWrapper";
import { Button, Card } from "@/shared/ui";
import { useGenerateCode } from "../hooks/useGenerateCode";
import { SessionCodeDisplay } from "../components/SessionCodeDisplay";
import { SessionTimer } from "../components/SessionTimer";
import type { Session } from "@/types/domain/session.types";

export function GenerateCodeScreen() {
  const { mutate: generate, isPending } = useGenerateCode();
  const [activeSession, setActiveSession] = useState<Session | null>(null);

  const handleGenerate = () => {
    generate(
      { subjectId: "CS101", durationMinutes: 15 },
      {
        onSuccess: (res) => {
          setActiveSession(res.data.data);
        },
      }
    );
  };

  return (
    <ScreenWrapper scrollable className="p-6">
      <View className="mb-6">
        <Text className="text-3xl font-bold text-gray-900">Generate Session</Text>
        <Text className="text-secondary">Create a new attendance session.</Text>
      </View>

      {!activeSession ? (
        <Card className="p-6 items-center gap-4">
          <Text className="text-base text-gray-800 text-center">
            Click below to generate a new 6-character attendance code valid for 15 minutes.
          </Text>
          <Button label="Generate Code" onPress={handleGenerate} loading={isPending} fullWidth />
        </Card>
      ) : (
        <View className="gap-6">
          <SessionCodeDisplay code={activeSession.code} />
          <SessionTimer expiresAt={activeSession.expiresAt} />
          <Button label="End Session Early" variant="danger" onPress={() => setActiveSession(null)} fullWidth />
        </View>
      )}
    </ScreenWrapper>
  );
}
