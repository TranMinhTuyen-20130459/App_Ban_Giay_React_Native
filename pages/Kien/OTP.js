import { autoFocus } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView,Alert } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase/compat/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../config';
import { WebView } from 'react-native-webview';
import {useRoute} from "@react-navigation/native";
const OTPScreen = ({navigation}) => {
  const route = useRoute();
  let textInput = useRef(null)
  let clockAll = null
  const [otp, setOtp] = useState('');
  const length = 6;
  const defaultCountdown = 5
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultCountdown)
  const [enableResend, setEnableResend] = useState(false)
  const {phone} = route.params;
  const[verificationId ,setVerificationId] = useState(null)
  const {verification} = route.params;
  console.log(phone)
  console.log(verificationId)
  const[code, setCode] = useState("")
  
  const recaptchaVerifier = useRef(null)
 // Sử dụng Regex để lấy các chữ số từ chuỗi
const digitsOnly = phone.replace(/\D/g, '');

// Loại bỏ số 84 ở đầu nếu có
let formattedPhoneNumber = digitsOnly;
if (digitsOnly.startsWith('84')) {
  formattedPhoneNumber = digitsOnly.substring(2);
}
useEffect(()=>{
    setVerificationId(verification)
},[])
  const onChangeText = (val) => {
    setInternalVal(val)
    console.log(internalVal.length)
    console.log(internalVal)
    if(internalVal.length===5){
        confirmCode();
    }
  }
  useEffect(() => {
    clockAll = setInterval(() => {
      decrementClock()
    }, 1000);
    return () => {
      clearInterval(clockAll);
    };
  }, [countdown]);
  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true)
      setCountdown(0)
      clearInterval(clockAll)
    } else {
      setCountdown(countdown - 1)
    }

  }
  const onResend = () => {
    if (enableResend) {
      setCountdown(defaultCountdown)
      setEnableResend(false)
      clearInterval(clockAll)

    }
  }
  const onChangeNumber = () => {
    setInternalVal("");
  }
  useEffect(() => {
    textInput.focus()
  }, [])
  const sendVerification = ()=>{
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.verifyPhoneNumber(searchQuery,recaptchaVerifier.current)
    .then(verificationId => {
        // Save the verificationId for later use
        verificationId = verificationId;
        navigation.navigate('otp', {
                  phone: searchQuery,
                  verificationId: verificationId, 
        })
      })
      .catch(error => {     
        console.error(error);
      });
          
}
  const confirmCode = ()=>{
    const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        internalVal
    );
    firebase.auth().signInWithCredential(credential)
    .then(()=>{
        setCode("")
        navigation.navigate('HistorySell', {
          phone: formattedPhoneNumber,
          checkVerifier: true, 
      })
    })
    .catch((err)=>{
        alert(err)
        console.log(err)
    })
    Alert.alert(
        'Susses'
    )
}
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'padding'} style={styles.containerAvoidingView}>
        <Text style={styles.textTile}>{"Nhập mã OTP"}</Text>
        <View>
          <TextInput
            autoFocus
            ref={(input) => textInput = input}
            onChangeText={onChangeText}
            style={{ width: 0, height: 0 }}
            value={internalVal}
            maxLength={length}
            returnKeyType="done"
            keyboardType="numeric" />
          <View style={styles.containerInput}>
            {Array(length).fill().map((data, index) => (
              <TouchableOpacity key={index} onPress={() => textInput.focus()}>
                <View style={[styles.cellView, { borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#234DE7' }]}>
                  <Text style={styles.cellText}>
                    {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>Change number</Text>

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResend}>
            <View style={styles.btnResend}>
              <Text style={[styles.textResend, { color: enableResend ? '#234DB7' : 'gray' }]}>Resend OPT ({countdown})</Text>
            </View>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  textTile: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 50,
    alignItems: 'flex-end'
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 15
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textResend: {

    alignItems: 'center',
    fontSize: 15
  }
});

export default OTPScreen;
