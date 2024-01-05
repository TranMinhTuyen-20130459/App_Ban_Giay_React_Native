import React, { useState } from "react";
import {
    Text,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

const windowHeight = Dimensions.get("window").height;

export default Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);

  // kiểm tra username
  const validateUsername = (inputUsername) => {
    const isEmpty = inputUsername.trim() === "";
    setIsUsernameEmpty(isEmpty);
    return !isEmpty;
  };

    // kiểm tra phone
  const validatePhoneNumber = (inputPhoneNumber) => {
    const isEmpty = inputPhoneNumber.trim() === "";
    setIsPhoneNumberEmpty(isEmpty);
    return !isEmpty;
  };

    // kiểm tra pass
  const validatePassword = (inputPassword) => {
    const isEmpty = inputPassword.trim() === "";
    setIsPasswordEmpty(isEmpty);
    return !isEmpty;
  };

    // kiểm tra confirm pass
  const validateConfirmPassword = (inputConfirmPassword) => {
    const isEmpty = inputConfirmPassword.trim() === "";
    setIsConfirmPasswordEmpty(isEmpty);
    return !isEmpty;
  };

  const handleRegister = async () => {
    if (
      !validateUsername(username) ||
      !validatePhoneNumber(phoneNumber) ||
      !validatePassword(password) ||
      !validateConfirmPassword(confirmPassword)
    ) {
      return;
    }
  
    if (password !== confirmPassword) {
      return;
    }
  
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          phoneNumber,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Đăng ký thất bại');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Lỗi đăng ký:', error.message);
    }
  };
  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/logoShop.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tên đăng nhập</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChangeText={(text) => setUsername(text)}
              onBlur={() => validateUsername(username)}
            />
            {isUsernameEmpty && (
              <Text style={styles.errorText}>Vui lòng nhập tên đăng nhập</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              onBlur={() => validatePhoneNumber(phoneNumber)}
            />
            {isPhoneNumberEmpty && (
              <Text style={styles.errorText}>Vui lòng nhập số điện thoại</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              onBlur={() => validatePassword(password)}
            />
            {isPasswordEmpty && (
              <Text style={styles.errorText}>Vui lòng nhập mật khẩu</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nhập lại mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              onBlur={() => validateConfirmPassword(confirmPassword)}
            />
            {isConfirmPasswordEmpty && (
              <Text style={styles.errorText}>Vui lòng nhập lại mật khẩu</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0.05 * windowHeight,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});