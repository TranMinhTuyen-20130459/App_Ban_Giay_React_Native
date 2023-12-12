import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function CartIcon({ bGQuantity, activeBGColor, colorQuantity, sizeIcon, colorIcon }) {
  const navigation = useNavigation();
  const carts = useSelector((state) => state.carts)
  const styles = StyleSheet.create({
    iconContainer: {
      marginLeft: 16,
      flexDirection: 'row',
      position: 'relative',
    },
    quantityCart: {
      position: 'absolute',
      backgroundColor: bGQuantity || colors.orange,
      paddingHorizontal: 5,
      paddingVertical: 1,
      textAlign: 'center',
      borderRadius: 50,
      fontSize: 10,
      borderColor: '#FFFFFF',
      borderWidth: activeBGColor ? 1 : 0,
      right: -6,
      top: -6,
      color: colorQuantity || "#000"
    },
  })

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.iconContainer}
    >
      <Ionicons name="cart-outline" size={sizeIcon || 26} color={colorIcon || '#000'} />
      <Text style={styles.quantityCart}>{carts.length}</Text>
    </TouchableOpacity>
  )
}
export default CartIcon
