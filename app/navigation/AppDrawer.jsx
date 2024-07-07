import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Layout/HomeScreen";
import CustomDrawerContent from "../Layout/CustomDrawer";

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ drawerLabel: () => null, headerShown: false, title: "" }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
