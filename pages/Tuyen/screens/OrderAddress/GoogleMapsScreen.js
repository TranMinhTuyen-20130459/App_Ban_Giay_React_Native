import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {colors} from '../../../../theme';
import {MapComponent} from './MapComponent';
import {useDispatch, useSelector} from 'react-redux';
import {setAddress} from '../../../../redux/slices/OrderAddressSlice';
import {useNavigation} from '@react-navigation/native';

const GoogleMapsScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Lấy thông tin địa chỉ giao hàng từ Redux để hiển thị trên màn hình
    const order_address = useSelector((state) => state.address_order);

    // Các biến state để lưu giá trị từ TextInput
    const [name_customer, setNameCustomer] = useState(
        order_address?.name_customer || ''
    );
    const [phone_number, setPhoneNumber] = useState(
        order_address?.phone_number || ''
    );
    const [to_address, setToAddress] = useState(order_address?.to_address || {});

    // Đối tượng địa chỉ mới
    const newOrderAddress = {
        name_customer: name_customer,
        phone_number: phone_number,
        to_address: to_address,
    };

    // Hàm cập nhật thông tin địa chỉ giao hàng
    const handleUpdateAddress = (newAddress) => {
        setToAddress(newAddress);
    };

    // Xử lý khi nút Xác Nhận được nhấn
    const handleClickButtonConfirm = () => {

        // Kiểm tra xem Tên Người Nhận và Số Điện Thoại có giá trị hay không
        if (!name_customer || !phone_number) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin Tên Người Nhận và Số Điện Thoại.');
            return;
        }

        // Kiểm tra xem có thông tin địa chỉ nhận hàng không
        if (!to_address || !to_address?.province_name || !to_address?.district_name || !to_address?.ward_name || !to_address?.address) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin địa chỉ nhận hàng.');
            return;
        }

        // Cập nhật địa chỉ giao hàng mới vào Redux
        dispatch(setAddress(newOrderAddress));

        // Chuyển màn hình đến 'OrderConfirm'
        navigation.navigate('OrderConfirm');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <MapComponent onUpdateAddress={handleUpdateAddress}></MapComponent>
                <View style={styles.mainContent}>
                    <View>
                        {/* Tên người nhận */}
                        <View style={styles.view_contain_text}>
                            <Text style={styles.fontSizeText}>Tên người nhận</Text>
                        </View>
                        <View style={styles.view_contain_text_input}>
                            <TextInput
                                placeholder="Nhập Họ Tên"
                                value={name_customer}
                                onChangeText={(text) => setNameCustomer(text)}
                            />
                        </View>

                        {/* Số điện thoại */}
                        <View style={styles.view_contain_text}>
                            <Text style={styles.fontSizeText}>Số điện thoại</Text>
                        </View>
                        <View style={styles.view_contain_text_input}>
                            <TextInput
                                keyboardType="numeric"
                                placeholder="Nhập Số điện thoại"
                                value={phone_number}
                                onChangeText={(text) => setPhoneNumber(text)}
                            />
                        </View>
                    </View>

                    {/* Tỉnh/ Thành phố */}
                    <View style={styles.view_contain_text}>
                        <Text style={styles.fontSizeText}>Tỉnh/ Thành phố</Text>
                    </View>
                    <View style={styles.view_contain_text_input}>
                        <TextInput
                            placeholder="Chọn Tỉnh/Thành Phố"
                            value={to_address?.province_name || ''}
                            onChangeText={(text) => {
                                // Cập nhật state hoặc thực hiện bất kỳ logic cần thiết

                            }}
                        />
                    </View>

                    {/* Quận/ Huyện */}
                    <View style={styles.view_contain_text}>
                        <Text style={styles.fontSizeText}>Quận/ Huyện</Text>
                    </View>
                    <View style={styles.view_contain_text_input}>
                        <TextInput
                            placeholder="Chọn Quận/Huyện"
                            value={to_address?.district_name || ''}
                            onChangeText={(text) => {
                                // Cập nhật state hoặc thực hiện bất kỳ logic cần thiết
                            }}
                        />
                    </View>

                    {/* Phường/ Xã */}
                    <View style={styles.view_contain_text}>
                        <Text style={styles.fontSizeText}>Phường/ Xã</Text>
                    </View>
                    <View style={styles.view_contain_text_input}>
                        <TextInput
                            placeholder="Chọn Phường/Xã"
                            value={to_address?.ward_name || ''}
                            onChangeText={(text) => {
                                // Cập nhật state hoặc thực hiện bất kỳ logic cần thiết
                            }}
                        />
                    </View>

                    {/* Địa chỉ nhận hàng */}
                    <View style={styles.view_contain_text}>
                        <Text style={styles.fontSizeText}>Địa chỉ nhận hàng</Text>
                    </View>
                    <View style={styles.view_contain_text_input}>
                        <TextInput
                            placeholder="Tòa nhà, số nhà, tên đường"
                            value={to_address?.address || ''}
                            onChangeText={(text) => {
                                // Cập nhật state hoặc thực hiện bất kỳ logic cần thiết
                            }}
                        />
                    </View>
                </View>

                {/* Footer với nút Xác Nhận */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.btConfirm}
                        onPress={() => {
                            handleClickButtonConfirm();
                        }}>
                        <Text style={[{fontSize: 16}, styles.text_in_button]}>
                            Xác Nhận
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: 'white',
        padding: 5,
    },
});

export default GoogleMapsScreen;
