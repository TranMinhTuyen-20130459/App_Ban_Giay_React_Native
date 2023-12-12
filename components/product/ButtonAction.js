import React from "react";
import { View, StyleSheet } from "react-native";
import { ButtonAdd } from "./ButtonAddCart";
import { ButtonBuy } from "./ButtonBuyNow";

export const ButtonAction = ({ handleAddToCart, handleBuyNow }) => {
  const handleAdd = () => {
    handleAddToCart();
  };
  const handleBuy = () => {
    handleBuyNow();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ButtonBuy handleBuyNow={handleBuy} />
        <View style={{ flex: 0.1 }}></View>
        <ButtonAdd handleAddToCart={handleAdd} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    flexDirection: "row", // Corrected spelling of "flexDirection"
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingTop: 5,
  },
});
