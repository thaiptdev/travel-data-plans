import { colors, spacing, typography } from "@/src/constants/colors";
import { Plan } from "@/src/types/Plan";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PlanListProps {
  plans: Plan[];
  searchQuery: string;
}

export function PlanList({ plans, searchQuery }: PlanListProps) {
  const router = useRouter();

  if (plans.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛫</Text>
        <Text style={styles.emptyText}>No plans found for “{searchQuery}”</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={plans}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() =>
            router.push({ pathname: "/plan/[id]", params: { id: item.id } })
          }
        >
          <View style={styles.topSection}>
            <View style={styles.countryBadge}>
              <Text style={styles.country}>{item.country}</Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.bottomSection}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Data</Text>
              <Text style={styles.detailValue}>{item.dataAllowanceGB} GB</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Validity</Text>
              <Text style={styles.detailValue}>{item.validity} days</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>
                {item.price} {item.currency}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.md,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
  },
  countryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  country: {
    ...typography.callout,
    color: colors.primary,
    fontWeight: "600",
  },
  name: {
    ...typography.title3,
    color: colors.textPrimary,
    flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.gray300,
    marginHorizontal: spacing.md,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.lg,
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 42,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
