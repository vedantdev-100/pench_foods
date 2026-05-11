import React from "react";
import {
    View,
    TextInput,
    TextInputProps,
    TouchableOpacity,
} from "react-native";

interface AuthInputProps extends TextInputProps {
    rightIcon?: React.ReactNode;
}

export function AuthInput({ rightIcon, ...props }: AuthInputProps) {
    return (
        <View className="flex-row items-center bg-white rounded-full px-7  h-16 border border-border">
            <TextInput
                className="flex-1 text-sm text-text-primary py-4"
                placeholderTextColor="#9E9E9E"
                style={{ paddingVertical: 0 }} // fixes Android vertical misalignment
                {...props}
            />
            {rightIcon && (
                <View className="ml-2">{rightIcon}</View>
            )}
        </View>
    );
}