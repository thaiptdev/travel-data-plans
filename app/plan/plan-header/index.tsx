import { colors, spacing } from "@/src/constants/colors";
import { Plan } from "@/src/types/Plan";
import { formatPrice } from "@/src/utils/formatting";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

interface PlanHeaderProps {
  plan: Plan;
}

export const PlanHeader: React.FC<PlanHeaderProps> = ({ plan }) => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      {/* Location Info */}
      <View style={styles.locationContainer}>
        <View style={styles.locationIcon}>
          <Ionicons
            name="location-outline"
            size={isTablet ? 26 : 22}
            color={colors.primary}
          />
        </View>
        <View style={styles.locationText}>
          <Text style={styles.country} numberOfLines={2} ellipsizeMode="tail">
            {plan.country}
          </Text>
          <View style={styles.regionRow}>
            <Ionicons
              name="globe-outline"
              size={isTablet ? 16 : 14}
              color={colors.textSecondary}
              style={styles.regionIcon}
            />
            <Text style={styles.region} numberOfLines={2} ellipsizeMode="tail">
              {plan.region}
            </Text>
          </View>
        </View>
      </View>

      {/* Price */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText} numberOfLines={1} adjustsFontSizeToFit>
          {formatPrice(plan.price, plan.currency)}
        </Text>
        <Text style={styles.priceLabel}>Total</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray200 || "#e5e5e5",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: isSmallScreen ? "column" : "row",
    justifyContent: "space-between",
    alignItems: isSmallScreen ? "flex-start" : "center",
    padding: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    gap: isSmallScreen ? 16 : 0,
    minHeight: isTablet ? 100 : 80,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: isSmallScreen ? 1 : 1,
    marginRight: isSmallScreen ? 0 : spacing.md || 12,
    maxWidth: isSmallScreen ? "100%" : "70%",
  },
  locationIcon: {
    marginTop: 2,
    marginRight: spacing.sm || 8,
    flexShrink: 0,
  },
  locationText: {
    flex: 1,
    minWidth: 0, // Prevents flex child from overflowing
  },
  country: {
    fontSize: isTablet ? 24 : isSmallScreen ? 18 : 20,
    fontWeight: "700",
    color: colors.textPrimary || "#000",
    lineHeight: isTablet ? 32 : isSmallScreen ? 24 : 28,
    marginBottom: 4,
  },
  regionRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  regionIcon: {
    marginRight: 6,
    flexShrink: 0,
  },
  region: {
    fontSize: isTablet ? 16 : 14,
    color: colors.textSecondary || "#666",
    lineHeight: isTablet ? 22 : 20,
    flex: 1,
  },
  priceContainer: {
    backgroundColor: `${colors.primary || "#007AFF"}15`,
    paddingVertical: isTablet ? spacing.md || 12 : spacing.sm || 8,
    paddingHorizontal: isTablet ? spacing.lg || 16 : spacing.md || 12,
    borderRadius: isTablet ? 16 : 12,
    alignItems: "center",
    minWidth: isTablet ? 120 : 100,
    alignSelf: isSmallScreen ? "flex-end" : "center",
    borderWidth: 1,
    borderColor: `${colors.primary || "#007AFF"}25`,
  },
  priceText: {
    fontSize: isTablet ? 20 : isSmallScreen ? 16 : 18,
    color: colors.primary || "#007AFF",
    fontWeight: "800",
    textAlign: "center",
  },
  priceLabel: {
    fontSize: isTablet ? 12 : 10,
    color: colors.primary || "#007AFF",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
