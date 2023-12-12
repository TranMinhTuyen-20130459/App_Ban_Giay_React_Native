import {createSlice} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const orderAddress = {
    name_customer: '',
    phone_number: '',
    to_address: {
        address: '',
        ward_name: '',
        district_name: '',
        province_name: '',
        ward_id: '',
        district_id: '',
        province_id: '',
    }
}

export const getInfoAddressFromAsyncStorage = async () => {
    try {
        const storedInfo = await AsyncStorage.getItem('info_address')

        // console.log('Stored Info Address: ' + storedInfo);

        return storedInfo ? JSON.parse(storedInfo) : null;

    } catch (error) {
        console.error("Error reading info_address from AsyncStorage:", error);
        return null;
    }
};


const orderAddressSlice = createSlice({

    name: 'order_address',

    initialState: null,

    reducers: {

        setAddress: (state, action) => {

            const newAddress = action.payload;

            AsyncStorage.setItem('info_address', JSON.stringify(newAddress));

            //=> Trả về trạng thái mới, không cần sao chép toàn bộ state hiện tại

            return newAddress;
        }


    }
})

export const {setAddress} = orderAddressSlice.actions;
export default orderAddressSlice.reducer;