import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import firebase from 'firebase/compat/app';

const OTPScreen = ({ navigation }) => {
  const route = useRoute();
  let textInput = useRef(null);
  let clockAll = null;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [enableResend, setEnableResend] = useState(false);
  const { phone } = route.params;
  const [verificationId, setVerificationId] = useState(null);

  const recaptchaVerifier = useRef(null);
  const digitsOnly = phone.replace(/\D/g, '');

  let formattedPhoneNumber = digitsOnly;
  if (digitsOnly.startsWith('840')) {
    formattedPhoneNumber = digitsOnly.substring(2);
  } else {
    formattedPhoneNumber = '0' + digitsOnly.substring(2);
  }

  useEffect(() => {
    setVerificationId(route.params?.verification);
  }, [route.params?.verification]);

  useEffect(() => {
    clockAll = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockAll);
    };
  }, [countdown]);

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      clearInterval(clockAll);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onResend = () => {
    if (enableResend) {
      setCountdown(60);
      setEnableResend(false);
      clearInterval(clockAll);
      clockAll = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };

  const onChangeNumber = () => {
    setInternalVal('');
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        internalVal
    );
    firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          navigation.navigate('HistorySell', {
            phone: formattedPhoneNumber,
            checkVerifier: true,
          });
        })
        .catch((err) => {
          Alert.alert('Error', err.message);
          console.error(err);
        });
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.textTile}>{"Nhập mã OTP"}</Text>
          <View>
            <TextInput
                autoFocus
                ref={(input) => (textInput = input)}
                onChangeText={setInternalVal}
                style={{ width: 0, height: 0 }}
                value={internalVal}
                maxLength={6}
                returnKeyType="done"
                keyboardType="numeric"
            />
            <View style={styles.containerInput}>
              {Array(6)
                  .fill()
                  .map((_, index) => (
                      <TouchableOpacity key={index} onPress={() => textInput.focus()}>
                        <View
                            style={[
                              styles.cellView,
                              {
                                borderBottomColor:
                                    index === internalVal.length ? '#FB6C6A' : '#234DE7',
                              },
                            ]}
                        >
                          <Text style={styles.cellText}>
                            {internalVal && internalVal.length > 0
                                ? internalVal[index]
                                : ''}
                          </Text>
                        </View>
                      </TouchableOpacity>
                  ))}
            </View>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={onChangeNumber}>
              <View style={styles.btnChangeNumber}>
                <Text style={styles.textChange}>Reset</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onResend}>
              <View style={styles.btnResend}>
                <Text
                    style={[
                      styles.textResend,
                      { color: enableResend ? '#234DB7' : 'gray' },
                    ]}
                >
                  Resend OTP ({countdown})
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={confirmCode}>
            <View style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTile: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChange: {
    color: '#234DB7',
    alignItems: 'center',
    fontSize: 15,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontSize: 15,
  },
  confirmButton: {
    backgroundColor: '#234DB7',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default OTPScreen;
