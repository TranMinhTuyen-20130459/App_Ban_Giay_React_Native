import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Features = () => {
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>

            <Text style={styles.heading}>Features</Text>

            <FeatureCard
                icon={require('../../../images/chatgptIcon.png')}
                title="ChatGPT"
                description="ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics."
            />

            <FeatureCard
                icon={require('../../../images/dalleIcon.png')}
                title="DALL-E"
                description="DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity."
            />

            <FeatureCard
                icon={require('../../../images/smartaiIcon.png')}
                title="Smart AI"
                description="A powerful voice assistant with the abilities of ChatGPT and DALL-E, providing you the best of both worlds."
            />
        </ScrollView>
    );
};

const FeatureCard = ({icon, title, description}) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Image source={icon} style={styles.cardIcon}/>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <Text style={styles.cardDescription}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(80),
    },
    heading: {
        fontSize: wp(10),
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        backgroundColor: '#6EE7B8',
        padding: hp(2),
        borderRadius: hp(2),
        marginTop: hp(2),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    cardIcon: {
        height: hp(4),
        width: hp(4),
        borderRadius: hp(2),
    },
    cardTitle: {
        fontSize: wp(4.8),
        fontWeight: 'bold',
        color: '#333',
        marginLeft: wp(2),
    },
    cardDescription: {
        fontSize: wp(3.8),
        color: '#333',
        fontWeight: '400',
    },
});