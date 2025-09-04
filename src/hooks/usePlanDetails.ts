import { useCallback, useEffect, useState } from "react";
import { mockPlans } from "../data/mockPlans";
import { PlanType } from "../types/Cart";

export function usePlanDetails(id: string) {
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((res) => setTimeout(res, 300));
      const found = mockPlans.find((p) => p.id === id) || null;

      if (!found) throw new Error("Plan not found");

      setPlan(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setPlan(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPlanDetails();
    }
  }, [id, fetchPlanDetails]);

  return { plan, loading, error, refetch: fetchPlanDetails };
}
