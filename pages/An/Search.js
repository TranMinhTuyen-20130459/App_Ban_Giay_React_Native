import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NetInfo from '@react-native-community/netinfo';
import {Audio} from 'expo-av';
import {Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {API_GET_PATHS} from "../../common/PathApi";

const Search = () => {
        const navigation = useNavigation();
        const [searchQuery, setSearchQuery] = useState('');
        const [data, setData] = useState([]);
        const [isVoice, setIsVoice] = useState(false);
        
    
        async function requestAudioPermission() {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.warn('Quyền ghi âm bị từ chối!');
            }
        }
        const handleTranscribe = async (audioUri) => {
            try {
              const result = await transcribeAudioToText(audioUri);
              setSearchQuery(result);
            } catch (error) {
              console.error('Lỗi khi xử lý giọng nói:', error);
            }
          };
        const transcribeAudioToText = async (audioUri) => {
            try {
                // Kiểm tra kết nối mạng
                const netInfo = await NetInfo.fetch();
                if (!netInfo.isConnected) {
                    console.warn('Không có kết nối mạng');
                    return '';
                }

                // Gửi yêu cầu lên Google Cloud Speech-to-Text API
                const response = await fetch(
                    'https://speech.googleapis.com/v1/speech:recognize?key=64c8cbceb736462dc203328cdaf26e18f8e4f273',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            audio: {
                                content: audioUri, // Đường dẫn đến file âm thanh đã ghi
                            },
                            config: {
                                encoding: 'LINEAR16',
                                sampleRateHertz: 16000,
                                languageCode: 'en-US',
                            },
                        }),
                    }
                );

                const result = await response.json();

                // Kiểm tra xem có kết quả nhận diện giọng nói không
                if (result.results && result.results.length > 0 && result.results[0].alternatives && result.results[0].alternatives.length > 0) {
                    return result.results[0].alternatives[0].transcript || '';
                } else {
                    console.warn('Không có kết quả nhận diện giọng nói');
                    return '';
                }
            } catch (error) {
                console.error('Lỗi khi nhận diện giọng nói:', error);
                throw error;
            }
        };
        const startRecording = async () => {
            try {
                await requestAudioPermission(); // Yêu cầu quyền ghi âm trước khi bắt đầu ghi âm

                const recording = new Audio.Recording();
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

                await recording.startAsync();
                console.log('Đang ghi âm...');

                await new Promise(resolve => setTimeout(resolve, 3000)); // Ghi âm trong 10 giây

                await recording.stopAndUnloadAsync();
                console.log('Ghi âm đã kết thúc');

                const uri = recording.getURI();
                console.log('Đường dẫn file âm thanh:', uri);

                handleTranscribe(uri)
            } catch (error) {
                console.error('Lỗi khi ghi âm:', error);
            }
        };

        // gọi api để lấy dữ liệu
        const fetchData = async () => {
            try {

                const response = await fetch(
                    API_GET_PATHS.lay_ds_san_pham_theo_ten + "name=" +
                    `${searchQuery}` + "&quantity=4"
                );

                const jsonData = await response.json();

                // set data bằng dữ liệu lấy được
                setData(jsonData.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        const handleInputChange = (text) => {
            setSearchQuery(text);
        };

        useEffect(() => {
            // Gọi hàm tìm kiếm mỗi khi giá trị của input thay đổi
            fetchData()

        }, [searchQuery]);
        const handleSearch = () => {
            // Thực hiện xử lý tìm kiếm và truyền dữ liệu đến trang tìm kiếm
            navigation.navigate('SearchResult', { query: searchQuery });
        };
        return (

            <View style={styles.container}>

                <View style={styles.headerSearch}>

                    <Ionicons style={styles.icon_back} name="arrow-back-outline" size={26} color={'#aaa'}
                        onPress={() => navigation.goBack()} />

                    <TextInput
                        placeholder="Giao nhanh 2H & đúng khung giờ"
                        style={styles.searchTextInput}
                        editable={true}
                        onChangeText={handleInputChange}
                        onSubmitEditing={handleSearch}
                    />
                    <Ionicons style={styles.icon_mic} name="mic-outline" size={26} color={'#aaa'}
                        onPress={startRecording} />

                </View >
                <Text style={{ color: 'red' }}></Text>
                <View>{searchQuery !== '' ? (data.map((item) => (
                    <TouchableOpacity
                        style={styles.productItem}
                        key={item.id_product}
                        onPress={() =>
                            navigation.navigate("SearchResult", {
                                query: item.name_product,
                            })
                        }
                    >

                        <Text style={styles.placeholder_search}><Ionicons name="search-circle-outline" size={16}
                            color={'#aaa'} /> {item.name_product}</Text>
                        <Text style={styles.line}></Text>
                    </TouchableOpacity>
                ))) : <Text></Text>}</View>

                <View style={styles.suggest1}>
                    <Text>Coupon Đến 150K</Text>
                    <Text style={styles.sale}>HÀNG HIỆU SALE 50%</Text>
                </View>
                <View style={styles.comp}>
                    <View style={styles.trending}>
                        <Ionicons style={styles.icon_tren} name="trending-up-outline" />
                        <Text style={styles.text_tren}>Tìm kiếm phổ biến</Text>
                    </View>
                    <View style={styles.list_tren}>
                        <View style={styles.item_tren}>
                            <Image style={styles.item_tren_image}
                                   source={require('../../assets/logo.png')}
                            ></Image>
                            <Text style={styles.item_tren_text}>Nike Air Max</Text>
                        </View>
                        <View style={styles.item_tren}>
                            <Image style={styles.item_tren_image}
                                   source={require('../../assets/logo.png')}
                            ></Image>
                            <Text style={styles.item_tren_text}>Adidas 98</Text>
                        </View>
                        <View style={styles.item_tren}>
                            <Image style={styles.item_tren_image}
                                   source={require('../../assets/logo.png')}
                            ></Image>
                            <Text style={styles.item_tren_text}>Jordan 9081</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.catogary}>
                    <Text style={styles.title_catogary}>Danh mục nổi bật</Text>
                    <View style={styles.list_catogary}>
                        <View style={styles.item_catogary}>
                            <Image style={styles.image_catogary}
                                   source={require('../../assets/logo.png')}
                            ></Image>
                            <Text style={styles.name_catogary}>Giày Nike</Text>
                        </View>
                        <View style={styles.item_catogary}>
                            <Image style={styles.image_catogary}
                                   source={require('../../assets/logo.png')}
                            ></Image>
                            <Text style={styles.name_catogary}>Giày Jordan</Text>
                        </View>
                        <View style={styles.item_catogary}>
                            <Image style={styles.image_catogary}
                                   source={require('../../assets/logo.png')}
                            ></Image>
                            <Text style={styles.name_catogary}>Giày Adidas</Text>
                        </View>
                        <View style={styles.item_catogary}>
                            <Image style={styles.image_catogary}
                                   source={require('../../assets/logo.png')}
                            ></Image>
                            <Text style={styles.name_catogary}>Giày Jordan 1</Text>
                        </View>

                    </View>
                </View>
            </View>

        );
    };
    const { width } = Dimensions.get('window');
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f2f2f2',
        },
        suggest1: {
            fontSize: 24,
            flexDirection: 'row', // or 'column'
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
            marginTop: 5,
            marginBottom: 10
        },
        sale: {
            padding: 3,
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: 7,
        },
        trending: {
            marginTop: 20,
            padding: 5,
            flexDirection: 'row', // or 'column'

        },
        icon_tren: {
            padding: 1,
            backgroundColor: "#FF0000",
            borderRadius: 50,
            fontSize: 30

        },
        text_tren: {
            padding: 5,
            paddingLeft: 10,
            fontWeight: '700',

        },
        list_tren: {
            flexDirection: 'row',
            flexWrap: 'wrap',

            justifyContent: 'space-between',


        },
        item_tren: {
            width: '47%',
            flexDirection: 'row',
            margin: 5,
            padding: 5,
            backgroundColor: '#fafafa',

        },
        item_tren_image: {
            width: 50, // Độ rộng của hình ảnh
            height: 35, // Độ cao của hình ảnh

            resizeMode: 'contain',
            marginRight: 15,
        },
        item_tren_text: {
            marginTop: 6,

        },
        catogary: {
            marginTop: 10,
            backgroundColor: '#fff',
            height: '100%',
            padding: 5
        },
        list_catogary: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20
        },
        title_catogary: {
            fontWeight: 'bold',
            fontSize: 15,
            paddingHorizontal: 10
        },
        item_catogary: {
            width: '20%',
            marginLeft: 10,
            marginTop: 10,
            borderRadius: 4

        },
        image_catogary: {
            width: 50,
            height: 40,
            alignItems: 'center',
            marginLeft: 10,

            resizeMode: 'stretch'
        },
        name_catogary: {
            textAlign: 'center',
            alignItems: 'center',
            marginTop: 5
        },
        icon_back: {
            padding: 1,

            borderRadius: 50,
            fontSize: 30
        },
        icon_mic: {
            padding: 1,
            borderRadius: 50,
            fontSize: 30
        },
        headerSearch: {
            paddingVertical: 10,
            marginTop: 30,
            marginVertical: 0,
            flexDirection: 'row',
            backgroundColor: '#fff'
        },
        comp: {
            backgroundColor: '#fff'
        },
        searchTextInput: {
            borderWidth: 0,
            height: 36,
            margin: 0,
            marginLeft: 8,
            // outlineWidth: 0, // Tương đương với outline: 0px;
            width: '77%',
            padding: 0,
            fontWeight: '400', // Tương đương với font-weight: 400;
            fontSize: 14,
            lineHeight: 1.5, // Tương đương với line-height: 150%;
        },
        placeholder_search: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#fff'
        },
        line: {
            height: 1,
            backgroundColor: '#000'
        }


    });

    export default Search;