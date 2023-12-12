import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { colors } from "../../theme";

export const ItemSize = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.selected ? colors.blueRoot : colors.borderGray,
        justifyContent: "center",
        alignItems: "center",
        width: 55,
        height: 35,
        borderRadius: 6,
        margin: 5,
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: props.selected ? colors.white : "black" }}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};
