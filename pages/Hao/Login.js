import React, {useState} from "react";
import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";


export default function Login  ({ navigation })  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  // kiểm tra là email
  const validateEmail = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(inputEmail);
    setIsEmailValid(isValid);
    return isValid;
  };

  //kiểm tra mật khẩu
  const validatePassword = (inputPassword) => {
    const isEmpty = inputPassword.trim() === "";
    setIsPasswordEmpty(isEmpty);
    return !isEmpty;
  };

  const handleLogin = async () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      // Thông báo nếu email hoặc mật khẩu không hợp lệ
      return;
    }
    try {
      const response = await fetch(
        "http://tranhao123-001-site1.etempurl.com/user/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);

      navigation.goBack();
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };


  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/logoShop.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập địa chỉ email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onBlur={() => validateEmail(email)}
            />
            {!isEmailValid && (
              <Text style={styles.errorText}>Địa chỉ email không hợp lệ</Text>
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng Nhập</Text>
          </TouchableOpacity>
          <Text style={styles.registerLabel} onPress={handleRegister}>
            Đăng ký tài khoản
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F0F0F0",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0.15 * windowHeight,
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
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  registerLabel: {
    color: "#007BFF",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  googleButton: {
    marginTop: 10,
    marginBottom: 10,
  },
});
