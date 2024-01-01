import React, {useEffect, useRef, useState} from 'react';
import {
    Alert,
    Image,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {apiCall} from './api/OpenAI';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../../theme';

const initChatMessages = {
    role: 'assistant',
    content: 'Xin chào! Mình là trợ lý AI của Tiki Kun. Bạn cần mình giúp gì?',
};

const ChatBotScreen = ({route}) => {

    const [isWaitingResponse, setIsWaitingResponse] = useState(false);
    const [messages, setMessages] = useState([initChatMessages]);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef();

    // Xóa đi lịch sử đoạn Chat
    const clear = async () => {
        setInputText('');
        setMessages([initChatMessages]);
        setIsWaitingResponse(false);
    };

    // Nhận phản hồi từ ChatBot
    const fetchResponse = async () => {
        const requestData = inputText.trim();

        if (requestData.length > 0) {
            setIsWaitingResponse(true);
            let newMessages = [...messages];
            newMessages.push({role: 'user', content: requestData});
            setMessages([...newMessages]);

            // Scroll to the bottom of the view
            updateScrollView();

            setInputText(''); // Clear input after sending

            // Fetching response from chatGPT with our prompt and old messages
            apiCall(requestData, newMessages).then((res) => {
                setIsWaitingResponse(false);
                if (res.success) {
                    setMessages([...res.data]);
                    updateScrollView();
                } else {
                    Alert.alert(
                        'Thông báo',
                        'Hệ thống hiện tại đang bận, vui lòng thử lại sau!'
                    );
                }
            });
        }
    };

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true});
        }, 200);
    };

    const {setKeyboardVisible} = route.params;

    // Dùng để ẩn/hiện thanh Tab Bar tại MainContainer
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                // console.log('keyboardDidShow');
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                // console.log('keyboardDidHide');
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [setKeyboardVisible]);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.botIconContainer}>
                    <Image
                        source={require('../../images/bot.png')}
                        style={styles.botIcon}
                    />
                </View>

                <View style={styles.messageHistoryContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.messagesScrollView}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode="on-drag" // Automatically hide keyboard when scrolling ScrollView
                        keyboardShouldPersistTaps="handled" // Handle taps on other components to hide keyboard
                    >
                        {messages.map((message, index) => {
                            if (message.role === 'assistant') {
                                return (
                                    <View style={{flexDirection: 'row'}} key={index}>
                                        <Image
                                            source={require('../../images/bot.png')}
                                            style={{height: 45, width: 45, marginRight: 10}}
                                        />
                                        <View style={styles.chatResponseContainer}>
                                            {renderContentWithImage(message.content)}
                                        </View>
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={index} style={styles.userInputContainer}>
                                        <View style={styles.userInput}>
                                            <Text style={styles.userInputText}>
                                                {message.content}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }
                        })}

                        {isWaitingResponse && (
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    source={require('../../images/bot.png')}
                                    style={{height: 45, width: 45, marginRight: 10}}
                                />
                                <View style={styles.chatResponseContainer}>
                                    <Text style={styles.chatResponseText}>...</Text>
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.inputContainer}>
                        <View style={styles.trashIconContainer}>
                            <TouchableOpacity onPress={clear}>
                                <Icon name="trash" size={25} color={colors.redHeart}/>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.inputText}
                            placeholder="Nhập nội dung chat ..."
                            value={inputText}
                            onChangeText={(text) => setInputText(text)}
                        />

                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={fetchResponse}
                        >
                            <Icon name="arrow-right" size={18} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const renderContentWithImage = (content) => {
    // Regular expression to find URLs of images in the content
    const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;

    // Split the content by image URLs
    const parts = content.split(imageUrlRegex);

    return parts.map((part, index) => {
        if (index % 2 === 0) {
            // Text part
            return <Text key={index}>{part}</Text>;
        } else {
            // Image part
            return (
                <Image
                    key={index}
                    source={{uri: part}}
                    style={{height: 45, width: 45}}
                />
            );
        }
    });
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    safeAreaView: {
        backgroundColor: colors.white,
        marginTop: 50,
        flex: 1,
        marginHorizontal: 5,
    },
    botIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    botIcon: {
        height: 50,
        width: 50,
    },
    messageHistoryContainer: {
        flex: 1,
        paddingTop: 15,
    },
    messagesScrollView: {
        flex: 1,
    },
    chatResponseContainer: {
        width: wp(70),
        backgroundColor: '#F5F5FA',
        padding: 8,
        borderRadius: 20,
        borderTopLeftRadius: 0,
        marginBottom: 10,
    },
    chatResponseText: {
        color: colors.grey,
        fontSize: wp(4),
    },
    userInputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    userInput: {
        maxWidth: wp(70),
        backgroundColor: '#3B85FF',
        padding: 8,
        borderRadius: 20,
    },
    userInputText: {
        fontSize: wp(4),
        color: colors.white,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
    },
    inputText: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 0,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#3B85FF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
    },
    trashIconContainer: {
        marginHorizontal: 10,
    },
});

export default ChatBotScreen;