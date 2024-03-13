import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import ProfileScreen from "../../../screens/app/menu/profile/ProfileScreen";
import ProfilePasswordChangeScreen from "../../../screens/app/menu/profile/ProfilePasswordChangeScreen";
import ProfilePhoneChangeScreen from "../../../screens/app/menu/profile/ProfilePhoneChangeScreen";

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 50,
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ animationEnabled: false, title: "Мій аккаунт" }}
      />
      <Stack.Screen
        name="ProfilePasswordChangeScreen"
        component={ProfilePasswordChangeScreen}
        options={{ animationEnabled: false, title: "Зміна паролю" }}
      />
      <Stack.Screen
        name="ProfilePhoneChangeScreen"
        component={ProfilePhoneChangeScreen}
        options={{ animationEnabled: false, title: "Зміна номеру" }}
      />
    </Stack.Navigator>
  );
}
