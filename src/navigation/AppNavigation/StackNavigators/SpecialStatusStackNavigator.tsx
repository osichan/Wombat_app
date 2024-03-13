import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import SpecialStatusesScreen from "../../../screens/app/menu/specialStatus/SpecialStatusesScreen";
import AddSpecialStatusScreen from "../../../screens/app/menu/specialStatus/AddSpecialStatusScreen";

const Stack = createStackNavigator();

export default function SpecialStatusStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: "#313131",
          alignItems: "center",
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 25,
          fontWeight: "600",
        },
        headerTitleAlign: "center",
        headerBackImage: () => (
          <Image
            source={require("@assets/images/whiteBackButtonIcon.png")}
            style={{
              width: 33,
              height: 33,
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="SpecialStatusesScreen"
        component={SpecialStatusesScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="AddSpecialStatusScreen"
        component={AddSpecialStatusScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}
