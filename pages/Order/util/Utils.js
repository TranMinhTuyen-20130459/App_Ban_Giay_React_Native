// Lấy ra label tương ứng với value trong DropDownPicker (tương tự ComboBox trong Java Swing)
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