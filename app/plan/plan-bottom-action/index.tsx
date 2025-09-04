import { colors, spacing } from "@/src/constants/colors";
import { Plan } from "@/src/types/Plan";
import { formatPrice } from "@/src/utils/formatting";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

interface PlanBottomActionProps {
  plan: Plan;
  isInCart: boolean;
  onAdd: () => void;
  onGoToCart: () => void;
}

export const PlanBottomAction: React.FC<PlanBottomActionProps> = ({
  plan,
  isInCart,
  onAdd,
  onGoToCart,
}) => {
  const [scaleValue] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.bottomAction}>
      <View style={styles.actionContent}>
        {isInCart ? (
          <View style={styles.inCartContainer}>
            <View style={styles.inCartInfo}>
              <View style={styles.successIcon}>
                <Ionicons
                  name="checkmark-circle"
                  size={isTablet ? 28 : 24}
                  color={colors.success || "#28a745"}
                />
              </View>
              <View style={styles.inCartTextContainer}>
                <Text style={styles.inCartText}>Added to Cart</Text>
                <Text style={styles.inCartSubtext}>
                  {formatPrice(plan.price, plan.currency)} • {plan.country}
                </Text>
              </View>
            </View>

            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <TouchableOpacity
                style={styles.goToCartButton}
                onPress={onGoToCart}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
                accessibilityLabel="Go to cart"
                accessibilityRole="button"
              >
                <Ionicons
                  name="bag-outline"
                  size={isTablet ? 20 : 18}
                  color={colors.white}
                />
                <Text style={styles.goToCartText}>View Cart</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <Animated.View
            style={[
              styles.addButtonContainer,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAdd}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.9}
              accessibilityLabel={`Add ${
                plan.country
              } plan to cart for ${formatPrice(plan.price, plan.currency)}`}
              accessibilityRole="button"
            >
              <View style={styles.addButtonContent}>
                <View style={styles.addIconContainer}>
                  <Ionicons
                    name="add"
                    size={isTablet ? 26 : 24}
                    color={colors.white}
                  />
                </View>
                <View style={styles.addTextContainer}>
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                  <Text style={styles.addButtonPrice}>
                    {formatPrice(plan.price, plan.currency)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomAction: {
    backgroundColor: colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray200 || "#e5e5e5",
    ...Platform.select({
      ios: {
        shadowColor: colors.black || "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  actionContent: {
    paddingHorizontal: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    paddingVertical: isTablet ? spacing.lg || 16 : spacing.md || 12,
    minHeight: isTablet ? 80 : 70,
    justifyContent: "center",
  },
  addButtonContainer: {
    width: "100%",
  },
  addButton: {
    backgroundColor: colors.primary || "#007AFF",
    borderRadius: isTablet ? 16 : 14,
    paddingVertical: isTablet ? spacing.lg || 16 : spacing.md || 12,
    paddingHorizontal: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary || "#007AFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md || 12,
  },
  addIconContainer: {
    width: isTablet ? 36 : 32,
    height: isTablet ? 36 : 32,
    borderRadius: isTablet ? 18 : 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  addTextContainer: {
    alignItems: "center",
    flex: 1,
  },
  addButtonText: {
    fontSize: isTablet ? 20 : 18,
    color: colors.white,
    fontWeight: "700",
    textAlign: "center",
  },
  addButtonPrice: {
    fontSize: isTablet ? 16 : 14,
    color: colors.white,
    fontWeight: "600",
    opacity: 0.9,
    marginTop: 2,
  },
  inCartContainer: {
    flexDirection: isSmallScreen ? "column" : "row",
    alignItems: isSmallScreen ? "stretch" : "center",
    justifyContent: "space-between",
    gap: isSmallScreen ? spacing.md || 12 : spacing.sm || 8,
  },
  inCartInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: isSmallScreen ? 0 : 1,
    gap: spacing.md || 12,
  },
  successIcon: {
    flexShrink: 0,
  },
  inCartTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  inCartText: {
    fontSize: isTablet ? 18 : 16,
    color: colors.success || "#28a745",
    fontWeight: "700",
    marginBottom: 2,
  },
  inCartSubtext: {
    fontSize: isTablet ? 14 : 12,
    color: colors.textSecondary || "#666",
    fontWeight: "500",
  },
  goToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary || "#007AFF",
    paddingHorizontal: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    paddingVertical: isTablet ? spacing.md || 12 : spacing.sm || 8,
    borderRadius: isTablet ? 12 : 10,
    gap: spacing.sm || 8,
    minWidth: isTablet ? 140 : 120,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary || "#007AFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  goToCartText: {
    fontSize: isTablet ? 16 : 14,
    color: colors.white,
    fontWeight: "600",
    textAlign: "center",
  },
});
