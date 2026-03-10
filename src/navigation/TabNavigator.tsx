import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootTabParamList>();

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof RootTabParamList, IconName> = {
            dashboard: "home",
            profile: "account",
          };

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{ headerShown: false, tabBarLabel: "Dashboard" }}
      ></Tab.Screen>
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{ tabBarLabel: "Profile" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
