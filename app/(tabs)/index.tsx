import { ErrorMessage } from "@/src/components/common/error-message";
import { LoadingSpinner } from "@/src/components/common/loading-spinner";
import { usePlans } from "@/src/hooks/usePlan";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../../src/constants/colors";
import { useDebounce } from "../../src/hooks/useDebounce";
import { Plan } from "../../src/types/Plan";
import { PlanList } from "../plan/plan-list";
import { SearchFilter } from "../plan/search-filter";

export default function PlansScreen() {
  const { plans, loading, error, refetch } = usePlans();
  const [searchQuery, setSearchQuery] = useState("");
  const [minDataGB, setMinDataGB] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan: Plan) => {
      const matchesSearch =
        plan.country
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        plan.region.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      const meetsDataRequirement = plan.dataAllowanceGB >= minDataGB;

      return matchesSearch && meetsDataRequirement;
    });
  }, [plans, debouncedSearchQuery, minDataGB]);

  if (loading) {
    return <LoadingSpinner message="Loading travel plans..." />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={refetch} showRetryButton={true} />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          minDataGB={minDataGB}
          onMinDataChange={setMinDataGB}
        />
      </View>

      <PlanList plans={filteredPlans} searchQuery={debouncedSearchQuery} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray300,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
