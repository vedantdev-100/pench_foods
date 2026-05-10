import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "@/shared/ui";
import {
  // isValidEmail,
  isNonEmpty
} from "@/utils/validators";

interface Props {
  onSubmit: (email: string, pass: string) => void;
  isLoading: boolean;
}

export function LoginForm({ onSubmit, isLoading }: Props) {
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    // if (!isValidEmail(email)) {
    //   setError("Please enter a valid email.");
    //   return;
    // }
    if (!isNonEmpty(password)) {
      setError("Please enter your password.");
      return;
    }
    onSubmit(username, password);
  };

  return (
    <View className="gap-4 w-full">
      <Input
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        // error={error && !isValidEmail(email) ? error : undefined}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={error && !isNonEmpty(password) ? error : undefined}
      />
      <Button
        label="Login"
        onPress={handleSubmit}
        loading={isLoading}
        fullWidth
        className="mt-2"
      />
    </View>
  );
}
