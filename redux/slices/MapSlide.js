// mapSlice.js

import { createSlice } from '@reduxjs/toolkit';

const parseAddressComponents = (formattedAddress) => {
  const result = { province: '', district: '', ward: '', street: '', country: '' };

  // Split the formatted address into components
  const components = formattedAddress.split(',').map((item) => item.trim());

  // The last component is the country
  result.country = components.pop();

  // Extract components based on their positions in the array
  if (components.length >= 1) {
    // The last component is the ward
    result.province = components.pop();

    if (components.length >= 1) {
      // The second-to-last component is the district
      result.district = components.pop();

      if (components.length >= 1) {
        // The third-to-last component is the province
        result.ward = components.pop();

        if (components.length >= 1) {
          // The fourth-to-last component and earlier components are part of the street
          result.street = components.join(', ');
        }
      }
    }
  }

  return result;
};



const mapSlice = createSlice({
  name: 'map',
  initialState: {
    address: {
      formattedAddress: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      country: '',
    },
  },
  reducers: {
    setAddress: (state, action) => {
      state.address.formattedAddress = action.payload.formattedAddress;
      // Parse the formatted address and update individual components
      const { province, district, ward, street, country } = parseAddressComponents(action.payload.formattedAddress);
      state.address.province = province;
      state.address.district = district;
      state.address.ward = ward;
      state.address.street = street;
      state.address.country = country;
    },
  },
});

export const { setAddress } = mapSlice.actions;
export default mapSlice.reducer;
