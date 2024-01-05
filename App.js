import * as React from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "./pages/Tuyen/screens/Orther/SettingScreen";
import CartScreen from "./pages/Tuyen/screens/Cart/CartScreen";
import { colors } from "./theme";

import {
  getCartFromAsyncStorage,
  getFavoriesFromAsyncStorage,
  getHistoryFromAsyncStorage,
  saveCartToAsyncStorage,
  saveFavoriesToAsyncStorage,
  saveHistoryViewToAsyncStorage,
} from "./utils/LocalStorage";

import { addCart } from "./redux/slices/CartsSlice";
import OrderConfirmScreen from "./pages/Tuyen/screens/OrderConfirm/OrderConfirmScreen";
import MainContainer from "./pages/MainContainer";
import OrderAddressScreen from "./pages/Tham/OrderAddress/OrderAddressScreen";
import { ProducDetail } from "./pages/An/ProductDetail";
import { SelectSize } from "./pages/An/SelectSize";
import ProductReview from "./pages/An/ProductReview";
import {
  getMethodPaymentFromAsyncStorage,
  setSelectedPayment,
} from "./redux/slices/PaymentSlice";
import {
  getInfoAddressFromAsyncStorage,
  setAddress,
} from "./redux/slices/OrderAddressSlice";
import OrderDetailsScreen from "./pages/Kien/DetailOrder";
import Search from "./components/Search";
import ResultSearch from "./components/ResultSearch";
import HistorySell from "./pages/Kien/history";
import HistoryViewProduct from "./pages/Kien/HistoryViewProduct";
import { AppState } from "react-native";
import { addHistory } from "./redux/slices/HistoryView";

import OTPScreen from "./pages/Kien/OTP";
import { addFavories } from "./redux/slices/Favories";
import FavoriesViewProduct from "./pages/An/Favories";

import GoogleMapsScreen from "./pages/Tham/OrderAddress/GoogleMapsScreen";
import Login from "./pages/Hao/login";
import Register from "./pages/Hao/register";

function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi hàm để lấy dữ liệu giỏ hàng từ AsyncStorage
        const carts = await getCartFromAsyncStorage();
        // Gọi hàm để lấy dữ liệu sản phẩm đã xem từ AsyncStorage
        const history = await getHistoryFromAsyncStorage();
        // Gọi hàm để lấy dữ liệu sản phẩm yêu thích từ AsyncStorage
        const favories = await getFavoriesFromAsyncStorage();

        // Nếu có dữ liệu, dispatch action để cập nhật giỏ hàng trong Redux
        if (carts) {
          carts.forEach((item) => {
            store.dispatch(addCart(item));
          });
        }
        if (history) {
          history.forEach((item) => {
            store.dispatch(addHistory(item));
          });
        }
        if (favories) {
          favories.forEach((item) => {
            store.dispatch(addFavories(item));
          });
        }

        // Gọi hàm để lấy dữ liệu địa chỉ từ AsyncStorage
        const storedInfoAddress = await getInfoAddressFromAsyncStorage();

        // Nếu có dữ liệu địa chỉ, dispatch action để cập nhật Redux store
        if (storedInfoAddress) store.dispatch(setAddress(storedInfoAddress));

        // Gọi hàm để lấy dữ liệu phương thức thanh toán từ AsyncStorage
        const storedInfoPayment = await getMethodPaymentFromAsyncStorage();
        if (storedInfoPayment)
          store.dispatch(setSelectedPayment(storedInfoPayment));

        // Lắng nghe sự kiện AppState để xử lý khi ứng dụng chuyển sang trạng thái background hoặc inactive
        const handleAppStateChange = (nextAppState) => {
          if (nextAppState.match(/inactive|background/)) {
            // Ứng dụng chuyển sang trạng thái background hoặc inactive

            // Lấy dữ liệu giỏ hàng từ Redux store
            const cartRedux = store.getState().carts;

            // Lưu giỏ hàng xuống AsyncStorage
            saveCartToAsyncStorage(cartRedux);
            const historyRedux = store.getState().historys;
            // Lưu lịch sử đã xem xuống AsyncStorage
            saveHistoryViewToAsyncStorage(historyRedux);
            // Lưu sản phẩm ưa thích xuống AsyncStorage
            const favorriesRedux = store.getState().favories;
            saveFavoriesToAsyncStorage(favorriesRedux);
          }
        };

        // Đăng ký lắng nghe sự kiện
        AppState.addEventListener("change", handleAppStateChange);

        // Hủy đăng ký lắng nghe khi component unmount
        return () => {
          AppState.removeEventListener("change", handleAppStateChange);
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainContainer}
            options={{ headerShown: false }}
          />

          {/* cấu hình các đường dẫn qua các trang khác */}
          <Stack.Screen name="Setting" component={SettingScreen} />

          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              title: "Giỏ hàng",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="ProductDetail"
            component={ProducDetail}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
            }}
          />

          <Stack.Screen
            name="SelectSize"
            component={SelectSize}
            options={{
              title: "Lựa chọn thuộc tính",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="ProductReview"
            component={ProductReview}
            options={{
              title: "Đánh giá sản phẩm",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="OrderConfirm"
            component={OrderConfirmScreen}
            options={{
              title: "Xác Nhận Đơn Hàng",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen name="OrderAddress" component={OrderAddressScreen} />

          <Stack.Screen
            name="GoogleMap"
            component={GoogleMapsScreen}
            options={{
              title: "Google Map",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SearchResult"
            component={ResultSearch}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="HistoryViewProduct"
            component={HistoryViewProduct}
            options={{
              title: "Sản phẩm đã xem",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="HistorySell"
            component={HistorySell}
            options={{
              title: "Lịch sử mua hàng ",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="OrderDetail"
            component={OrderDetailsScreen}
            options={{
              title: "Chi tiết đơn hàng",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="otp"
            component={OTPScreen}
            options={{
              title: "OTP",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />

          <Stack.Screen
            name="favories"
            component={FavoriesViewProduct}
            options={{
              title: "Sản phẩm yêu thích",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Đăng nhập",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Đăng ký",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: colors.blueRoot,
              },
              headerTintColor: "white",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
