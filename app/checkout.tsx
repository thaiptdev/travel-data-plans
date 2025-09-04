import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const mockPlans = [
  { id: "1", name: "Basic Plan", price: "$9.99/month" },
  { id: "2", name: "Pro Plan", price: "$19.99/month" },
  { id: "3", name: "Enterprise Plan", price: "$49.99/month" },
];

export default function Checkout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>

      <FlatList
        data={mockPlans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/checkout/[id]",
                params: { id: item.id },
              })
            }
          >
            <View>
              <Text style={styles.planName}>{item.name}</Text>
              <Text style={styles.planPrice}>{item.price}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  planName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  planPrice: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  chevron: {
    fontSize: 28,
    color: "#9CA3AF",
  },
});
