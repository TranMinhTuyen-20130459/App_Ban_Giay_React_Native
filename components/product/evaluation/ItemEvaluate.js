import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../theme";

export const ItemEvaluate = ({ data }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {};
  const handleComment = () => {
    // Show or hide the comment input
    setShowCommentInput(!showCommentInput);
  };
  const handleShare = () => {};

  return (
    <View styles={styles.container}>
      <View style={styles.horizontal}>
        <Text style={{ marginRight: 5 }}>
          {Array.from({ length: data.quantity_star }, (v, i) => (
            <Ionicons key={i} name="star" color={"gold"}></Ionicons>
          ))}
        </Text>
        <Text style={{ fontWeight: "bold" }}>{data.rank}</Text>
      </View>
      <View style={{}}>
        <Text>{data.content}</Text>
      </View>
      <View style={styles.horizontal}>
        <Text style={{ marginRight: 5, fontSize: 15, color: colors.grayLight }}>
          {data.fullname}
        </Text>
        <Text
          style={{
            backgroundColor: colors.borderGray,
            paddingHorizontal: 3,
            borderRadius: 6,
          }}
        >
          <Ionicons
            name="checkmark-circle"
            style={{ color: "green" }}
            size={15}
          ></Ionicons>
          Đã mua hàng
        </Text>
      </View>
      <View style={[styles.actionEvalu, styles.horizontal]}>
        <View style={{ fontSize: 50 }}>
          <TouchableOpacity style={{ fontSize: 30 }} onPress={handleLike}>
            <Ionicons name="heart-outline" size={18} color={"gray"}>
              {" "}
              <Text>Hữu ích</Text>
            </Ionicons>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{ fontSize: 30 }} onPress={handleComment}>
            <Ionicons name="chatbubble-outline" size={18} color={"gray"}>
              {" "}
              <Text>Bình luận</Text>
            </Ionicons>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{ fontSize: 30 }} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={18} color={"gray"}>
              {" "}
              <Text>Chia sẻ</Text>
            </Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      {/* Conditionally render the comment input */}
      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Nhập bình luận của bạn..."
            onChangeText={(text) => setCommentText(text)}
          />
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => setShowCommentInput(false)}
          >
            <Ionicons
              name="send-sharp"
              size={18}
              color={colors.white}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 35,
    fontWeight: "300",
  },
  horizontal: {
    flexDirection: "row",
  },
  actionEvalu: {
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: 5,
    marginRight: 10,
    padding: 8,
  },
  commentButton: {
    backgroundColor: colors.blueRoot,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
