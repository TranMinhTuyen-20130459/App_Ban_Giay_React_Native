import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../theme";
export const ButtonBuy = ({ handleBuyNow }) => {
  const handleBuy = () => {
    handleBuyNow();
  };
  return (
    <>
      <TouchableOpacity
        style={[stylesBuy.button, stylesBuy.buttonBuy]}
        onPress={() => handleBuy()}
      >
        <Text style={[stylesBuy.buttonText, { color: colors.blueRoot }]}>
          Mua ngay
        </Text>
      </TouchableOpacity>
    </>
  );
};
const stylesBuy = StyleSheet.create({
  button: {
    height: 50,
    flex: 1,
    borderRadius: 5,
    alignItems: "center", // Added alignment property
    justifyContent: "center",
    marginBottom: 5,
  },
  buttonText: {
    fontWeight: "bold", // Màu chữ của nút (thay đổi theo yêu cầu của bạn)
  },
  buttonBuy: {
    borderColor: colors.blueRoot, // Màu viền của nút "Buy"
    borderWidth: 1,
    backgroundColor: "white",
  },
  buttonText: {
    fontWeight: "bold", // Màu chữ của nút (thay đổi theo yêu cầu của bạn)
  },
});
