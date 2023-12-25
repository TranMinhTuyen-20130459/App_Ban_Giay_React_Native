import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WINDOW_WIDTH, formatMoney } from '../../../../utils/Utils';
import CheckBox from 'react-native-check-box';
import { colors } from '../../../../theme';
import CartItemsList from '../../../../components/CartItemsList';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, removeAllCart, removeCart } from '../../../../redux/slices/CartsSlice';
import {addOrderProduct, removeAllOrderProduct} from '../../../../redux/slices/OrderProductSlice';

export default function CartScreen() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    // Sử dụng useSelector để lấy trạng thái của thông tin địa chỉ giao hàng
    const orderAddress = useSelector(state => state.address_order);
    useEffect(() => {
        if (isFocused) {
            StatusBar.setBarStyle('light-content');
        } else {
            StatusBar.setBarStyle('dark-content');
        }
    }, [isFocused]);

    // Đọc carts từ Redux store
    const carts = useSelector((state) => state.carts);
    // danh sách sản phẩm trong giỏ hàng
    const [cartItems, setCartItems] = useState(carts);
    // theo dõi carts trong redux nếu nó thay đổi sẽ set lại cartItems
    useEffect(() => {
        setCartItems(carts)
    }, [carts]);
    const [checkAll, setCheckAll] = useState(false)

    // xử lý modal
    // isDeleteModalVisible dùng để ẩn hiện modal
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    // title của modal
    const [titleModal, setTitleModal] = useState("");
    // id product muốn xóa
    const [idDelete, setIdDelete] = useState(null);
    const [deleteAll, setDeleteAll] = useState(null);
    // -------------------------------------


    const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());
    const [totalSelectedQuantity, setTotalSelectedQuantity] = useState(calculateTotalQuantity());

    // theo dõi cartItems khi nó có thay đổi sẽ set lại tính tổng tiền
    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
        setTotalSelectedQuantity(calculateTotalQuantity());
    }, [cartItems]);

    const toggleItemSelection = (idv4) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.idv4 === idv4) {
                return {
                    ...item,
                    isChecked: !item.isChecked,
                };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        // Cập nhật trạng thái của checkbox "Chọn tất cả"
        const isAllItemsChecked = updatedCartItems.every((item) => item.isChecked);
        setCheckAll(isAllItemsChecked);
    };

    // hàm modal xóa tất cả
    const showDeleteAllModal = () => {
        // setTitle của modal
        setTitleModal("Bạn có muốn xóa toàn bộ sản phẩm")
        setDeleteAll(1)
        // hiện modal
        setDeleteModalVisible(true);
    }

    const toggleCheckAll = () => {
        const newCheckAllState = !checkAll;
        setCheckAll(newCheckAllState);
        // Cập nhật trạng thái của tất cả các checkbox item
        const updatedCartItems = cartItems.map((item) => ({
            ...item,
            isChecked: newCheckAllState,
        }));
        setCartItems(updatedCartItems);
    };

    // Hàm hiển thị modal xác nhận xóa
    const showDeleteModal = (itemId) => {
        // setTitle của modal
        setTitleModal("Bạn có muốn xóa sản phẩm đang chọn")
        // set id muốn xóa
        setIdDelete(itemId);
        // hiện modal
        setDeleteModalVisible(true);
    };

    // Hàm ẩn modal khi bấm không
    const hideDeleteModal = () => {
        // setDeleteModalVisible= false để ẩn modal
        setDeleteModalVisible(false);
        setIdDelete(null)
        setDeleteAll(null)
    };

    // Hàm xác nhận xóa mặt hàng
    const confirmDeleteItem = () => {
        if (deleteAll) {
            // gọi xuống redux để xóa product
            dispatch(removeAllCart())
        }
        if (idDelete) {
            console.log(idDelete)
            // gọi xuống redux để xóa product
            dispatch(removeCart(idDelete))
        }
        // ẩn modal
        hideDeleteModal();
    };

    // tính tổng tiền
    function calculateTotalPrice() {
        let totalPrice = 0;
        for (const item of cartItems) {
            if (item.isChecked) {
                // Nếu sản phẩm đã được chọn, thì cộng giá tiền vào tổng
                totalPrice += item.discountPrice * item.quantity;
            }
        }
        return totalPrice;
    };

    // tổng số lượng sản phẩm trong giỏ hàng
    function calculateTotalQuantity() {
        let totalQuantity = 0;
        for (const item of cartItems) {
            if (item.isChecked) {
                totalQuantity += 1;
            }
        }
        return totalQuantity;
    }

    // xử lý để qua trang mua hàng
    const handleBuy = () => {
        const cartsBuy = cartItems.filter(item => item.isChecked === true);
        if (cartsBuy.length > 0) {

            dispatch(removeAllOrderProduct())

            // thêm vào checkout ở redux
            cartsBuy.map(item => dispatch(addOrderProduct(item)))

            navigation.navigate('OrderConfirm');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('OrderAddress')}
                    style={styles.containerAddress}
                >
                    <Ionicons name="location" size={18} color='#0a74e4'></Ionicons>
                    {
                        orderAddress ?
                            (<Text numberOfLines={1} style={styles.textAddress}>
                                {orderAddress.to_address.address}, {orderAddress.to_address.ward_name}
                                , {orderAddress.to_address.district_name}, {orderAddress.to_address.province_name}
                            </Text>)
                            :
                            (<Text numberOfLines={1} style={styles.textAddress}>Bạn hãy chọn địa chỉ giao hàng</Text>)
                    }

                    <Ionicons name="chevron-forward" size={18} color={colors.grey}></Ionicons>
                </TouchableOpacity>
                <View style={styles.checkAll}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            isChecked={checkAll}
                            onClick={() => toggleCheckAll()}
                            checkBoxColor={colors.grey}
                            checkedCheckBoxColor={colors.blueRoot}
                        ></CheckBox>
                        <Text style={{ marginLeft: 12 }}>{`Tất cả (${cartItems.length} sản phẩm)`}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => showDeleteAllModal()}
                    >
                        <Ionicons name="trash-outline" size={22} color={colors.grey}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
            <CartItemsList
                // truyền data cho cartItemsList
                data={cartItems}
                // hiện checkbox của từng product
                showCheckBox={true}
                // truyền hàm chọn checkbox cho CartItemsList
                toggleItemSelection={toggleItemSelection}
                // hiện số lượng của từng product
                showQuantity={true}
                //truyền hàm hiện modal cho cartItemsList
                showDeleteModal={showDeleteModal}
            />
            <View style={styles.footer}>
                <View style={{ flexDirection: 'column', padding: 16 }}>
                    <Text style={{ fontSize: 14 }}>Tổng cộng</Text>
                    <Text style={{ fontSize: 22, color: colors.redPrice, fontWeight: 600, marginTop: 4 }}>
                        {
                            !totalPrice ? (
                                <Text style={{ fontSize: 14, color: colors.redPrice, fontWeight: 400 }}>Vui lòng chọn sản
                                    phẩm</Text>)
                                : formatMoney(totalPrice)
                        }
                    </Text>
                </View>
                <View style={{ padding: 16 }}>
                    <TouchableOpacity
                        onPress={handleBuy}
                        style={{
                            backgroundColor: colors.bgButtonRed,
                            paddingHorizontal: 18,
                            paddingVertical: 10,
                            borderRadius: 4
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 18 }}>Mua hàng ({totalSelectedQuantity})</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Modal xác nhận xóa hay không */}
            <Modal
                visible={isDeleteModalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            {titleModal}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            textAlign: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity
                                onPress={hideDeleteModal}
                                style={styles.modalButton}
                            >
                                <Text style={styles.modalButtonText}>Không</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={confirmDeleteItem}
                                style={styles.modalButton}
                            >
                                <Text style={styles.modalButtonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
    },
    upperHeaderPlaceholder: {
        // height: '80%',
        marginTop: 102,
    },
    upperFooterPlaceholder: {
        height: 80,
        backgroundColor: 'red'
    },

    header: {
        position: 'absolute',
        zIndex: 10,
        flex: 1,

    },
    containerAddress: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        width: WINDOW_WIDTH,

    },
    textAddress: {
        color: colors.grey,
        paddingHorizontal: 6,
        flexWrap: 'wrap',
        width: '90%'
    },
    // container: {
    //   flex: 1,
    // },
    checkAll: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff',
        marginVertical: 8,
        alignItems: 'center',
        alignContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 14,
        width: 300,
        overflow: 'hidden',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    modalButton: {
        padding: 12,
        width: '50%',
        borderColor: '#e5e5e5',
        borderWidth: 1,
    },
    modalButtonText: {
        color: colors.blueRoot,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    footer: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        height: 80,
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


});