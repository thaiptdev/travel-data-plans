import { CartItem } from "@/src/components/cart/cart-item";
import { CartSummary } from "@/src/components/cart/cart-summary";
import { EmptyState } from "@/src/components/common/empty-state";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../../src/constants/colors";
import { useCartStore } from "../../src/store/cartStore";
import type { CartItemType } from "../../src/types/Cart";

export default function CartScreen() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Browse our travel plans and add some to your cart to get started."
        iconName="cart-outline"
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList<CartItemType> 
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.plan.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        accessible={true}
        accessibilityLabel="Shopping cart items"
      />
      <CartSummary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  list: {
    flex: 1,
  },
});
