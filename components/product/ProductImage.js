import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Modal } from "react-native";
// const images = [
//   "https://salt.tikicdn.com/cache/368x368/ts/product/f5/09/03/d4de9f3e1445d76780a47f6f233037a8.png.webp",
//   "https://salt.tikicdn.com/cache/368x368/ts/product/f5/09/03/d4de9f3e1445d76780a47f6f233037a8.png.webp",
//   "https://salt.tikicdn.com/cache/368x368/ts/product/f5/09/03/d4de9f3e1445d76780a47f6f233037a8.png.webp",
//   "https://salt.tikicdn.com/cache/368x368/ts/product/f5/09/03/d4de9f3e1445d76780a47f6f233037a8.png.webp",
// ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    width: "100%",
    height: 280,
    resizeMode: "stretch",
  },
});

export const ProductImage = (props) => {
  const images = props.list.map((image) => {
    return image.path_image;
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <>
      <ScrollView>
        <FlatList
          data={props.list.map((image) => {
            return image.path_image;
          })}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                setSelectedImage(item);
                setModalVisible(true);
              }}
            >
              <Image
                source={{ uri: item }}
                style={{ width: 360, height: 280 }}
              />
            </TouchableWithoutFeedback>
          )}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          {/* Nút tắt */}
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          >
            <Ionicons name="close-outline" size={60}></Ionicons>
          </TouchableOpacity>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 360, height: 280 }}
              />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};
