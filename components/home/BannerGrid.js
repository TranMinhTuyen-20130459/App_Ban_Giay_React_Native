import React from "react";
import {Image, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {Dimensions} from "react-native";
export default function BannerGrid(){
    const imageList = [
        require('../../assets/BannerSquare/1.jpeg'),
        require('../../assets/BannerSquare/2.jpeg'),
        require('../../assets/BannerSquare/3.jpeg'),
        require('../../assets/BannerSquare/4.jpeg'),
        require('../../assets/BannerSquare/5.jpeg'),
        require('../../assets/BannerSquare/6.jpeg'),
        require('../../assets/BannerSquare/7.jpeg'),
        require('../../assets/BannerSquare/8.jpeg'),
        require('../../assets/BannerSquare/9.jpeg'),
        require('../../assets/BannerSquare/10.jpeg'),
    ];
    const randomImages = getRandomImages(imageList, 6);
    return(
        <View style={styles.container}>
            {randomImages.map((image, index) =>(
                <View key={index}>
                    <TouchableOpacity style={styles.element}>
                        <Image
                            source={image}
                            style={styles.elementImage}
                        />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}
const getRandomImages = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        display: 'flex', // React Native uses flexbox by default
        flexWrap: 'wrap',
        flexDirection: 'row', // Horizontal direction, similar to grid-template-columns
        justifyContent: 'space-between', // Align items along the main axis (horizontal in this case)
        alignItems: 'stretch', // Align items along the cross axis (vertical in this case)
        gap: 12,
    },
    element: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'var(--alias-outline-overlay, rgba(0, 0, 0, 0.05))',
        backgroundColor: 'var(--alias-theme, #fff)',
        overflow: 'hidden',
        width: (width - 32 - 16) * 0.5,
        height: (width - 32 - 16) * 0.5,
        flexShrink: 0,
        display: 'flex',
        aspectRatio: 1, // React Native uses aspectRatio property
    },
    elementImage: {
        width: (width - 32 - 16) * 0.5,
        height: (width - 32 - 16) * 0.5,
        flex: 1,
        opacity: 1,
    }
})


