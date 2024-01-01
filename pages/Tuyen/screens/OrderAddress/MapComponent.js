import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {parseAddress} from "../../util/Utils";

export const MapComponent = ({onUpdateAddress}) => {

    const [selectedLocation, setSelectedLocation] = useState({latitude: 10.7769, longitude: 106.7009});

    // Xử lý khi người dùng nhấn vào bản đồ chọn vị trí
    const handleMapPress = async ({nativeEvent: {coordinate}}) => {

        setSelectedLocation(coordinate);
        try {

            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyCmppXAtr_MzNx_sCbDwK9fARePuf7N6qs`
            );

            // console.log('Google Map Response', response.data);

            if (response?.data?.results?.length > 0) {

                const formattedAddress = response.data.results[0].formatted_address;
                console.log(formattedAddress);

                const to_address = parseAddress(formattedAddress);

                console.log('To Address', to_address);

                // Gọi hàm callback để cập nhật to_address trong GoogleMapsScreen
                onUpdateAddress(to_address);

            } else {
                console.log('No results found');
            }

        } catch (error) {
            console.error('Error fetching address:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{latitudeDelta: 0.01, longitudeDelta: 0.01, ...selectedLocation}}
                onPress={handleMapPress}>

                {/*{selectedLocation && address && (*/}
                {/*    <Marker*/}
                {/*        coordinate={selectedLocation}*/}
                {/*        title={address.formattedAddress}*/}
                {/*    />*/}
                {/*)}*/}

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
        height: 350
    }
});
