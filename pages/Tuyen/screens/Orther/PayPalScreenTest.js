import React, {useEffect, useState} from "react";
import {ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {WebView} from "react-native-webview";
import axios from 'axios';
import {encode} from 'base-64';
import {StatusPaymentsId} from "../OrderConfirm/OrderConfirmScreen";

export function PayPalWebViewTest(props) {

    const {showGateway, setShowGateway, order, orderAmount} = props;
    const [progress, setProgress] = useState(false);
    const [progressClr, setProgressClr] = useState('#000');
    const [paypalUrl, setPaypalUrl] = useState('https://my-pay-web.web.app/');
    const [orderAmountUSD, setOrderAmountUSD] = useState(0);
    const exchangeRate = 23000; // Tỷ giá hối đoái: 1 USD = 23,000 VND

    useEffect(() => {
        // Hàm chạy khi component được mount để lấy access token và tạo đơn hàng
        const initPayPalPayment = async () => {
            try {
                const accessToken = await getAccessToken();
                const orderId = await createOrder(accessToken);
                openPayPalWebView(orderId);
            } catch (error) {
                console.error('Error initializing PayPal payment:', error);
            }
        };

        if (showGateway) {
            initPayPalPayment();
        }
    }, [showGateway]);

    const getAccessToken = async () => {
        const clientId = 'AbsLnlL_3-9SdrEyd9Fu9yo7aUqgY5-K1JVUD256SsnB6gNY_wX_jXQRppHaQ_urv9LMLsPFq-uukruk';
        const clientSecret = 'EM9zT8J7j7E77KGx44xv7OtqrcJeuY9lF9cUGvpxMjVy2ad-k2dGdvUYJkmomWLiYdpiPVtyag5Mf4Jm';
        const credentials = `${clientId}:${clientSecret}`;
        const encodedCredentials = encode(credentials);

        try {
            const response = await axios.post(
                'https://api-m.sandbox.paypal.com/v1/oauth2/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        Authorization: `Basic ${encodedCredentials}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            return response.data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error);
            throw error;
        }
    };

    const createOrder = async (accessToken) => {
        try {
            // Chuyển đổi giá trị từ VND sang USD
            const orderAmountUSD = orderAmount / exchangeRate;

            const response = await axios.post(
                'https://api.sandbox.paypal.com/v2/checkout/orders',
                {
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            amount: {
                                currency_code: 'USD',
                                value: orderAmountUSD.toString(),
                            },
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const orderData = response.data;
            const orderId = orderData.id;

            console.log(orderData);

            return orderId;
        } catch (error) {
            console.error('Error creating PayPal order:', error.response?.data || error.message);
            throw error;
        }
    };

    const openPayPalWebView = (orderId) => {
        // Tạo URL với orderId và mở WebView
        const updatedPaypalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
        setPaypalUrl(updatedPaypalUrl);
    };

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
            transparent
        >
            <View style={styles.webViewCon}>
                <View style={styles.wbHead}>
                    <TouchableOpacity
                        style={{padding: 13}}
                        onPress={() => setShowGateway(false)}
                    >
                        <Feather name={'x'} size={24}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#00457C',
                        }}
                    >
                        Thanh Toán PayPal
                    </Text>
                    <View style={{padding: 13, opacity: progress ? 1 : 0}}>
                        <ActivityIndicator size={24} color={progressClr}/>
                    </View>
                </View>
                <WebView
                    source={{uri: paypalUrl}}
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
                        // Gọi hàm để tạo yêu cầu thanh toán khi trang đã tải
                        // Note: Đã thay đổi từ createOrder() thành createOrder(accessToken)
                    }}
                    onMessage={onMessage}
                />
            </View>
        </Modal>
    );
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
    },
});
