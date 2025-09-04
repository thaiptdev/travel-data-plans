import { colors, spacing, typography } from "@/src/constants/colors";
import { useCartStore } from "@/src/store/cartStore";
import { formatPrice } from "@/src/utils/formatting";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const CartSummary: React.FC = () => {
  const router = useRouter();
  const { getTotalPrice, getTotalItems } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total Items:</Text>
        <Text style={styles.summaryValue}>{totalItems}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={handleCheckout}
        accessible={true}
        accessibilityLabel={`Proceed to checkout with total of ${formatPrice(
          totalPrice
        )}`}
        accessibilityRole="button"
      >
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        <Ionicons name="arrow-forward-outline" size={20} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...typography.callout,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.callout,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  totalLabel: {
    ...typography.headline,
    color: colors.textPrimary,
    fontWeight: "700",
  },
  totalValue: {
    ...typography.headline,
    color: colors.primary,
    fontWeight: "700",
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  checkoutText: {
    ...typography.headline,
    color: colors.white,
    fontWeight: "600",
  },
});
