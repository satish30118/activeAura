import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Layout/HomeScreen";

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
