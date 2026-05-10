import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (__DEV__) {
      console.error("[ErrorBoundary]", error, info);
    }
  }

  handleReset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return <>{this.props.fallback}</>;
      return (
        <View className="flex-1 items-center justify-center bg-surface p-6">
          <Text className="text-xl font-bold text-danger mb-2">Something went wrong</Text>
          <Text className="text-sm text-secondary text-center mb-6">
            {this.state.error?.message ?? "An unexpected error occurred."}
          </Text>
          <TouchableOpacity
            className="bg-primary px-6 py-3 rounded-lg"
            onPress={this.handleReset}
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}
