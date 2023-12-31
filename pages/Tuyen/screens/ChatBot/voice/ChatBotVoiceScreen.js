import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {apiCall} from '../api/OpenAI';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';

const ChatBotVoiceScreen = () => {

    const [result, setResult] = useState('');
    const [recording, setRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [speaking, setSpeaking] = useState(false);
    const scrollViewRef = useRef();

    const speechStartHandler = e => {
        console.log('speech start event', e);
    };

    const speechEndHandler = e => {
        setRecording(false);
        console.log('speech stop event', e);
    };

    const speechResultsHandler = e => {
        console.log('speech event: ', e);
        const text = e.value[0];
        console.log('Result: ', text)
        setResult(text);
    };

    const speechErrorHandler = e => {
        console.log('speech error: ', e);
    }

    const startRecording = async () => {
        setRecording(true);
        await Tts.stop();
        try {
             await Voice.start('en-US');
        } catch (error) {
            console.log('error', error);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setRecording(false);
            await fetchResponse();
        } catch (error) {
            console.log('error', error);
        }
    };

    const clear = async () => {
        await Tts.stop();
        setSpeaking(false);
        setLoading(false);
        setMessages([]);
    };

    const fetchResponse = async () => {
        if (result.trim().length > 0) {

            setLoading(true);
            let newMessages = [...messages];
            newMessages.push({role: 'user', content: result.trim()});
            setMessages([...newMessages]);

            // scroll to the bottom of the view
            updateScrollView();

            // fetching response from chatGPT with our prompt and old messages
            apiCall(result.trim(), newMessages).then(res => {

                console.log('got api data');

                setLoading(false);
                if (res.success) {
                    setMessages([...res.data]);
                    setResult('');
                    updateScrollView();

                    // now play the response to user
                    startTextToSpeach(res.data[res.data.length - 1]);

                } else {
                    Alert.alert('Error', res.msg);
                }

            })
        }
    }

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true});
        }, 200)
    }

    const startTextToSpeach = message => {
        if (!message.content.includes('https')) {
            setSpeaking(true);
            // playing response with the voice id and voice speed
            Tts.speak(message.content, {
                iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
                rate: 0.5,
            });
        }
    }

    const stopSpeaking = () => {
        Tts.stop().then(r => console.log('stop', r));
        setSpeaking(false);
    }

    useEffect(() => {

        // voice handler events
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        // text to speech events
        // Tts.setDefaultLanguage('vi-VN').then(r => console.log('set default language', r));
        Tts.addEventListener('tts-start', event => console.log('start', event));
        Tts.addEventListener('tts-finish', event => {
            console.log('finish', event);
            setSpeaking(false)
        });
        Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

        return () => {
            // destroy the voice instance after component unmounts
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>

                <View style={styles.botIconContainer}>
                    <Image source={require('../../../images/bot.png')} style={styles.botIcon}/>
                </View>

                <View style={styles.messageHistoryContainer}>
                    <Text style={styles.assistantText}>Trợ lý</Text>

                    <View style={styles.messagesContainer}>
                        <ScrollView ref={scrollViewRef} style={styles.messagesScrollView}
                                    showsVerticalScrollIndicator={false}>
                            {messages.map((message, index) => {
                                if (message.role === 'assistant') {
                                    if (message.content.includes('https')) {
                                        return (
                                            <View key={index} style={styles.aiImageContainer}>
                                                <View style={styles.aiImage}>
                                                    <Image source={{uri: message.content}}
                                                           style={styles.aiImageInner} resizeMode="contain"/>
                                                </View>
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <View key={index} style={styles.chatResponseContainer}>
                                                <Text style={styles.chatResponseText}>{message.content}</Text>
                                            </View>
                                        );
                                    }
                                } else {
                                    return (
                                        <View key={index} style={styles.userInputContainer}>
                                            <View style={styles.userInput}>
                                                <Text style={styles.userInputText}>{message.content}</Text>
                                            </View>
                                        </View>
                                    );
                                }
                            })}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>

                    {loading ? (
                        <Image source={require('../../../images/loading.gif')} style={styles.loadingIcon}/>
                    ) : recording ? (
                        <TouchableOpacity style={styles.stopRecordingButton} onPress={stopRecording}>
                            <Image style={styles.recordingStopButton}
                                   source={require('../../../images/voiceLoading.gif')}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.startRecordingButton} onPress={startRecording}>
                            <Image style={styles.recordingStartButton}
                                   source={require('../../../images/recordingIcon.png')}/>
                        </TouchableOpacity>
                    )}

                    {messages.length > 0 && (
                        <TouchableOpacity onPress={clear} style={styles.clearButton}>
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    )}

                    {/* Nếu User đang nói chuyện với ChatBot*/}
                    {speaking && (
                        <TouchableOpacity onPress={stopSpeaking} style={styles.stopButton}>
                            <Text style={styles.stopButtonText}>Stop</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: 'white',
    },
    safeAreaView: {
        flex: 1,
        marginHorizontal: 5,
    },
    botIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    botIcon: {
        height: hp(15),
        width: hp(15),
    },
    messageHistoryContainer: {
        flex: 1,
        paddingTop: 5,
    },
    assistantText: {
        color: 'gray',
        fontWeight: 'bold',
        marginLeft: 1,
        fontSize: wp(5),
    },
    messagesContainer: {
        height: hp(58),
        backgroundColor: '#E5E5E5',
        borderRadius: 20,
        padding: 16,
    },
    messagesScrollView: {
        flex: 1,
    },
    aiImageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    aiImage: {
        padding: 8,
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#64C791',
        borderTopLeftRadius: 0,
    },
    aiImageInner: {
        borderRadius: 20,
        height: wp(60),
        width: wp(60),
    },
    chatResponseContainer: {
        width: wp(70),
        backgroundColor: '#64C791',
        padding: 8,
        borderRadius: 20,
        borderTopLeftRadius: 0,
    },
    chatResponseText: {
        color: '#4E4E4E',
        fontSize: wp(4),
    },
    userInputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userInput: {
        width: wp(70),
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
        borderTopRightRadius: 0,
    },
    userInputText: {
        fontSize: wp(4),
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIcon: {
        width: hp(10),
        height: hp(10),
    },
    stopRecordingButton: {
        paddingTop: 8,
    },
    recordingStopButton: {
        borderRadius: 20,
        width: hp(10),
        height: hp(10),
    },
    startRecordingButton: {
        paddingTop: 8,
    },
    recordingStartButton: {
        borderRadius: 20,
        width: hp(10),
        height: hp(10),
    },
    clearButton: {
        backgroundColor: '#6D6D6D',
        borderRadius: 15,
        padding: 20,
        position: 'absolute',
        right: 10,
    },
    clearButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    stopButton: {
        backgroundColor: '#FF4E4E',
        borderRadius: 20,
        padding: 8,
        position: 'absolute',
        left: 10,
    },
    stopButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ChatBotVoiceScreen;
