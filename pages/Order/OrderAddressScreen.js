import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "./OrderAddress.styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAddress } from "../../redux/slices/OrderAddressSlice";
import { colors } from "../../theme";
import { getLabelFromValue } from "./util/Utils";
import { useNavigation } from "@react-navigation/native";
import {
  returnValueErrorOfNameCustomer,
  returnValueErrorOfPhoneNumber,
  returnValueErrorAddressDetail,
  returnValueErrorProvince,
  returnValueErrorDistrict,
  returnValueErrorWard,
} from "./util/CheckValid";
import { fetchDataMethodGET } from "./util/CallApi";

export default function OrderAddressScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name_customer, setNameCustomer] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address_detail, setAddressDetail] = useState("");

  const [province_name, setProvinceName] = useState("");
  const [district_name, setDistrictName] = useState("");
  const [ward_name, setWardName] = useState("");

  const [province_id, setProvinceId] = useState("");
  const [district_id, setDistrictId] = useState("");
  const [ward_id, setWardId] = useState("");

  const [isOpenDropDownProvince, setIsOpenDropDownProvince] = useState(false);
  const [isOpenDropDownDistrict, setIsOpenDropDownDistrict] = useState(false);
  const [isOpenDropDownWard, setIsOpenDropDownWard] = useState(false);

  const [errorNameCustomer, setErrorNameCustomer] = useState(null);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(null);
  const [errorAddressDetail, setErrorAddressDetail] = useState(null);
  const [errorProvince, setErrorProvince] = useState(null);
  const [errorDistrict, setErrorDistrict] = useState(null);
  const [errorWard, setErrorWard] = useState(null);

  const handleClickBtConfirm = () => {
    // Nếu Họ Tên hợp lệ thì errorNameCustomer được cập nhật giá trị null
    const valueErrorOfNameCustomer =
      returnValueErrorOfNameCustomer(name_customer);
    setErrorNameCustomer(valueErrorOfNameCustomer);

    // Nếu Số Điện Thoại hợp lệ thì errorPhoneNumber được cập nhật giá trị null
    const valueErrorOfPhoneNumber = returnValueErrorOfPhoneNumber(phone_number);
    setErrorPhoneNumber(valueErrorOfPhoneNumber);

    // Nếu Địa chỉ nhận hàng hợp lệ thì errorAddressDetail được cập nhật giá trị null
    const valueErrorAddressDetail =
      returnValueErrorAddressDetail(address_detail);
    setErrorAddressDetail(valueErrorAddressDetail);

    // Nếu Tỉnh/Thành hợp lệ thì errorProvince được cập nhật giá trị null
    const valueErrorProvince = returnValueErrorProvince(province_id);
    setErrorProvince(valueErrorProvince);

    // Nếu Quận/Huyện hợp lệ thì errorDistrict được cập nhật giá trị null
    const valueErrorDistrict = returnValueErrorDistrict(district_id);
    setErrorDistrict(valueErrorDistrict);

    // Nếu Phường/Xã hợp lệ thì Ward được cập nhật giá trị null
    const valueErrorWard = returnValueErrorWard(ward_id);
    setErrorWard(valueErrorWard);

    // TH: Form không hợp lệ
    if (
      valueErrorOfNameCustomer != null ||
      valueErrorOfPhoneNumber != null ||
      valueErrorAddressDetail != null ||
      valueErrorProvince != null ||
      valueErrorDistrict != null ||
      valueErrorWard != null
    )
      return;

    // Cập nhật địa chỉ giao hàng mới
    dispatch(setAddress(orderAddress));

    navigation.goBack();
  };

  const orderAddress = {
    name_customer: name_customer,
    phone_number: phone_number,
    to_address: {
      address: address_detail + "",
      ward_name: ward_name + "",
      district_name: district_name + "",
      province_name: province_name + "",
      ward_id: ward_id + "",
      district_id: district_id + "",
      province_id: province_id + "",
    },
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {/*<View style={styles.label_name_customer}>*/}
          {/*    <Text>{name_customer}</Text>*/}
          {/*    <Text>{phone_number}</Text>*/}
          {/*    <Text>{address_detail}</Text>*/}
          {/*</View>*/}

          {/*<View style={styles.label_name_customer}>*/}
          {/*    <Text>{province_name}</Text>*/}
          {/*    <Text>{district_name}</Text>*/}
          {/*    <Text>{ward_name}</Text>*/}
          {/*</View>*/}

          <MainComponent
            setNameCustomer={setNameCustomer}
            setPhoneNumber={setPhoneNumber}
            setAddressDetail={setAddressDetail}
            setProvinceName={setProvinceName}
            setProvinceId={setProvinceId}
            province_id={province_id}
            setDistrictName={setDistrictName}
            setDistrictId={setDistrictId}
            district_id={district_id}
            setWardName={setWardName}
            setWardId={setWardId}
            ward_id={ward_id}
            isOpenDropDownProvince={isOpenDropDownProvince}
            isOpenDropDownDistrict={isOpenDropDownDistrict}
            isOpenDropDownWard={isOpenDropDownWard}
            setIsOpenDropDownProvince={setIsOpenDropDownProvince}
            setIsOpenDropDownDistrict={setIsOpenDropDownDistrict}
            setIsOpenDropDownWard={setIsOpenDropDownWard}
            errorNameCustomer={errorNameCustomer}
            errorPhoneNumber={errorPhoneNumber}
            errorAddressDetail={errorAddressDetail}
            errorProvince={errorProvince}
            errorDistrict={errorDistrict}
            errorWard={errorWard}
            setErrorNameCustomer={setErrorNameCustomer}
            setErrorPhoneNumber={setErrorPhoneNumber}
            setErrorAddressDetail={setErrorAddressDetail}
            setErrorProvince={setErrorProvince}
            setErrorDistrict={setErrorDistrict}
            setErrorWard={setErrorWard}
          />
        </View>
        <Footer handleClickBtConfirm={handleClickBtConfirm} />
      </View>
    </KeyboardAvoidingView>
  );
}

function MainComponent({
  setNameCustomer,
  setPhoneNumber,
  setAddressDetail,

  setProvinceName,
  setProvinceId,
  province_id,

  setDistrictName,
  setDistrictId,
  district_id,

  setWardName,
  setWardId,
  ward_id,

  isOpenDropDownProvince,
  isOpenDropDownDistrict,
  isOpenDropDownWard,

  setIsOpenDropDownProvince,
  setIsOpenDropDownDistrict,
  setIsOpenDropDownWard,

  errorNameCustomer,
  errorPhoneNumber,
  errorAddressDetail,
  errorProvince,
  errorDistrict,
  errorWard,

  setErrorNameCustomer,
  setErrorPhoneNumber,
  setErrorAddressDetail,
  setErrorProvince,
  setErrorDistrict,
  setErrorWard,
}) {
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);

  // Gọi API lấy danh sách Tỉnh/Thành Phố
  useEffect(() => {
    const apiUrl = "https://provinces.open-api.vn/api/p";
    const fetchData = async () => {
      try {
        const provinceData = await fetchDataMethodGET(apiUrl);

        // Sử dụng Optional chaining và Nullish coalescing để kiểm tra và xử lý dữ liệu provinceData
        const formattedData =
          provinceData?.map((item) => ({
            label: item.name,
            value: item.code.toString(),
          })) ?? [];

        setProvinceData(formattedData);
        setDistrictData([]);
        setWardData([]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProvinceData([]);
      }
    };

    fetchData();
  }, []);

  // Gọi API lấy danh sách Quận/Huyện thuộc Tỉnh/Thành Phố
  useEffect(() => {
    const apiUrl = `https://provinces.open-api.vn/api/p/${province_id}?depth=2`;

    const fetchData = async () => {
      try {
        const data = await fetchDataMethodGET(apiUrl);

        // Sử dụng Optional chaining và Nullish coalescing để kiểm tra và xử lý dữ liệu districts
        const formattedData =
          data?.districts?.map((item) => ({
            label: item.name,
            value: item.code.toString(),
          })) ?? [];

        setDistrictData(formattedData);
        setWardData([]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDistrictData([]);
      }
    };

    fetchData();
  }, [province_id]);

  // Gọi API lấy danh sách Phường/Xã thuộc Quận/Huyện
  useEffect(() => {
    const apiUrl = `https://provinces.open-api.vn/api/d/${district_id}?depth=2`;
    const fetchData = async () => {
      try {
        const data = await fetchDataMethodGET(apiUrl);

        // Sử dụng Optional chaining và Nullish coalescing để kiểm tra và xử lý dữ liệu data
        const formattedData =
          data?.wards?.map((item) => ({
            label: item.name,
            value: item.code,
          })) ?? [];

        setWardData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setWardData([]);
      }
    };

    fetchData();
  }, [district_id]);

  return (
    <View style={styles.mainContent}>
      {/*<View style={{marginBottom: 10}}>*/}
      {/*    <Text style={{fontSize: 16}}>Nhập địa chỉ mới</Text>*/}
      {/*</View>*/}

      {/* Component này chứa các ô text_input để người dùng nhập Họ,tên và Số điện thoại */}
      <TextInputComponent
        setNameCustomer={setNameCustomer}
        setPhoneNumber={setPhoneNumber}
        errorNameCustomer={errorNameCustomer}
        errorPhoneNumber={errorPhoneNumber}
        setErrorNameCustomer={setErrorNameCustomer}
        setErrorPhoneNumber={setErrorPhoneNumber}
      />

      <View style={styles.view_contain_text}>
        <Text style={styles.fontSizeText}>Tỉnh/ Thành phố</Text>
      </View>
      <View>
        <DropDownPicker
          placeholder="Chọn Tỉnh/Thành Phố"
          open={isOpenDropDownProvince}
          setOpen={(value) => {
            console.log("DropDownCity: " + value);
            setIsOpenDropDownProvince(value);
          }}
          items={provinceData}
          value={province_id}
          setValue={(value) => {
            setProvinceId(value);
          }}
          onChangeValue={() => {
            const provinceName = getLabelFromValue(provinceData, province_id);
            setProvinceName(provinceName);
            // console.log(provinceName);

            setErrorProvince(null);
          }}
          style={styles.drop_down}
        />
        {errorProvince && <Text style={{ color: "red" }}>{errorProvince}</Text>}
      </View>
      <View style={styles.view_contain_text}>
        <Text style={styles.fontSizeText}>Quận/ Huyện</Text>
      </View>
      <View>
        {isOpenDropDownProvince === false && (
          <DropDownPicker
            placeholder="Chọn Quận/Huyện"
            open={isOpenDropDownDistrict}
            setOpen={(value) => {
              console.log("DropDownDistrict: " + value);
              setIsOpenDropDownDistrict(value);
            }}
            items={districtData}
            value={district_id}
            setValue={(value) => setDistrictId(value)}
            onChangeValue={() => {
              const districtName = getLabelFromValue(districtData, district_id);
              setDistrictName(districtName);
              // console.log(districtName)

              setErrorDistrict(null);
            }}
            style={styles.drop_down}
          />
        )}
        {errorDistrict && <Text style={{ color: "red" }}>{errorDistrict}</Text>}
      </View>
      <View style={styles.view_contain_text}>
        <Text style={styles.fontSizeText}>Phường/ Xã</Text>
      </View>
      <View>
        {isOpenDropDownProvince === false &&
          isOpenDropDownDistrict === false && (
            <DropDownPicker
              placeholder="Chọn Phường/Xã"
              open={isOpenDropDownWard}
              setOpen={setIsOpenDropDownWard}
              items={wardData}
              value={ward_id}
              setValue={(value) => setWardId(value)}
              onChangeValue={() => {
                const wardName = getLabelFromValue(wardData, ward_id);
                setWardName(wardName);
                // console.log(wardName)

                setErrorWard(null);
              }}
              style={styles.drop_down}
            />
          )}
        {errorWard && <Text style={{ color: "red" }}>{errorWard}</Text>}
      </View>
      <View style={styles.view_contain_text}>
        <Text style={styles.fontSizeText}>Địa chỉ nhận hàng</Text>
      </View>
      <View style={styles.view_contain_text_input}>
        <TextInput
          placeholder="Tòa nhà, số nhà, tên đường"
          onChangeText={(text) => {
            setAddressDetail(text);
            setErrorAddressDetail(null);
          }}
        />
      </View>
      {errorAddressDetail && (
        <Text style={{ color: "red" }}>{errorAddressDetail}</Text>
      )}
    </View>
  );
}

function TextInputComponent({
  setNameCustomer,
  setPhoneNumber,

  errorNameCustomer,
  errorPhoneNumber,

  setErrorNameCustomer,
  setErrorPhoneNumber,
}) {
  return (
    <View>
      <View style={[styles.label_name_customer, styles.view_contain_text]}>
        <Text style={styles.fontSizeText}>Tên người nhận</Text>
        <Text style={[styles.fontSizeText, { color: "gray" }]}>0/50</Text>
      </View>
      <View style={styles.view_contain_text_input}>
        <TextInput
          placeholder="Nhập Họ Tên"
          onChangeText={(text) => {
            setNameCustomer(text);
            setErrorNameCustomer(null);
          }}
        />
      </View>
      {errorNameCustomer && (
        <Text style={{ color: "red" }}>{errorNameCustomer}</Text>
      )}
      <View style={styles.view_contain_text}>
        <Text style={styles.fontSizeText}>Số điện thoại</Text>
      </View>
      <View style={styles.view_contain_text_input}>
        <TextInput
          keyboardType="numeric"
          placeholder="Nhập Số điện thoại"
          onChangeText={(text) => {
            setPhoneNumber(text);
            setErrorPhoneNumber(null);
          }}
        />
      </View>
      {errorPhoneNumber && (
        <Text style={{ color: "red" }}>{errorPhoneNumber}</Text>
      )}
    </View>
  );
}

function Footer({ handleClickBtConfirm }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.btConfirm} onPress={handleClickBtConfirm}>
        <Text style={[{ fontSize: 16 }, styles.text_in_button]}>Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
}
