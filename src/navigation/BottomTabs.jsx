import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "../screens/Home";
import NewPost from "../screens/NewPost";
import Message from "../screens/Message";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "darkblue",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={NewPost}
        options={{
          headerShown: false,
          tabBarLabel: "New Post",
          tabBarIcon: ({ color, size }) => (
            <Icon name="upload" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerShown: false,
          tabBarLabel: "Message",
          tabBarIcon: ({ color, size }) => (
            <Icon name="group" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
