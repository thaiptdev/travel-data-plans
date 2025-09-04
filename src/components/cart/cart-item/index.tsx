import { colors, spacing, typography } from "@/src/constants/colors";
import { useCartStore } from "@/src/store/cartStore";
import { CartItemType } from "@/src/types/Cart";
import { formatPrice, formatValidityDays } from "@/src/utils/formatting";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem } = useCartStore();
  const { plan, quantity } = item;

  const handleRemove = () => {
    removeItem(plan.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.country}>{plan.country}</Text>
          </View>
          <TouchableOpacity
            onPress={handleRemove}
            style={styles.removeButton}
            accessible={true}
            accessibilityLabel={`Remove ${plan.country} plan from cart`}
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>

        <Text style={styles.region}>{plan.region}</Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="wifi-outline" size={14} color={colors.gray500} />
            <Text style={styles.detailText}>{plan.dataAllowance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color={colors.gray500} />
            <Text style={styles.detailText}>
              {formatValidityDays(plan.validity)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <Text style={styles.quantity}>{quantity}</Text>
          </View>
          <Text style={styles.price}>
            {formatPrice(plan.price * quantity, plan.currency)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  country: {
    ...typography.headline,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  removeButton: {
    padding: spacing.xs,
  },
  region: {
    ...typography.subhead,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  details: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  detailText: {
    ...typography.footnote,
    color: colors.gray500,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  quantityLabel: {
    ...typography.callout,
    color: colors.textSecondary,
  },
  quantity: {
    ...typography.callout,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  price: {
    ...typography.headline,
    color: colors.primary,
    fontWeight: "700",
  },
});
