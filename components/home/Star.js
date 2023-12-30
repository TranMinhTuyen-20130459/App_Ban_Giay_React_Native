import React from "react";
import {StyleSheet, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export function StarProductComponent(props) {
    const {margin, number_star} = props;
    const stars = [1, 2, 3, 4, 5]; // Số lượng sao

    return (
        <View style={[styles.container, margin]}>
            {stars.map((v, i) => (
                <Ionicons
                    key={i}
                    name={i < number_star ? "star" : "star-outline"}
                    color={i < number_star ? "gold" : "gray"}
                    style={styles.starIcon}
                    size={16} // Kích thước của ngôi sao
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // Hiển thị theo chiều ngang
        alignItems: "center", // Canh giữa theo chiều dọc,
    },
    starIcon: {
        marginRight: 2, // Khoảng cách giữa các ngôi sao
    },
});
