import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export function formatMoney(value) {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}