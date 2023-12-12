import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../theme";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProductReview = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const getFeedbackText = () => {
    switch (rating) {
      case 1:
        return "Tệ";
      case 2:
        return "Không hài lòng";
      case 3:
        return "Bình thường";
      case 4:
        return "Hài lòng";
      case 5:
        return "Cực kỳ hài lòng";
      default:
        return "";
    }
  };

  const handleSendComment = () => {
    // Handle sending the review (rating and comment)
    // ...

    // Clear the comment input after sending
    setComment("");
  };

  return (
    <View style={styles.container}>
      {/* Star Rating */}
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleStarPress(i)}
            style={styles.starIcon}
          >
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}
              size={30}
              color={i <= rating ? "gold" : "gray"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Text */}
      <Text style={styles.feedbackText}>{getFeedbackText()}</Text>

      {/* Comment Input */}
      <TextInput
        style={styles.commentInput}
        multiline
        placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
        <Text style={styles.sendButtonText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  feedbackText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 2,
    padding: 10,
    marginBottom: 16,
    height: 150,
  },
  sendButton: {
    backgroundColor: colors.blueRoot,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductReview;
