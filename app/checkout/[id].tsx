import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const mockPlans = [
  {
    id: "1",
    name: "Basic Plan",
    price: "$9.99/month",
    description: "Perfect for individuals starting out.",
  },
  {
    id: "2",
    name: "Pro Plan",
    price: "$19.99/month",
    description: "Great for growing teams and freelancers.",
  },
  {
    id: "3",
    name: "Enterprise Plan",
    price: "$49.99/month",
    description: "Advanced features for large organizations.",
  },
];

export default function CheckoutDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const plan = mockPlans.find((p) => p.id === id);

  if (!plan) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Plan not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planPrice}>{plan.price}</Text>
        <Text style={styles.description}>{plan.description}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Confirm & Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  planName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  planPrice: {
    fontSize: 18,
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 12,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
