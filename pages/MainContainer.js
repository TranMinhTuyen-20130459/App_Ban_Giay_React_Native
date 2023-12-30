import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './Tham/HomeScreen';
import CategoryScreen from './Tham/CategoryScreen';
import AccountScreen from './Tuyen/screens/Orther/AccountScreen';
import ChatBotScreen from "./Tuyen/screens/ChatBot/ChatBotScreen";
import MessageScreen from "./Tuyen/screens/Orther/MessageScreen";

const homeName = "Trang chủ";
const categoryName = "Danh mục";
const chatBotName = "Trợ lý";
const accountName = "Tài khoản";

const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';

                    } else if (rn === categoryName) {
                        iconName = focused ? 'grid' : 'grid-outline';

                    } else if (rn === chatBotName) {
                        iconName = focused ? 'bug' : 'bug-outline';

                    } else if (rn === accountName) {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                headerShown: false,
                tabBarLabelStyle: {
                    paddingBottom: 6,
                    fontSize: 10,
                },
                tabBarStyle: {
                    padding: 4
                }
            })}
        >
            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={categoryName} component={CategoryScreen}/>
            <Tab.Screen name={chatBotName} component={ChatBotScreen}/>
            <Tab.Screen name={accountName} component={AccountScreen}/>
        </Tab.Navigator>
    );
}


export default MainContainer;