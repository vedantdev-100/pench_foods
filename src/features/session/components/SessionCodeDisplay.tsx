import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/shared/ui";

interface Props {
  code: string;
}

export function SessionCodeDisplay({ code }: Props) {
  return (
    <Card className="items-center p-8 bg-blue-50 border-blue-200">
      <Text className="text-sm font-medium text-secondary mb-2 uppercase tracking-widest">
        Session Code
      </Text>
      <Text className="text-5xl font-bold text-primary tracking-[0.25em]">
        {code}
      </Text>
    </Card>
  );
}
