import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { View, Text, FlatList, Image, ScrollView, ProgressBarAndroid, TouchableOpacity, StyleSheet, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';
import { Dimensions } from 'react-native';
import { Button } from 'react-native';

import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavories } from '../../redux/slices/Favories';
const FavoriesViewProduct = () => {
    const dispatch = useDispatch();
    const favories = useSelector((state) => state.favories)
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
   

    const navigation = useNavigation();
    const removeToFavories = (id) => {
        
        dispatch(removeFavories(id))
       
    };

    return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.listProduct}>
                    {favories.map((item,index) => (
                            <TouchableOpacity
                            style={styles.productItem}
                            key={index}
                            onPress={() =>
                                navigation.navigate("ProductDetail", {
                                productId: item.id,
                                })
                            }
                            >
                            <View>
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
                                <Text style={styles.priceProduct}>{numberWithCommas(item.price)} đ</Text>
                                <Ionicons style={styles.icon_mic} name='heart' size={26} color={'red'} onPress={() => removeToFavories(item.id)} />
                            </View>
                            </View>
                            </TouchableOpacity>
                        ))}
                    </View>
               </ScrollView>
        </View>
       

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
    height: (height) * 0.3,
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
    paddingBottom: 8,
    flexDirection:'row',
    justifyContent: 'space-between'
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

export default FavoriesViewProduct;
