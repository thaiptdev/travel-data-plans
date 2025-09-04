import { ErrorMessage } from "@/src/components/common/error-message";
import { LoadingSpinner } from "@/src/components/common/loading-spinner";
import { colors } from "@/src/constants/colors";
import { usePlanDetails } from "@/src/hooks/usePlanDetails";
import { useCartStore } from "@/src/store/cartStore";
import { Plan } from "@/src/types/Plan";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlanBottomAction } from "./plan-bottom-action";
import { PlanHeader } from "./plan-header";
import { PlanQuickInfo } from "./plan-quick-info";
import { PlanSection } from "./plan-section";

export default function PlanDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { plan, loading, error, refetch } = usePlanDetails(id!);
  const { addItem, items } = useCartStore();
  const insets = useSafeAreaInsets();

  if (loading) return <LoadingSpinner message="Loading plan details..." />;
  if (error || !plan)
    return (
      <ErrorMessage
        message={error || "Plan not found"}
        onRetry={refetch}
        showRetryButton={!!error}
      />
    );

  const typedPlan = plan as Plan;
  const isInCart = items.some((item) => item.plan.id === typedPlan.id);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 120 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <PlanHeader plan={typedPlan} />

        <PlanQuickInfo plan={typedPlan} />

        <View style={styles.contentContainer}>
          <PlanSection title="Description" icon="information-circle-outline">
            <Text style={styles.text}>{typedPlan.description}</Text>
          </PlanSection>

          <PlanSection title="Coverage Area" icon="globe-outline">
            <Text style={styles.text}>{typedPlan.coverageArea}</Text>
          </PlanSection>

          <PlanSection title="Supported Networks" icon="cellular-outline">
            {typedPlan.supportedNetworks.length > 0 ? (
              <View style={styles.networksList}>
                {typedPlan.supportedNetworks.map((network, index) => (
                  <View key={index} style={styles.networkItem}>
                    <View style={styles.networkDot} />
                    <Text style={styles.networkText} numberOfLines={2}>
                      {network}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.mutedText}>No networks listed</Text>
            )}
          </PlanSection>

          <PlanSection title="Fair Use Policy" icon="shield-checkmark-outline">
            <Text style={styles.text}>{typedPlan.fairUsePolicy}</Text>
          </PlanSection>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Back to Plans</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
        <PlanBottomAction
          plan={typedPlan}
          isInCart={isInCart}
          onAdd={() => addItem(typedPlan)}
          onGoToCart={() => router.push("/cart")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    flexWrap: "wrap",
  },
  mutedText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  networksList: {
    gap: 8,
  },
  networkItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  networkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 12,
    marginTop: 9,
    flexShrink: 0,
  },
  networkText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.black,
    flex: 1,
    flexWrap: "wrap",
  },
  backButton: {
    marginTop: 24,
    marginHorizontal: 16,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
});
