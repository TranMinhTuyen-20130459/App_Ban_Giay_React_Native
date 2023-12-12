import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { View, Text, FlatList, Image, ScrollView, ProgressBarAndroid, TouchableOpacity, StyleSheet, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';
import { Dimensions } from 'react-native';
import { Button } from 'react-native';

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const HistoryViewProduct = () => {
    const history = useSelector((state) => state.historys)
    useEffect(() => {
        console.log("H"+history)
    }, []);

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.listProduct}>
                    {history.map((item) => (
                            <TouchableOpacity
                            style={styles.productItem}
                            key={item.id}
                            onPress={() =>
                                navigation.navigate("ProductDetail", {
                                productId: item.id,
                                })
                            }
                            >
                            <View style={styles.imageProductWrap}>
                                <Image
                                source={{ uri: `${item.path_img}` }}
                                style={styles.imageProduct}
                                />
                            </View>
                            <View style={styles.titleProductWrap}>
                                <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={styles.titleProduct}
                                >
                                {item.title}
                                </Text>
                            </View>
                            <View style={styles.priceProductWrap}>
                                <Text style={styles.priceProduct}>{item.price}</Text>
                            </View>
                            </TouchableOpacity>
                        ))}
                    </View>
               </ScrollView>
        </View>
        // <View>
        //     <FlatList
        //         style={styles.upperHeaderPlaceholder}
        //         showsVerticalScrollIndicator={false}
        //         data={history}
        //         renderItem={renderItem}
        //         keyExtractor={(item) => item.idv4}
        //     />
        // </View>

    );
};
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingVertical: 12, // tương đương với padding-block trong CSS
    paddingHorizontal: 0, // Nếu cần padding theo chiều ngang
    flexDirection: 'column', // flex-direction: column trong CSS
    backgroundColor: 'rgb(255, 255, 255)', // background: rgb(255, 255, 255) trong CSS
    gap: 12,
},
//----------------------------------------------------------------------------------------
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
listProduct:{
    display:"flex",
    flexWrap: "wrap",
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
},
productItem:{
    display: "flex",
    // justifyContent: "center",
    width: (width - 32 - 16) * 0.5,
    height: (height) * 0.4,
    gap: 8,
    backgroundColor: 'rgb(255, 255, 255)', // background: rgb(255, 255, 255);
    borderWidth: 1, // border: 1px solid rgb(235, 235, 240);
    borderColor: 'rgb(235, 235, 240)', // border: 1px solid rgb(235, 235, 240);
    borderRadius: 8, // border-radius: 8px;
},
imageProductWrap:{
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70%",
},
imageProduct:{
    width: "100%",
    height: "100%",
    opacity: 1
},
titleProductWrap:{
    display: 'flex', // -webkit-box;
    paddingHorizontal: 8,
    width: "100%"
},
titleProduct:{
    flexDirection: 'column', // -webkit-box-orient: vertical;
    overflow: 'hidden', // overflow: hidden;
    fontSize: 12, // font-size: 12px;
    lineHeight: 18, // line-height: 150% (12 * 1.5 = 18);
    color: 'rgb(39, 39, 42)', // color: rgb(39, 39, 42);
    margin: 0, // margin: 0px;
},
priceProductWrap:{
    paddingHorizontal: 8,
    paddingBottom: 8
},
priceProduct:{
    margin: 0, // margin: 0px;
    display: 'flex', // display: flex;
    textAlign: 'left', // text-align: left;
    fontSize: 16, // font-size: 16px;
    lineHeight: 24, // line-height: 150%; (tính theo fontSize * 1.5)
    fontWeight: '500', // font-weight: 500;
    color: 'rgb(39, 39, 42)', // color: rgb(39, 39, 42);
},
fillter:{
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-around',
    padding: 3,

},
fillter_btn:{
    color: 'red',
    fontSize: 20,
    padding: 10,
},
buttonText: {

  },
dot:{
    marginTop: -10,
    fontSize: 20,
    color: '#ccc'
},
line:{
    height: 10,
    color: 'blue',
    backgroundColor: '#ccc',
    marginVertical: 10
}
});
// const styles = StyleSheet.create({
//     upperHeaderPlaceholder: {
//         marginTop: 102,
//         marginBottom: 80
//     },
//     cartItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         backgroundColor: '#fff'
//     },
//     itemInfo: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         position: 'relative'
//     },
//     itemCheckBox: {
//         flex: 1,
//         paddingRight: 8
//     },
//     itemImage: {
//         flex: 3,
//         width: 80,
//         height: 80
//     },
//     itemDetails: {
//         flex: 8,
//         marginLeft: 10
//     },
//     itemTitle: {
//         fontSize: 16,
//         fontWeight: 'normal',

//     },
//     itemDes: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     desLeft: {
//         color: colors.orange,
//         fontWeight: 'bold',
//         fontSize: 15,
//         marginRight: 8
//     },
//     desRight: {
//         color: colors.green,
//         fontWeight: '700',
//         fontSize: 13,
//     },
//     itemPrice: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     itemPriceLeft: {
//         color: colors.redPrice,
//         fontWeight: '600',
//         fontSize: 15
//     },
//     itemPriceRight: {
//         color: colors.grey,
//         textDecorationLine: 'line-through',
//         marginLeft: 8
//     },
//     containerQuantity: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 8
//     },
//     itemQuantity: {
//         fontSize: 14,
//         color: '#777',
//         paddingHorizontal: 12,
//         paddingVertical: 1,
//         borderTopColor: '#e5e5e5',
//         borderTopWidth: 1,
//         borderBottomColor: '#e5e5e5',
//         borderBottomWidth: 1,

//     },
//     decrease: {
//         borderColor: '#e5e5e5',
//         borderWidth: 1,
//         paddingHorizontal: 2,
//         paddingVertical: 1,
//     },
//     increase: {
//         borderColor: '#e5e5e5',
//         borderWidth: 1,
//         paddingHorizontal: 2,
//         paddingVertical: 1,
//     },
//     itemDelete: {
//         position: 'absolute',
//         zIndex: 5,
//         bottom: 0,
//         right: 0,
//         padding: 4
//     },
//     textDelete: {
//         color: colors.blueRoot,
//         fontSize: 14,
//     },
//     character: {
//         flex: 1,
//         display: "flex",
//         flexDirection: "row"
//     },
//     sizeName: {
//         marginRight: 8,
//         fontSize: 13
//     },
//     size: {
//         fontSize: 13
//     }
// });
export default HistoryViewProduct;
