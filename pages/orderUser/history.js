
import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HistorySell = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  // Lấy dữ liệu từ API khi mở ứng dụng
  useEffect(() => {
    fetchData(); // Fetch data with default phone number
  }, []);

  // Tìm kiếm khi số điện thoại thay đổi
  useEffect(() => {
   fetchData(searchQuery);
  }, [searchQuery]);

  // Hàm lấy dữ liệu từ API dựa trên số điện thoại
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://tmt020202ccna-001-site1.atempurl.com/api/history/lich-su-mua-hang?phoneNumber=${searchQuery}&page=1&pageSize=9`
      );
      const jsonData = await response.json();
      if (jsonData.succeeded) {
        setPurchaseHistory(jsonData.data);
        setFilteredHistory(jsonData.data); // Set filtered data initially with all orders
      } else {

       
      }
      setIsLoading(false);
    } catch (error) {
      

      setIsLoading(false);
    }
  };

  // Hàm tìm kiếm đơn hàng bằng số điện thoại
  const searchOrdersByPhoneNumber = (phoneNumber) => {
    const filteredData = purchaseHistory.filter(item =>
      item.phoneNumber.includes(phoneNumber)
    );
    setFilteredHistory(filteredData);
  };

  const renderPurchaseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.purchaseItem}
    >
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.name_status_order}</Text>
        <View style={styles.purchaseInfo}>
          <Text style={styles.purchaseText}>
            Mã đơn hàng: <Text style={styles.purchaseValue}>{item.id_order}</Text>
          </Text>
          <Text style={styles.purchaseText}>
            Thời gian: <Text style={styles.purchaseValue}>{item.time_order}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>

        <TouchableOpacity style={styles.detailButton} onPress={() =>
      navigation.navigate("OrderDetail", {
      orderId: item.id_order,
      phone : searchQuery,
      })}>
          <Text style={styles.buttonText}>Xem chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateButton}>
    <Text style={styles.buttonText}>Đánh giá</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.buyAgainButton}>
    <Text style={styles.buttonText}>Mua lại</Text>
  </TouchableOpacity>


      </View>
    </TouchableOpacity>
  );

  return (

    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Nhập số điện thoại để tìm kiếm đơn hàng của bạn ..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Icon name="search" size={20} color="#333" />
      </View>

      {isLoading ? (
        <Text>Đang tải...</Text>
      ) : (
        <FlatList
          data={filteredHistory}
          keyExtractor={(item) => item.id_order.toString()}
          renderItem={renderPurchaseItem}
        />
      )}

      
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20, 
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  purchaseItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#000',
  },
  productTitle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveredText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
  ratingText: {
    color: 'orange',
    fontWeight: 'bold',
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  buyAgainButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  rateButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  buttonText: {
    color: '#3498db',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  purchaseQuantity: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
  },
  purchaseInfo: {
    marginTop: 5,
    padding: 15, // Đặt padding ở đây nếu bạn muốn có khoảng trắng xung quanh nội dung bên trong
  },
  purchaseTime: {
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
  purchaseText: {
    color: '#333',
    fontSize: 14,
    marginTop: 5,
  },
  purchaseValue: {
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },

  detailButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#3498db',
  },

});


export default HistorySell;
