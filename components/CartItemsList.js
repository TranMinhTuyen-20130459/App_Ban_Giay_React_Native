import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import { WINDOW_HEIGHT, WINDOW_WIDTH, formatMoney } from '../utils/Utils';
import { colors } from '../theme';
import { useDispatch } from 'react-redux';
import { updateCart } from '../redux/slices/CartsSlice';

const CartItemsList = (props) => {
    const {
        data, toggleItemSelection, showCheckBox, showQuantity,
        showDeleteModal
    } = props
    const dispatch = useDispatch();
    // hàm tăng số lượng sản phẩm
    const increaseItemQuantity = (itemId, quantity) => {
        // update số lượng sản phẩm ở redux
        const cartUpdate = {
            idv4: itemId,
            quantity: quantity + 1,
        }
        dispatch(updateCart(cartUpdate))
    };
    // hàm giảm số lượng sản phẩm
    const decreaseItemQuantity = (itemId, quantity) => {
        if (quantity != 1) {
            // update số lượng sản phẩm ở redux
            const cartUpdate = {
                idv4: itemId,
                quantity: quantity - 1,
            }
            dispatch(updateCart(cartUpdate))
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
                <View style={styles.itemCheckBox}>
                    {
                        showCheckBox &&
                        (<CheckBox
                            isChecked={item.isChecked}
                            onClick={() => toggleItemSelection(item.idv4)}
                            checkBoxColor={colors.grey}
                            checkedCheckBoxColor={colors.blueRoot}
                        />)

                    }
                </View>
                <Image source={{ uri: item.path_img }}
                    style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.itemDes}>
                        <Text style={styles.desLeft}>FAST</Text>
                        <Text style={styles.desRight}>GIAO TIẾT KIỆM</Text>
                    </View>
                    <View style={styles.character}>
                        <Text style={styles.sizeName}>Size</Text>
                        <Text style={styles.size}>{item.size}</Text>
                    </View>
                    <View style={styles.itemPrice}>
                        <Text style={styles.itemPriceLeft}>{formatMoney(item.discountPrice * item.quantity)}</Text>
                        <Text style={styles.itemPriceRight}>{formatMoney(item.price * item.quantity)}</Text>
                    </View>
                    {
                        showQuantity && (
                            <View style={styles.containerQuantity}>
                                <TouchableOpacity
                                    style={styles.decrease}
                                    onPress={() => {
                                        if (item.quantity > 0) {
                                            decreaseItemQuantity(item.idv4, item.quantity);
                                        }
                                    }}
                                    disabled={item.quantity === 1}
                                >
                                    <Ionicons name="remove-outline" size={18} color={colors.grey}></Ionicons>
                                </TouchableOpacity>
                                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                                <TouchableOpacity style={styles.increase}
                                    onPress={() => increaseItemQuantity(item.idv4, item.quantity)}>
                                    <Ionicons name="add-outline" size={18} color={colors.grey}></Ionicons>
                                </TouchableOpacity>

                            </View>
                        )
                    }

                </View>
                {
                    showQuantity && (
                        <TouchableOpacity
                            style={styles.itemDelete}
                            onPress={() => showDeleteModal(item.idv4)}
                        >
                            <Text style={styles.textDelete}>Xóa</Text>
                        </TouchableOpacity>
                    )
                }


            </View>
        </View>
    );

    return (
        <View>
            <FlatList
                style={styles.upperHeaderPlaceholder}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.idv4}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    upperHeaderPlaceholder: {
        marginTop: 102,
        marginBottom: 80
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff'
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    itemCheckBox: {
        flex: 1,
        paddingRight: 8
    },
    itemImage: {
        flex: 3,
        width: 80,
        height: 80
    },
    itemDetails: {
        flex: 8,
        marginLeft: 10
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'normal',

    },
    itemDes: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    desLeft: {
        color: colors.orange,
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 8
    },
    desRight: {
        color: colors.green,
        fontWeight: '700',
        fontSize: 13,
    },
    itemPrice: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemPriceLeft: {
        color: colors.redPrice,
        fontWeight: '600',
        fontSize: 15
    },
    itemPriceRight: {
        color: colors.grey,
        textDecorationLine: 'line-through',
        marginLeft: 8
    },
    containerQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    itemQuantity: {
        fontSize: 14,
        color: '#777',
        paddingHorizontal: 12,
        paddingVertical: 1,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 1,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,

    },
    decrease: {
        borderColor: '#e5e5e5',
        borderWidth: 1,
        paddingHorizontal: 2,
        paddingVertical: 1,
    },
    increase: {
        borderColor: '#e5e5e5',
        borderWidth: 1,
        paddingHorizontal: 2,
        paddingVertical: 1,
    },
    itemDelete: {
        position: 'absolute',
        zIndex: 5,
        bottom: 0,
        right: 0,
        padding: 4
    },
    textDelete: {
        color: colors.blueRoot,
        fontSize: 14,
    },
    character: {
        flex: 1,
        display: "flex",
        flexDirection: "row"
    },
    sizeName: {
        marginRight: 8,
        fontSize: 13
    },
    size: {
        fontSize: 13
    }
});

export default CartItemsList;
