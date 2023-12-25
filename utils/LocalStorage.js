import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu thông tin giỏ hàng vào AsyncStorage
export const saveCartToAsyncStorage = async (cartData) => {
    try {
        const jsonCartData = JSON.stringify(cartData);
        await AsyncStorage.setItem("cart", jsonCartData);
        console.log("Giỏ hàng đã được lưu thành công");
    } catch (error) {
        console.error("Lỗi khi lưu giỏ hàng:", error);
    }
};

// Đọc thông tin giỏ hàng từ AsyncStorage
export const getCartFromAsyncStorage = async () => {
    try {
        const jsonCartData = await AsyncStorage.getItem("cart");
        return jsonCartData != null ? JSON.parse(jsonCartData) : null;
    } catch (error) {
        console.error("Lỗi khi đọc giỏ hàng:", error);
        return null;
    }
};

// Thêm một sản phẩm vào giỏ hàng và lưu vào AsyncStorage
export const addToCart = async (product) => {
    try {
        // Đọc thông tin giỏ hàng từ AsyncStorage
        const existingCart = await getCartFromAsyncStorage();

        // Nếu giỏ hàng đã tồn tại, thêm sản phẩm vào
        if (existingCart) {
            const updatedCart = [...existingCart, product];
            await saveCartToAsyncStorage(updatedCart);
            console.log("Sản phẩm đã được thêm vào giỏ hàng");
        } else {
            // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới và thêm sản phẩm vào
            const newCart = [product];
            await saveCartToAsyncStorage(newCart);
            console.log("Sản phẩm đã được thêm vào giỏ hàng");
        }
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
};
export const saveHistoryViewToAsyncStorage = async (data) => {
    try {
        const jsonHistoryData = JSON.stringify(data);
        await AsyncStorage.setItem("historyViewProduct", jsonHistoryData);
    
    } catch (error) {
        console.error("Lỗi khi lưu giỏ hàng:", error);
    }
};
export const getHistoryFromAsyncStorage = async () => {
    try {
        const jsonHistoryData = await AsyncStorage.getItem("historyViewProduct");
        return jsonHistoryData != null ? JSON.parse(jsonHistoryData) : null;
    } catch (error) {
        console.error("Lỗi khi đọc giỏ hàng:", error);
        return null;
    }
};