import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'; // Import the useSelector hook from react-redux
import { colors } from '../../../../theme';
import { MapScreen } from './MapScreen';
import { ScrollView } from 'react-native-web';

const GoogleMapsScreen = () => {
  const address = useSelector((state) => state.map.address);

  return (
    <View style={styles.container}>
      <MapScreen></MapScreen>
      <View style={styles.mainContent}>
        <View>
          <View style={styles.view_contain_text}>
            <Text style={styles.fontSizeText}>Tên người nhận</Text>
          </View>
          <View style={styles.view_contain_text_input}>
            <TextInput placeholder="Nhập Họ Tên" />
          </View>

          <View style={styles.view_contain_text}>
            <Text style={styles.fontSizeText}>Số điện thoại</Text>
          </View>
          <View style={styles.view_contain_text_input}>
            <TextInput keyboardType="numeric" placeholder="Nhập Số điện thoại" />
          </View>
        </View>

        <View style={styles.view_contain_text}>
          <Text style={styles.fontSizeText}>Tỉnh/ Thành phố</Text>
        </View>
        <View style={styles.view_contain_text_input}>
          <TextInput placeholder="Chọn Tỉnh/Thành Phố" value={address.province} />
        </View>

        <View style={styles.view_contain_text}>
          <Text style={styles.fontSizeText}>Quận/ Huyện</Text>
        </View>
        <View style={styles.view_contain_text_input}>
          <TextInput placeholder="Chọn Quận/Huyện" value={address.district} />
        </View>

        <View style={styles.view_contain_text}>
          <Text style={styles.fontSizeText}>Phường/ Xã</Text>
        </View>
        <View style={styles.view_contain_text_input}>
          <TextInput placeholder="Chọn Phường/Xã" value={address.ward} />
        </View>

        <View style={styles.view_contain_text}>
          <Text style={styles.fontSizeText}>Địa chỉ nhận hàng</Text>
        </View>
        <View style={styles.view_contain_text_input}>
          <TextInput placeholder="Tòa nhà, số nhà, tên đường" value={address.street} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btConfirm} onPress={() => {}}>
          <Text style={[{ fontSize: 16 }, styles.text_in_button]}>Xác Nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    backgroundColor: 'white',
    padding: 5,
  },
  view_contain_text: {
    marginTop: 7,
    marginBottom: 7,
  },
  view_contain_text_input: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 3,
  },
  fontSizeText: {
    fontSize: 15,
  },
  btConfirm: {
    backgroundColor: colors.bgButtonRed,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text_in_button: {
    color: 'white',
    fontWeight: 400,
  },
  footer: {
    backgroundColor: 'white',
    padding: 5,
  },
});

export default GoogleMapsScreen;
