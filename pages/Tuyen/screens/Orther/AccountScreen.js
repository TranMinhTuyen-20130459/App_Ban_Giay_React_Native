import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react'; // Import useEffect từ react thay vì componentWillUnmount
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../../theme';
import {WINDOW_HEIGHT} from '../../../../utils/Utils';
import CartIcon from '../../../../components/CartIcon';

function AccountScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Sử dụng useIsFocused để kiểm tra màn hình này có đang được tập trung hay không
  useEffect(() => {
    // Nếu màn hình này đang được tập trung, cập nhật StatusBar
    if (isFocused) {
      StatusBar.setBarStyle('light-content');
    } else {
      // Nếu không, khôi phục StatusBar theo mặc định
      StatusBar.setBarStyle('dark-content');
    }
  }, [isFocused]); // Chạy lại khi giá trị isFocused thay đổi


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={styles.iconContainer}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <CartIcon
          sizeIcon={26}
          colorIcon="#fff"
          activeBGColor={true}
          bGQuantity={colors.orange}
          colorQuantity='#000'
        />
      </View>
        <View style={styles.upperHeaderPlaceholder} />
        <View style={styles.scrollViewContent}>
          <View style={styles.containerAccount}>
            <View style={styles.circleBackGround}></View>
            <View style={styles.account}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Setting')}
                style={styles.addAvatar}
              >
                <Ionicons style={styles.iconPerson} name="person-outline" size={24} color={colors.blueRoot} />
                <Ionicons style={styles.iconPencil} name="pencil-outline" size={8} color="#fff" />
              </TouchableOpacity>
              <View style={styles.containerName}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>Tuyên Kun</Text>
                  <Ionicons style={{ marginLeft: 4, paddingTop: 3 }} name="chevron-forward-outline" size={18} color="#000" />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Setting')}
                  style={styles.addName}
                >
                  <Ionicons name="add-outline" size={14} color="#000" />
                  <Text style={{ fontSize: 12 }}>Thêm nickname</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 12, padding: 4, backgroundColor: '#dcdcdc', borderRadius: 14, fontSize: 14, width: 90, textAlign: 'center' }}>Khách hàng</Text>
              </View>
            </View>
          </View>
          <View style={styles.containerMySevice}>
            <TouchableOpacity
             onPress={() => navigation.navigate('HistorySell')}
            >
              <View style={styles.containerTitle}>
                <Text style={{ fontSize: 16 }}>Đơn hàng của tôi</Text>
                <Ionicons style={{ marginLeft: 4, paddingTop: 3 }} name="chevron-forward-outline" size={20} color={colors.blueRoot} />
              </View>
            </TouchableOpacity>

            <View style={styles.listIconOrder}>
              <TouchableOpacity
               
                style={styles.itemIconOrder}>
                <View style={styles.containerIcon}>
                  <Ionicons name="wallet-outline" size={20} color={colors.blueRoot}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Chờ thanh toán</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemIconOrder}
                
              >
                <View style={styles.containerIcon}>
                  <Ionicons name="file-tray-stacked-outline" size={20} color={colors.blueRoot}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Đang xử lý</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemIconOrder}
               
              >
                <View style={styles.containerIcon}>
                  <Ionicons name="car-outline" size={20} color={colors.blueRoot}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Đang vận chuyển</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemIconOrder}

              
              >
                <View style={styles.containerIcon}>
                  <Ionicons name="checkbox-outline" size={20} color={colors.blueRoot}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Đã giao</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemIconOrder}
                onPress={() => navigation.navigate('Setting')}
              >
                <View style={styles.containerIcon}>
                  <Ionicons name="refresh-circle-outline" size={20} color={colors.blueRoot}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Đổi trả</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerMySevice}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
            >
              <View style={styles.containerTitle}>
                <Text style={{ fontSize: 16 }}>Đánh giá sản phẩm</Text>
                <Ionicons style={{ marginLeft: 4, paddingTop: 3 }} name="chevron-forward-outline" size={20} color={colors.blueRoot} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.containerMySevice}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
            >
              <View style={styles.containerTitle}>
                <Text style={{ fontSize: 16 }}>Trạm dịch vụ tiện ích</Text>
                <Ionicons style={{ marginLeft: 4, paddingTop: 3 }} name="chevron-forward-outline" size={20} color={colors.blueRoot} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.containerMySevice}>
            <View>
              <View style={styles.containerTitle}>
                <Text style={{ fontSize: 16 }}>Quan tâm</Text>
                <Ionicons style={{ marginLeft: 4, paddingTop: 3 }} name="chevron-forward-outline" size={20} color={colors.blueRoot} />
              </View>
            </View>

            <View style={styles.listIconOrder}>
              <TouchableOpacity
                 onPress={() => navigation.navigate('HistoryViewProduct')}
                style={styles.itemIconOrder}>
                <View style={styles.containerIconSeen}>
                  <Ionicons name="eye" size={20} color={colors.green}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Đã xem</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemIconOrder}
                onPress={() => navigation.navigate('favories')}
              >
                <View style={styles.containerIconLove}>
                  <Ionicons name="heart" size={20} color={colors.redHeart}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Yêu thích</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemIconOrder}
                onPress={() => navigation.navigate('Setting')}
              >
                <View style={styles.containerIconRegain}>
                  <Ionicons name="briefcase" size={20} color={colors.yellow}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Mua lại</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemIconOrder}
                onPress={() => navigation.navigate('Setting')}
              >
                <View style={styles.containerIconFollow}>
                  <Ionicons name="newspaper" size={20} color={colors.blueRoot}></Ionicons>
                </View>
                <Text style={styles.textOrder}>Theo dõi</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerMySevice}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
            >
              <View style={styles.containerTitle}>
                <Text style={{ fontSize: 16 }}>Trung tâm trợ giúp</Text>
                <Ionicons style={{ marginLeft: 4, paddingTop: 3 }} name="chevron-forward-outline" size={20} color={colors.blueRoot} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 16,
    paddingTop: 32,
    height: 90,
    backgroundColor: colors.blueRoot,
    position: 'absolute',
    width: '100%',
    zIndex: 10
  },
  scrollViewContent: {
    height: WINDOW_HEIGHT * 2,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  upperHeaderPlaceholder: {
    height: 90,
  },
  containerAccount: {
    backgroundColor: "#fff",
    position: 'relative',
    width: '100%',
  },
  circleBackGround: {
    zIndex: 1,
    position: 'absolute',
    width: 600,
    height: 600,
    backgroundColor: colors.blueRoot,
    borderRadius: 1000,
    top: -530,
    left: '50%', // Đặt left thành 50% để căn giữa theo chiều ngang
    marginLeft: -300, // Điều chỉnh marginLeft và marginTop để căn giữa hoàn toàn
  },
  account: {
    zIndex: 2,
    backgroundColor: '#fff',
    marginHorizontal: 18,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 6,
    elevation: 8,
    shadowColor: '#474747',

  },
  addAvatar: {
    position: 'relative',
    width: 70,
    height: 70,
    backgroundColor: colors.bgButtonBlue,
    borderRadius: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#c2e1ff',
    borderWidth: 2
  },
  iconPerson: {
    color: colors.blueRoot,
    fontSize: 36,

  },
  iconPencil: {
    position: 'absolute',
    display: 'flex',
    width: 14,
    height: 14,
    backgroundColor: '#64646d',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    bottom: 10,
    right: -1,
  },
  containerName: {
    flexDirection: 'column',
    paddingLeft: 18,
  },
  addName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerMySevice: {
    marginHorizontal: 18,
    marginVertical: 16
  },
  containerTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listIconOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  itemIconOrder: {
    flex: 1,
    alignItems: 'center',
  },
  containerIcon: {
    backgroundColor: colors.bgButtonBlue,
    padding: 10,
    borderRadius: 12
  },
  textOrder: {
    textAlign: 'center',
    fontSize: 12
  },
  containerIconSeen: {
    backgroundColor: colors.bgButtonGreen,
    padding: 10,
    borderRadius: 12
  },
  containerIconLove: {
    backgroundColor: colors.bgButtonRedHeart,
    padding: 10,
    borderRadius: 12
  },
  containerIconRegain: {
    backgroundColor: colors.bgButtonYellow,
    padding: 10,
    borderRadius: 12
  },
  containerIconFollow: {
    backgroundColor: colors.bgButtonBlue,
    padding: 10,
    borderRadius: 12
  },
});

export default AccountScreen;
