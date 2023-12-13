import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useFetchData} from "../../utils/LoadData";
import {formatMoney} from "../../utils/Utils";

export default function ElementProduct({title, type}) {
    const {data, handleScroll} = useFetchData(type);
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState(1);
    const buttons = [
        {id: 1, label: "Button 1"},
        {id: 2, label: "Button 2"},
        {id: 3, label: "Button 3"},
        {id: 4, label: "Button 4"},
        {id: 5, label: "Button 5"},
    ];
    const handlePress = (buttonId) => {
        setActiveButton(buttonId);
    };
    return (
        <View style={styles.container}>
            <View style={styles.widgetHeader}>
                <View style={styles.widgetHeaderTitle}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                </View>
            </View>
            {/*<ScrollView horizontal showsHorizontalScrollIndicator={true}>*/}
            {/*    <View style={styles.productTabContainer}>*/}
            {/*        {buttons.map((button) => (*/}
            {/*            <TouchableOpacity*/}
            {/*                key={button.id}*/}
            {/*                style={[*/}
            {/*                    styles.productTab,*/}
            {/*                    activeButton === button.id ? styles.activeProductTab : null,*/}
            {/*                ]}*/}
            {/*                onPress={() => handlePress(button.id)}*/}
            {/*            >*/}
            {/*                <Text*/}
            {/*                    style={[*/}
            {/*                        styles.productTabText,*/}
            {/*                        activeButton === button.id*/}
            {/*                            ? styles.activeProductTabText*/}
            {/*                            : null,*/}
            {/*                    ]}*/}
            {/*                >*/}
            {/*                    {button.label}*/}
            {/*                </Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*        ))}*/}
            {/*    </View>*/}
            {/*</ScrollView>*/}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.listProduct}>
                    {data && data.map((item) => (
                        <TouchableOpacity
                            style={styles.productItem}
                            key={item.id_product}
                            onPress={() =>
                                navigation.navigate("ProductDetail", {
                                    productId: item.id_product,
                                })
                            }
                        >
                            <View style={styles.imageProductWrap}>
                                <Image
                                    source={{uri: `${item.list_image[0].path_image}`}}
                                    style={styles.imageProduct}
                                />
                            </View>
                            <View style={styles.titleProductWrap}>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={styles.titleProduct}
                                >
                                    {item.name_product}
                                </Text>
                            </View>
                            <View style={styles.priceProductWrap}>
                                <Text style={styles.priceProduct}>{formatMoney(item.listed_price)}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 12, // tương đương với padding-block trong CSS
        paddingHorizontal: 0, // Nếu cần padding theo chiều ngang
        flexDirection: 'column', // flex-direction: column trong CSS
        backgroundColor: 'rgb(255, 255, 255)', // background: rgb(255, 255, 255) trong CSS
        gap: 12,
    },
    //------------------------------------------------------------------
    widgetHeader: {
        paddingLeft: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    titleText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24, // Điều chỉnh giữa dòng dựa trên percentual của fontSize
        color: '#27272a', // Màu tương ứng với rgb(39, 39, 42)
    },
    //-------------------------------------------------------------------
    horizontalScrollContainer: {
        // Add any container styles here
    },
    productTabContainer: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        height: 34,
    },

    productTab: {
        flexDirection: 'row', // flex-direction: row;
        paddingVertical: 0, // padding: 0px 12px; (vertical padding only)
        paddingHorizontal: 12, // padding: 0px 12px; (horizontal padding only)
        height: 32, // height: 32px;
        backgroundColor: 'rgb(255, 255, 255)', // background: rgb(255, 255, 255);
        alignItems: 'center', // align-items: center;
        borderWidth: 1, // border: 1px solid rgb(221, 221, 227);
        borderColor: '#ccc', // border: 1px solid rgb(10, 104, 255);
        borderRadius: 16, // border-radius: 16px;
        fontSize: 14, // font-size: 14px;
        lineHeight: 21, // line-height: 150% (14 * 1.5 = 21);
        cursor: 'pointer', // cursor: pointer;
        display: 'flex', // display: flex;
        textAlign: 'center', // text-align: center;
    },
    productTabText: {
        fontWeight: '600', // font-weight: 600;
        color: '#ccc', // color: rgb(10, 104, 255);
    },

    activeProductTab: {
        flexDirection: 'row', // flex-direction: row;
        paddingVertical: 0, // padding: 0px 12px; (vertical padding only)
        paddingHorizontal: 12, // padding: 0px 12px; (horizontal padding only)
        height: 32, // height: 32px;
        backgroundColor: 'rgb(255, 255, 255)',
        // background: rgb(255, 255, 255);
        alignItems: 'center', // align-items: center;
        borderWidth: 1, // border: 1px solid rgb(221, 221, 227);
        borderColor: 'rgb(10, 104, 255)',
        borderRadius: 16, // border-radius: 16px;
        fontSize: 14, // font-size: 14px;
        lineHeight: 21, // line-height: 150% (14 * 1.5 = 21);
        cursor: 'pointer', // cursor: pointer;
        display: 'flex', // display: flex;
        textAlign: 'center', // text-align: center;
    },
    activeProductTabText: {
        fontWeight: '600', // font-weight: 600;
        color: 'rgb(10, 104, 255)',// color: rgb(10, 104, 255);
    },
    //-------------------------------------------------------------------
    listProduct: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 16,
        gap: 16,
    },
    productItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: 136,
        gap: 8,
        backgroundColor: 'rgb(255, 255, 255)', // background: rgb(255, 255, 255);
        borderWidth: 1, // border: 1px solid rgb(235, 235, 240);
        borderColor: 'rgb(235, 235, 240)', // border: 1px solid rgb(235, 235, 240);
        borderRadius: 8, // border-radius: 8px;
    },
    imageProductWrap: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 136,
    },
    imageProduct: {
        width: "100%",
        height: "100%",
        opacity: 1
    },
    titleProductWrap: {
        display: 'flex', // -webkit-box;
        paddingHorizontal: 8,
        width: "100%"
    },
    titleProduct: {
        flexDirection: 'column', // -webkit-box-orient: vertical;
        overflow: 'hidden', // overflow: hidden;
        fontSize: 12, // font-size: 12px;
        lineHeight: 18, // line-height: 150% (12 * 1.5 = 18);
        color: 'rgb(39, 39, 42)', // color: rgb(39, 39, 42);
        margin: 0, // margin: 0px;
    },
    priceProductWrap: {
        paddingHorizontal: 8,
        paddingBottom: 8
    },
    priceProduct: {
        margin: 0, // margin: 0px;
        display: 'flex', // display: flex;
        textAlign: 'left', // text-align: left;
        fontSize: 16, // font-size: 16px;
        lineHeight: 24, // line-height: 150%; (tính theo fontSize * 1.5)
        fontWeight: '500', // font-weight: 500;
        color: 'rgb(39, 39, 42)', // color: rgb(39, 39, 42);
    },
});