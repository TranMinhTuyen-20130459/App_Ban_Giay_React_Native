/**
 * Lấy ra label tương ứng với value trong DropDownPicker (tương tự ComboBox trong Java Swing)
 *
 */
export const getLabelFromValue = (arr_data, value) => {

    /*
     * hàm 'find' trả về ngay phần tử đầu tiên mà nó tìm thấy
     * nếu không tìm thấy phần tử nào thì trả về 'undefined'
    */

    // console.log('Array Data: ', arr_data)
    // console.log('Value: ', value)

    const selectedItem = arr_data.find(item => item.value === value);
    return selectedItem ? selectedItem.label : ''
}

/**
 * Hàm này nhận một địa chỉ dưới dạng chuỗi và phân tích nó thành các thành phần cần thiết.
 */
export function parseAddress(address_string) {

    const parts = address_string.split(',');

    return {
        address: parts[0] ? parts[0].trim() : '',
        ward_name: parts[1] ? parts[1].trim() : '',
        district_name: parts[2] ? parts[2].trim() : '',
        province_name: parts[3] ? parts[3].trim() : '',
        ward_id: 'GG_MAP',
        district_id: 'GG_MAP',
        province_id: 'GG_MAP',
    };
}