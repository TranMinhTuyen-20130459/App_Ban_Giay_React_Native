import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { View, Text, Image, ScrollView,ProgressBarAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Dimensions } from 'react-native';
import { Button } from 'react-native';
import Header from './home/Header';
import { useState } from 'react';
const ResultSearch = ({ route }) => {
  // Lấy dữ liệu từ params
  const searchQuery = route.params?.query || 'Không có dữ liệu tìm kiếm';
  const [data, setData] = useState([]);
    // gọi api để lấy dữ liệu
    const fetchData = async () => {
    try {
    
      const response = await fetch(
        "http://tmt020202ccna-001-site1.atempurl.com/api/products/ds-san-pham?name="+
        `${searchQuery}` +"&quantity=4" 
         
      );
     
      const jsonData = await response.json();
     console.log( "a "+jsonData)
      // set data bằng dữ liệu lấy được
      setData(jsonData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };
  useEffect(() => {
    // Gọi hàm tìm kiếm mỗi khi giá trị của input thay đổi
    fetchData()
   
  }, [searchQuery]);

  const handleButtonPress = () => {
    // Xử lý khi nút được nhấn
    Alert.alert('Button Pressed', 'Nút đã được nhấn!');
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.width + contentOffset.x >= contentSize.width - 20;

    if (isCloseToBottom && !loading) {
      fetchData();
    }
  };

    const navigation = useNavigation();
  return (
    <ScrollView>
    <View style={styles.container}>
      <Header></Header>
        <View style={styles.fillter}>
        <TouchableOpacity style={styles.button}onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Phổ biến</Text>
        </TouchableOpacity>
        <Text style={styles.dot} >.</Text>
        <TouchableOpacity style={styles.button}onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Bán chạy</Text>
        </TouchableOpacity>
        <Text style={styles.dot}>.</Text>
        <TouchableOpacity style={styles.button}onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Mới nhất</Text>
        </TouchableOpacity>
        <Text style={styles.dot}>.</Text>
        <TouchableOpacity style={styles.button}onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Giá</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        
        <View style={styles.listProduct}>
     
                {data.map((item) => (
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
                            source={{ uri: `${item.list_image[0].path_image}` }}
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
                            <Text style={styles.priceProduct}>{item.listed_price}</Text>
                        </View>
                        </TouchableOpacity>
                    ))}
                </View>

           


    </View>
    </ScrollView>      
    
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

export default ResultSearch;
