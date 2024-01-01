import {ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {WebView} from "react-native-webview";
import React, {useState} from "react";
import {StatusPaymentsId} from "./OrderConfirmScreen";

export function PayPalWebView(props) {

    const {showGateway, setShowGateway, order} = props;

    const [progress, setProgress] = useState(false);
    const [progressClr, setProgressClr] = useState('#000');

    // Nhận phản hồi từ PayPal
    const onMessage = async (e) => {
        // Lấy dữ liệu từ thông điệp nhận được
        let data = e.nativeEvent.data;

        // Ẩn modal sau khi nhận được thông điệp
        setShowGateway(false);
        console.log(data);

        // Chuyển đổi dữ liệu JSON từ thông điệp
        let payment = JSON.parse(data);

        // Kiểm tra trạng thái thanh toán từ dữ liệu
        if (payment.status === 'COMPLETED') {
            // Gọi hàm đặt hàng khi thanh toán thành công
            await order(StatusPaymentsId.DA_THANH_TOAN);
        } else {
            Alert.alert('', 'Thanh toán bằng PayPal thất bại. Bạn hãy thử lại !!!');
        }
    };


    return (
        <Modal
            visible={showGateway}
            onDismiss={() => setShowGateway(false)}
            onRequestClose={() => setShowGateway(false)}
            animationType={"fade"}
            transparent>
            <View style={styles.webViewCon}>
                <View style={styles.wbHead}>
                    <TouchableOpacity
                        style={{padding: 13}}
                        onPress={() => setShowGateway(false)}>
                        <Feather name={'x'} size={24}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#00457C',
                        }}>
                        Thanh Toán PayPal
                    </Text>
                    <View style={{padding: 13, opacity: progress ? 1 : 0}}>
                        <ActivityIndicator size={24} color={progressClr}/>
                    </View>
                </View>
                <WebView
                    source={{uri: 'https://my-pay-web.web.app/'}}
                    onLoadStart={() => {
                        setProgress(true);
                        setProgressClr('#000');
                    }}
                    onLoadProgress={() => {
                        setProgress(true);
                        setProgressClr('#00457C');
                    }}
                    onLoadEnd={() => {
                        setProgress(false);
                    }}
                    onLoad={() => {
                        setProgress(false);
                    }}
                    onMessage={onMessage}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
        webViewCon: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        wbHead: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            zIndex: 25,
            elevation: 2,
        }
    }
)

