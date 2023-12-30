import {createSlice} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sử dụng Object.freeze để đóng băng đối tượng, ngăn chặn bất kỳ thay đổi nào trên đối tượng.
export const method_payments = Object.freeze({
    CASH: 'CASH',
    ZaloPay: 'ZaloPay',
    PayPal: 'PayPal'
});

export const getMethodPaymentFromAsyncStorage = async () => {

    try {
        const storedInfo = await AsyncStorage.getItem('method_payment')
        return storedInfo ? JSON.parse(storedInfo) : method_payments.CASH
    } catch (e) {
        return method_payments.CASH
    }

}

const paymentSlice = createSlice({

    name: 'method_payment',

    initialState: method_payments.CASH,

    reducers: {

        setSelectedPayment(state, action) {

            AsyncStorage.setItem('method_payment', JSON.stringify(action.payload))
            return action.payload;
        }

    }
})

export const {setSelectedPayment} = paymentSlice.actions

export default paymentSlice.reducer




