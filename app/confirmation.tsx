import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, spacing, typography } from "../src/constants/colors";
import { formatPrice } from "../src/utils/formatting";

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  items: any[];
  totalAmount: number;
  date: string;
}

export default function ConfirmationScreen() {
  const router = useRouter();
  const { orderData: orderDataParam } = useLocalSearchParams<{
    orderData: string;
  }>();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    if (orderDataParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(orderDataParam));
        setOrderData(parsed);
      } catch (error) {
        console.error("Error parsing order data:", error);
        setOrderData({
          id: Date.now().toString(),
          customerName: "Customer",
          customerEmail: "customer@example.com",
          items: [],
          totalAmount: 0,
          date: new Date().toISOString(),
        });
      }
    }
  }, [orderDataParam]);

  const handleDone = () => {
    router.dismissAll();
    router.replace("/");
  };

  const handleViewPlans = () => {
    router.dismissAll();
    router.replace("/");
  };

  const handleCancel = () => {
    Alert.alert("Cancel Order", "Are you sure you want to cancel this order?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes, Cancel",
        style: "destructive",
        onPress: () => {
          router.dismissAll();
          router.replace("/checkout");
        },
      },
    ]);
  };

  if (!orderData) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="hourglass-outline" size={64} color={colors.primary} />
        <Text style={styles.loadingText}>Confirming your order...</Text>
      </View>
    );
  }

  const orderDate = new Date(orderData.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ Success Message */}
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle" size={90} color={colors.success} />
        <Text style={styles.successTitle}>Order Confirmed!</Text>
        <Text style={styles.successMessage}>
          Thank you for your purchase. Your travel plans are ready to use.
        </Text>
      </View>

      {/* ✅ Order Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order ID:</Text>
          <Text style={styles.detailValue}>#{orderData.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{orderDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Customer:</Text>
          <Text style={styles.detailValue}>{orderData.customerName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{orderData.customerEmail}</Text>
        </View>
      </View>

      {/* ✅ Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items Purchased</Text>
        {orderData.items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.orderItemIcon}>
              <Ionicons name="globe-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.orderItemInfo}>
              <Text style={styles.orderItemName}>{item.plan.country}</Text>
              <Text style={styles.orderItemDetails}>
                {item.plan.dataAllowance} • {item.plan.region}
              </Text>
              <Text style={styles.orderItemQuantity}>
                Quantity: {item.quantity}
              </Text>
            </View>
            <Text style={styles.orderItemPrice}>
              {formatPrice(item.plan.price * item.quantity, item.plan.currency)}
            </Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Paid:</Text>
          <Text style={styles.totalValue}>
            {formatPrice(orderData.totalAmount)}
          </Text>
        </View>
      </View>

      {/* ✅ Next Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What&apos;s Next?</Text>
        <View style={styles.nextStepItem}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <Text style={styles.nextStepText}>
            Check your email for detailed setup instructions
          </Text>
        </View>
        <View style={styles.nextStepItem}>
          <Ionicons name="download-outline" size={20} color={colors.primary} />
          <Text style={styles.nextStepText}>
            Download the eSIM profiles to your device
          </Text>
        </View>
        <View style={styles.nextStepItem}>
          <Ionicons name="airplane-outline" size={20} color={colors.primary} />
          <Text style={styles.nextStepText}>
            Enjoy your travels with high-speed data
          </Text>
        </View>
      </View>

      {/* ✅ Actions */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleDone}>
          <Ionicons name="checkmark" size={20} color={colors.white} />
          <Text style={styles.primaryButtonText}>Done</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleViewPlans}
        >
          <Ionicons name="globe-outline" size={20} color={colors.primary} />
          <Text style={styles.secondaryButtonText}>Browse More Plans</Text>
        </TouchableOpacity>

        {/* New Cancel Button */}
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Ionicons
            name="close-circle-outline"
            size={20}
            color={colors.error}
          />
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  successContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.xxl,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  successTitle: {
    ...typography.title1,
    color: colors.textPrimary,
    fontWeight: "700",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  successMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    backgroundColor: colors.white,
    marginVertical: spacing.sm,
    padding: spacing.lg,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.textPrimary,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    ...typography.callout,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.callout,
    color: colors.textPrimary,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    gap: spacing.md,
  },
  orderItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    ...typography.callout,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  orderItemDetails: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  orderItemQuantity: {
    ...typography.footnote,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  orderItemPrice: {
    ...typography.callout,
    color: colors.primary,
    fontWeight: "600",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.gray200,
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
  nextStepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  nextStepText: {
    ...typography.callout,
    color: colors.textPrimary,
    flex: 1,
  },
  actionContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  primaryButtonText: {
    ...typography.headline,
    color: colors.white,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  secondaryButtonText: {
    ...typography.headline,
    color: colors.primary,
    fontWeight: "600",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  cancelButtonText: {
    ...typography.headline,
    color: colors.error,
    fontWeight: "600",
  },
});
