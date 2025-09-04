import { colors, spacing } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;

interface PlanSectionProps {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
  icon?: string;
}

export const PlanSection: React.FC<PlanSectionProps> = ({
  title,
  children,
  style,
  icon,
}) => (
  <View style={[styles.section, style]}>
    <View style={styles.sectionHeader}>
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon as any}
            size={isTablet ? 22 : 18}
            color={colors.primary || "#007AFF"}
          />
        </View>
      )}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray200 || "#e5e5e5",
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    paddingHorizontal: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    paddingBottom: isTablet ? spacing.md || 12 : spacing.sm || 8,
    backgroundColor: `${colors.primary || "#007AFF"}03`,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray200 || "#e5e5e5",
  },
  iconContainer: {
    width: isTablet ? 32 : 28,
    height: isTablet ? 32 : 28,
    borderRadius: isTablet ? 16 : 14,
    backgroundColor: `${colors.primary || "#007AFF"}15`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md || 12,
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: isTablet ? 20 : 18,
    color: colors.textPrimary || "#000",
    fontWeight: "700",
    flex: 1,
    flexWrap: "wrap",
    lineHeight: isTablet ? 28 : 24,
  },
  sectionContent: {
    padding: isTablet ? spacing.xl || 24 : spacing.lg || 16,
    paddingTop: isTablet ? spacing.lg || 16 : spacing.md || 12,
  },
});
