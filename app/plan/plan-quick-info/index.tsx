import { colors, spacing } from "@/src/constants/colors";
import { Plan } from "@/src/types/Plan";
import { formatValidityDays } from "@/src/utils/formatting";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

interface PlanQuickInfoProps {
  plan: Plan;
}

const InfoItem: React.FC<{
  icon: string;
  value: string | number;
  label: string;
  color: string;
}> = ({ icon, value, label, color }) => (
  <View style={styles.infoItem}>
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon as any} size={isTablet ? 24 : 20} color={color} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoValue} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.infoLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  </View>
);

export const PlanQuickInfo: React.FC<PlanQuickInfoProps> = ({ plan }) => {
  const infoData = [
    {
      icon: "wifi",
      value: plan.dataAllowance,
      label: "Data",
      color: colors.success || "#28a745",
    },
    {
      icon: "time",
      value: formatValidityDays(plan.validity),
      label: "Validity",
      color: colors.warning || "#ffc107",
    },
    {
      icon: "cellular",
      value: plan.supportedNetworks.length,
      label: plan.supportedNetworks.length === 1 ? "Network" : "Networks",
      color: colors.secondary || "#6f42c1",
    },
  ];

  return (
    <View style={styles.quickInfo}>
      <View style={styles.quickInfoContent}>
        {infoData.map((item, index) => (
          <React.Fragment key={index}>
            <InfoItem {...item} />
            {index < infoData.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quickInfo: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray200 || "#e5e5e5",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickInfoContent: {
    flexDirection: isSmallScreen ? "column" : "row",
    paddingVertical: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    paddingHorizontal: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    justifyContent: isSmallScreen ? "flex-start" : "space-around",
    gap: isSmallScreen ? 16 : 0,
  },
  infoItem: {
    flexDirection: isSmallScreen ? "row" : "column",
    alignItems: isSmallScreen ? "center" : "center",
    flex: isSmallScreen ? 0 : 1,
    gap: isSmallScreen ? spacing.md || 12 : spacing.sm || 8,
    paddingVertical: isSmallScreen ? 8 : 0,
  },
  iconContainer: {
    width: isTablet ? 48 : 40,
    height: isTablet ? 48 : 40,
    borderRadius: isTablet ? 24 : 20,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoContent: {
    alignItems: isSmallScreen ? "flex-start" : "center",
    flex: isSmallScreen ? 1 : 0,
    minWidth: 0,
  },
  infoValue: {
    fontSize: isTablet ? 22 : isSmallScreen ? 18 : 20,
    color: colors.textPrimary || "#000",
    fontWeight: "700",
    textAlign: isSmallScreen ? "left" : "center",
    marginBottom: isSmallScreen ? 2 : 4,
  },
  infoLabel: {
    fontSize: isTablet ? 14 : 12,
    color: colors.textSecondary || "#666",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: isSmallScreen ? "left" : "center",
  },
  separator: {
    width: isSmallScreen ? "100%" : 1,
    height: isSmallScreen ? StyleSheet.hairlineWidth : 40,
    backgroundColor: colors.gray200 || "#e5e5e5",
    marginHorizontal: isSmallScreen ? 0 : spacing.md || 12,
  },
});
