import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
} from "react-native";
import { colors } from "../../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export const HeaderProductDetail = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewOver = () => {
    // Show the modal for sharing
    setIsModalVisible(true);
  };

  const carts = useSelector((state) => state.carts);
  const [cartsCount, setCartsCount] = useState(carts.length);
  useEffect(() => {
    setCartsCount(carts.length);
  }, [carts]); // Gọi useEffect khi cartItems thay đổi

  return (
    <>
      <View style={[styles.headerContainer]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.exit, styles.backgroundRadiusIcon]}
        >
          <Ionicons
            name="chevron-back-outline"
            size={26}
            color={colors.white}
          ></Ionicons>
        </TouchableOpacity>
        <View style={styles.iconCart}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.backgroundRadiusIcon}
          >
            <Ionicons name="cart-outline" size={26} color={colors.white} />
            {cartsCount > 0 && (
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 7.5,
                  position: "absolute",
                  top: -5,
                  right: -5,
                  minWidth: 15,
                  minHeight: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: colors.white }}>{cartsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleViewOver}
            style={styles.backgroundRadiusIcon}
          >
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={26}
              color={colors.white}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          {/* Nút tắt */}
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
            style={styles.closeModalButton}
          >
            <Ionicons
              name="close-outline"
              size={26}
              color={colors.borderGray}
            ></Ionicons>
          </TouchableOpacity>

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>QR Code</Text>
            <Image
              source={{
                uri: "https://cdn.printgo.vn/uploads/media/790919/tao-ma-qr-code-san-pham-1_1620927223.jpg",
              }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 30,
    paddingVertical: 10,
  },
  exit: {
    // flex: 0.8,
  },
  iconCart: {
    flexDirection: "row",
    flex: 0.3,
    justifyContent: "space-between",
  },
  backgroundRadiusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: "gray",
    color: colors.white,

    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    margin: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModalButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: 250,
    height: 200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
