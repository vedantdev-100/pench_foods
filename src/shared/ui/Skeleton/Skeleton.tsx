import React, { useEffect, useRef } from "react";
import { Animated, View, ViewProps } from "react-native";
import { cn } from "@/utils/cn";

interface SkeletonProps extends ViewProps {
  width?: number | string;
  height?: number;
  rounded?: boolean;
  className?: string;
}

export function Skeleton({ width = "100%", height = 16, rounded = false, className, style, ...rest }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 600, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[{ width: width as any, height, opacity }, style]}
      className={cn("bg-gray-200", rounded ? "rounded-full" : "rounded-lg", className)}
      {...rest}
    />
  );
}
