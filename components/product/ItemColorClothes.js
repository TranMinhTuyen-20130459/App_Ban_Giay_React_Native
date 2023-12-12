import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import { colors } from "../../theme";

export const ItemColorClothes = (props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        // nếu được chọn thì viền màu xanh
        borderColor: props.selected ? colors.blueRoot : colors.borderGray,
        borderWidth: 1,
        width: "50%", // Two products in a row
        height: 75,
      }}
      onPress={props.onPress}
    >
      <View style={{ flex: 1 }}>
        <Image
          style={{ height: 72 }}
          source={{
            uri: props.link,
          }}
        />
      </View>
      <View
        style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>{props.color}</Text>
      </View>
    </TouchableOpacity>
  );
};
