import React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/utils/cn";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <View
      className={cn("bg-white rounded-2xl p-4 shadow-sm border border-gray-100", className)}
      {...rest}
    >
      {children}
    </View>
  );
}
