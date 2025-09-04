import { colors, spacing, typography } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  minDataGB: number;
  onMinDataChange: (value: number) => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  minDataGB,
  onMinDataChange,
}: SearchFilterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Search</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.gray400}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search by country or region"
            placeholderTextColor={colors.gray400}
            value={searchQuery}
            onChangeText={onSearchChange}
            returnKeyType="search"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Minimum Data</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="cellular-outline"
            size={20}
            color={colors.gray400}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="e.g. 5"
            placeholderTextColor={colors.gray400}
            keyboardType="numeric"
            value={minDataGB ? minDataGB.toString() : ""}
            onChangeText={(val) => onMinDataChange(Number(val) || 0)}
          />
          <Text style={styles.unit}>GB</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.gray600,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.gray50,
    height: 44,
  },
  icon: {
    marginRight: spacing.xs,
  },
  input: {
    ...typography.body,
    flex: 1,
    color: colors.textPrimary,
  },
  unit: {
    ...typography.body,
    color: colors.gray500,
    marginLeft: spacing.xs,
  },
});
