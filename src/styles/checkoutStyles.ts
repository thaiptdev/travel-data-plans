import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "../constants/colors";

export const checkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  emptyTitle: {
    ...typography.title2,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  backButtonText: {
    ...typography.callout,
    color: colors.white,
    fontWeight: "600",
  },
  section: {
    backgroundColor: colors.white,
    marginVertical: spacing.sm,
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.title3,
    color: colors.textPrimary,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
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
    ...typography.caption,
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
    alignItems: "center",
    paddingTop: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.gray200,
  },
  totalLabel: {
    ...typography.title3,
    color: colors.textPrimary,
    fontWeight: "700",
  },
  totalValue: {
    ...typography.title3,
    color: colors.primary,
    fontWeight: "700",
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    ...typography.callout,
    color: colors.textPrimary,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.gray100,
    borderRadius: 8,
  },
  paymentMethodText: {
    ...typography.callout,
    color: colors.textPrimary,
    fontWeight: "500",
    flex: 1,
  },
  paymentNote: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontStyle: "italic",
  },
  submitContainer: {
    padding: spacing.lg,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    gap: spacing.sm,
  },
  submitButtonDisabled: {
    backgroundColor: colors.gray400,
  },
  submitButtonText: {
    ...typography.title3,
    color: colors.white,
    fontWeight: "600",
  },
});
