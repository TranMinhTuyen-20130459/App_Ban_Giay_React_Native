import React from "react";
import {Dimensions, StatusBar} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
} from "react-native";
import CartIcon from "../CartIcon";
import {colors} from '../../theme';

export default function Header() {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
                <View style={styles.divideStyle}></View>
                <Text style={styles.logoBrand}>KING AND QUEEN</Text>
            </View>
            <View style={styles.headerInfo}>
                <TouchableOpacity style={styles.searchInput} onPress={() => navigation.navigate('Search')}>
                    <Image
                        source={{
                            uri: "https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png",
                        }}
                        style={styles.searchIcon}
                    />
                    <Text
                        style={styles.searchTextInput}
                        editable={true}
                    >Bạn muốn xem gì hôm nay ?</Text>
                </TouchableOpacity>
                <CartIcon
                    sizeIcon={26}
                    colorIcon={colors.blueRoot}
                    activeBGColor={true}
                    bGQuantity={colors.bgButtonRed}
                    colorQuantity="#fff"
                />
            </View>
        </View>
    );
}
const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    header: {
        marginTop: StatusBar.currentHeight || 0,
        width: "100%",
        padding: 16,
        paddingBottom: 8,
        backgroundColor: "rgb(255, 255, 255)",
        gap: 8,
        flexDirection: "column",
        top: 0,
        zIndex: 99,
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        flexDirection: "row",
        gap: 8,
    },
    logo: {
        maxWidth: "100%",
        borderWidth: 0, // Tương đương với border-style: none;
        width: 40,
        height: 35,

    },
    divideStyle: {
        width: 1,
        height: 21,
        backgroundColor: "rgb(235, 235, 240)",
    },
    logoBrand: {
        flex: 1,
        overflow: "hidden",
        color: colors.blueRoot, // Tương đương với var(--global-ultramarine-90,#003ea1)
        // textOverflow: 'ellipsis',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "600",
        // lineHeight: "150%" // Tương đương với 150%
    },
    headerInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    searchInput: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        width: width - 70,
        paddingVertical: 0,
        paddingHorizontal: 12,
        // lineHeight: 36,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgb(221, 221, 227)",
        borderRadius: 8,
        alignItems: "center",
        zIndex: 1,
        // transitionDuration: 0.3,
    },
    searchIcon: {
        width: 24,
        height: 24,
        maxWidth: "100%",
        borderWidth: 0, // Tương đương với border-style: none;
    },
    searchTextInput: {
        borderWidth: 0,
        paddingVertical: 8,
        margin: 0,
        marginLeft: 8,
        // outlineWidth: 0, // Tương đương với outline: 0px;
        width: "100%",
        padding: 0,
        fontWeight: "400", // Tương đương với font-weight: 400;
        fontSize: 14,
        color: '#AAAAAA'

    },
    cart: {
        position: "relative",
        display: "flex",
        width: 40,
        height: 40,
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    cartIcon: {
        width: 24,
        height: 24,
        maxWidth: "100%",
        borderWidth: 0, // Tương đương với border-style: none;
    },
    cartCount: {
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(253, 130, 10)",
        height: 16,
        right: 0,
        top: -4,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 10,
        lineHeight: 1.5, // Tương đương với line-height: 150%;
        position: "absolute",
        paddingVertical: 0.5,
        paddingHorizontal: 4,
    },
});
