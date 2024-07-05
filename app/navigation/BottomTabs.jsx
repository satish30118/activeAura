import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "../screens/Home";
import AddFriends from "../screens/AddFriends";

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
        name="AddFriends"
        component={AddFriends}
        options={{
          headerShown: false,
          tabBarLabel: "Add Friends",
          tabBarIcon: ({ color, size }) => (
            <Icon name="group" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
