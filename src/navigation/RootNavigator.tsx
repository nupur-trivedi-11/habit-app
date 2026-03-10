import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";
import AddHabit from "../screens/AddHabit";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddHabit"
          component={AddHabit}
          options={{ title: "Add Habit" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
