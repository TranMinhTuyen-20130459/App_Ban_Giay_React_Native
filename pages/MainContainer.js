import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './Tham/HomeScreen';
import CategoryScreen from './Tham/CategoryScreen';
import MessageScreen from './Tuyen/screens/Orther/MessageScreen';
import AccountScreen from './Tuyen/screens/Orther/AccountScreen';

const homeName = "Trang chủ";
const categoryName = "Danh mục";
const messageName = "Tin mới";
const accountName = "Tài khoản";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === categoryName) {
              iconName = focused ? 'grid' : 'grid-outline';

            } else if (rn === messageName) {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';

            } else if (rn === accountName) {
              iconName = focused ? 'happy' : 'happy-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false ,
          tabBarLabelStyle: {
            paddingBottom: 6, 
            fontSize: 10,
          },
          tabBarStyle: {
            padding: 4
          }
        })}
        >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={categoryName} component={CategoryScreen} />
        <Tab.Screen name={messageName} component={MessageScreen} />
        <Tab.Screen name={accountName} component={AccountScreen} />
      </Tab.Navigator>
  );
}


export default MainContainer;