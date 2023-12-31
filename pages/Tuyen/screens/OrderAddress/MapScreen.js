import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { setAddress } from '../../../../redux/slices/MapSlide';

const MapScreen = () => {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState({ latitude: 10.7769, longitude: 106.7009 });

  const handleMapPress = async ({ nativeEvent: { coordinate } }) => {
    setSelectedLocation(coordinate);
  
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyCmppXAtr_MzNx_sCbDwK9fARePuf7N6qs`
      );
  
      if (response.data?.results?.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        console.log(formattedAddress);
  
        // Dispatch action to update the address in the store
        dispatch(setAddress({ formattedAddress }));
      } else {
        console.error('Invalid response from Geocoding API:', response.data);
      }
    } catch (error) {
      console.error('Error fetching address:', error.message);
    }
  };
  

  // Use useSelector to access the address from the store
  const address = useSelector((state) => state.map.address);
  console.log("provine"+address.province);
  console.log("ward"+address.ward);
  console.log("street"+address.street);

  console.log("district"+address.district);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{ latitudeDelta: 0.01, longitudeDelta: 0.01, ...selectedLocation }}
        onPress={handleMapPress}
      >
        {selectedLocation && address && (
          <Marker
            coordinate={selectedLocation}
            title={address.formattedAddress}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height:300,

  },
});

export { MapScreen };
