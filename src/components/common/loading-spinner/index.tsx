import { colors, spacing, typography } from "@/src/constants/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "large",
}) => {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityLabel={message}
    >
      <ActivityIndicator size={size} color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  message: {
    ...typography.callout,
    color: colors.textSecondary,
    marginTop: spacing.md,
    textAlign: "center",
  },
});
