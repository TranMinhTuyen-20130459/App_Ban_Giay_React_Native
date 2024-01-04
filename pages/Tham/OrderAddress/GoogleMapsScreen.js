import React, {useState} from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {colors} from '../../../theme';
import {MapComponent} from './MapComponent';
import {useDispatch, useSelector} from 'react-redux';
import {setAddress} from '../../../redux/slices/OrderAddressSlice';
import {useNavigation} from '@react-navigation/native';
import {
    returnValueErrorAddressDetail,
    returnValueErrorDistrict,
    returnValueErrorOfNameCustomer,
    returnValueErrorOfPhoneNumber,
    returnValueErrorProvince,
    returnValueErrorWard
} from "../../Tuyen/util/CheckValid";

const GoogleMapsScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Lấy thông tin địa chỉ giao hàng từ Redux để hiển thị trên màn hình
    const order_address = useSelector((state) => state.address_order);

    // Các biến state để lưu giá trị từ TextInput và lỗi tương ứng
    const [name_customer, setNameCustomer] = useState(order_address?.name_customer || '');
    const [phone_number, setPhoneNumber] = useState(order_address?.phone_number || '');
    const [to_address, setToAddress] = useState(order_address?.to_address || {});
    const [ward_name, setWardName] = useState(to_address?.ward_name || '');
    const [district_name, setDistrictName] = useState(to_address?.district_name || '');
    const [province_name, setProvinceName] = useState(to_address?.province_name || '');
    const [address_detail, setAddressDetail] = useState(to_address?.address || '');

    // Các state để quản lý lỗi
    const [nameError, setNameError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [provinceError, setProvinceError] = useState(null);
    const [districtError, setDistrictError] = useState(null);
    const [wardError, setWardError] = useState(null);
    const [addressError, setAddressError] = useState(null);

    // Đối tượng địa chỉ mới
    const newOrderAddress = {
        name_customer: name_customer,
        phone_number: phone_number,
        to_address: {
            address: address_detail,
            ward_name: ward_name,
            district_name: district_name,
            province_name: province_name,
            ward_id: 'GG_MAP',
            district_id: 'GG_MAP',
            province_id: 'GG_MAP'
        },
    };

    // Hàm cập nhật thông tin địa chỉ giao hàng
    const handleUpdateAddress = (newAddress) => {
        setToAddress(newAddress);
        setAddressDetail(to_address?.address || '');
        setWardName(to_address?.ward_name || '');
        setDistrictName(to_address?.district_name || '');
        setProvinceName(to_address?.province_name || '');
    };

    // Hàm kiểm tra sự hợp lệ của dữ liệu
    const validateData = () => {

        const errorOfNameCustomer = returnValueErrorOfNameCustomer(name_customer);
        const errorOfPhoneNumber = returnValueErrorOfPhoneNumber(phone_number);
        const errorProvince = returnValueErrorProvince(province_name);
        const errorDistrict = returnValueErrorDistrict(district_name);
        const errorWard = returnValueErrorWard(ward_name);
        const errorAddressDetail = returnValueErrorAddressDetail(address_detail);

        setNameError(errorOfNameCustomer);
        setPhoneError(errorOfPhoneNumber);
        setProvinceError(errorProvince);
        setDistrictError(errorDistrict);
        setWardError(errorWard);
        setAddressError(errorAddressDetail);

        if (errorOfNameCustomer || errorOfPhoneNumber || errorProvince || errorDistrict || errorWard || errorAddressDetail) {
            Alert.alert('Thông báo', 'Vui lòng kiểm tra lại thông tin nhập vào');
            return false; // Dữ liệu không hợp lệ
        }
        return true; // Dữ liệu hợp lệ
    };

    const handleClickButtonConfirm = () => {

        if (!validateData()) return; // Dữ liệu không hợp lệ

        // Nếu không có lỗi, tiếp tục xử lý
        // Cập nhật địa chỉ giao hàng mới vào Redux
        dispatch(setAddress(newOrderAddress));

        // Chuyển màn hình đến 'OrderConfirm'
        navigation.navigate('OrderConfirm');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
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
                                    onChangeText={(text) => {
                                        setNameCustomer(text);
                                        setNameError(null); // Xóa lỗi khi người dùng thay đổi giá trị
                                    }}
                                />
                                {nameError && <Text style={styles.errorText}>{nameError}</Text>}
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
                                    onChangeText={(text) => {
                                        setPhoneNumber(text);
                                        setPhoneError(null);
                                    }}
                                />
                                {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                            </View>
                        </View>

                        {/* Tỉnh/ Thành phố */}
                        <View style={styles.view_contain_text}>
                            <Text style={styles.fontSizeText}>Tỉnh/ Thành phố</Text>
                        </View>
                        <View style={styles.view_contain_text_input}>
                            <TextInput
                                placeholder="Chọn Tỉnh/Thành Phố"
                                value={province_name}
                                onChangeText={(text) => {
                                    setProvinceName(text);
                                    setProvinceError(null);
                                }}
                            />
                            {provinceError && <Text style={styles.errorText}>{provinceError}</Text>}
                        </View>

                        {/* Quận/ Huyện */}
                        <View style={styles.view_contain_text}>
                            <Text style={styles.fontSizeText}>Quận/ Huyện</Text>
                        </View>
                        <View style={styles.view_contain_text_input}>
                            <TextInput
                                placeholder="Chọn Quận/Huyện"
                                value={district_name}
                                onChangeText={(text) => {
                                    setDistrictName(text);
                                    setDistrictError(null);
                                }}
                            />
                            {districtError && <Text style={styles.errorText}>{districtError}</Text>}
                        </View>

                        {/* Phường/ Xã */}
                        <View style={styles.view_contain_text}>
                            <Text style={styles.fontSizeText}>Phường/ Xã</Text>
                        </View>
                        <View style={styles.view_contain_text_input}>
                            <TextInput
                                placeholder="Chọn Phường/Xã"
                                value={ward_name}
                                onChangeText={(text) => {
                                    setWardName(text);
                                    setWardError(null);
                                }}
                            />
                            {wardError && <Text style={styles.errorText}>{wardError}</Text>}
                        </View>

                        {/* Địa chỉ nhận hàng */}
                        <View style={styles.view_contain_text}>
                            <Text style={styles.fontSizeText}>Địa chỉ nhận hàng</Text>
                        </View>
                        <View style={styles.view_contain_text_input}>
                            <TextInput
                                placeholder="Tòa nhà, số nhà, tên đường"
                                value={address_detail}
                                onChangeText={(text) => {
                                    setAddressDetail(text);
                                    setAddressError(null);
                                }}
                            />
                            {addressError && <Text style={styles.errorText}>{addressError}</Text>}
                        </View>
                    </View>

                    {/* Footer với nút Xác Nhận */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.btConfirm}
                            onPress={handleClickButtonConfirm}>
                            <Text style={[{fontSize: 16}, styles.text_in_button]}>
                                Xác Nhận
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        position: 'relative',
    },
    fontSizeText: {
        fontSize: 17,
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
    },
});

export default GoogleMapsScreen;
