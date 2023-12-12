import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../theme";
export const Policy = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "color",
        padding: 10,
      }}
    >
      <View style={styles.rowCenter}>
        <Ionicons
          name="shield-checkmark"
          size={23}
          color={colors.blueRoot}
        ></Ionicons>
        <Text>Hoàn tiền</Text>
        <Text style={{ fontWeight: "bold" }}>110%</Text>
        <Text>nếu hàng giả</Text>
      </View>
      <View style={styles.rowCenter}>
        <Ionicons name="settings" size={23} color={colors.blueRoot}></Ionicons>
        <Text>Thông tin</Text>
        <Text>bảo hành</Text>
        <Text style={{ fontWeight: "bold" }}>XEM CHI TIẾT</Text>
      </View>
      <View style={styles.rowCenter}>
        <Ionicons
          name="refresh-circle"
          size={23}
          color={colors.blueRoot}
        ></Ionicons>
        <Text>Đổi trả trong</Text>
        <Text style={{ fontWeight: "bold" }}>30 ngày</Text>
        <Text>nếu lỗi</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rowCenter: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
