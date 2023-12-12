import {createSlice} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const method_payments = {
    CASH: 'CASH',
    ZaloPay: 'ZaloPay'
}

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




