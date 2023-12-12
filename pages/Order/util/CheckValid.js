export const isValidPhoneNumber = (phoneNumber) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10}$/;

    // Loại bỏ khoảng trắng và dấu gạch ngang nếu có
    const cleanedPhoneNumber = phoneNumber.replace(/\s|-/g, '');

    // Kiểm tra xem số điện thoại có đúng định dạng không
    return phoneRegex.test(cleanedPhoneNumber);
}

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Trả về giá trị Lỗi khi user nhập vào Họ Tên không hợp lệ
export const returnValueErrorOfNameCustomer = (name_customer) => {

    if (name_customer == null || name_customer.length === 0) return 'Nhập Tên người nhận'
    if (name_customer.length > 50) return 'Họ Tên không được quá 50 kí tự'
    return null;
}

// Trả về giá trị Lỗi khi user nhập vào Số Điện Thoại không hợp lệ
export const returnValueErrorOfPhoneNumber = (phone_number) => {
    if (phone_number == null || phone_number.length === 0) return 'Nhập Số điện thoại'
    if (!isValidPhoneNumber(phone_number)) return 'Số điện thoại không hợp lệ'
    return null; // => dữ liệu nhập vào hợp lệ
}

// Trả về giá trị Lỗi khi user nhập vào Địa Chỉ không hợp lệ
export const returnValueErrorAddressDetail = (address_detail) => {
    if (address_detail == null || address_detail.length === 0) return 'Nhập Địa chỉ nhận hàng'
    if (address_detail.length > 1000) return 'Địa chỉ nhận hàng không được quá 1000 kí tự'
    return null;
}

// Trả về giá trị Lỗi khi user chọn Tỉnh/Thành không hợp lệ
export const returnValueErrorProvince = (province_id) => {
    if (province_id === null || province_id.length === 0) return 'Chọn Tỉnh/Thành phố'
    return null;
}

// Trả về giá trị Lỗi khi user chọn Quận/Huyện không hợp lệ
export const returnValueErrorDistrict = (district_id) => {
    if (district_id === null || district_id.length === 0) return 'Chọn Quận/Huyện'
    return null;
}

// Trả về giá trị Lỗi khi user chọn Phường/Xã không hợp lệ
export const returnValueErrorWard = (ward_id) => {
    if (ward_id === null || ward_id.length === 0) return 'Chọn Phường/Xã'
    return null;
}

// Kiểm tra sự hợp lệ của thông tin trong đơn hàng
export const isValidOrder = (orderData) => {
    const isString = (value) => typeof value === 'string';
    const isNumber = (value) => typeof value === 'number';
    const isObject = (value) => typeof value === 'object';

    const isValidListOrderDetail = (listOrderDetail) => Array.isArray(listOrderDetail) && listOrderDetail.length > 0;

    const {
        name_customer,
        phone,
        email_customer,
        to_address,
        ship_price,
        order_value,
        list_order_detail,
    } = orderData;

    if (
        !isString(name_customer) ||
        !isString(phone) ||
        !isString(email_customer) ||
        !isObject(to_address) ||
        !isNumber(ship_price) ||
        !isNumber(order_value) ||
        !isValidEmail(email_customer) ||
        !isValidListOrderDetail(list_order_detail)
    ) {
        // console.error("Dữ liệu đơn hàng không hợp lệ. Vui lòng kiểm tra lại.");
        return false;
    }

    // Dữ liệu hợp lệ
    // console.log("Đơn hàng hợp lệ:", orderData);
    return true;
};


