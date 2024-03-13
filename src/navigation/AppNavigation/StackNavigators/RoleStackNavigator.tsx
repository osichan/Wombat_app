import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import RoleScreen from "../../../screens/app/menu/role/RoleScreen";
import AddRoleScreen from "../../../screens/app/menu/role/AddRoleScren";
import RolePermissionScreen from "../../../screens/app/menu/role/RolePermissionsSreen";
import { RoleProps } from "../../../types/Types";

const Stack = createStackNavigator();
const RolePermissionStack =
  createStackNavigator<RolePermissionScreenParamListBase>();

type RolePermissionScreenParamListBase = {
  RolePermissionScreen: { role: RoleProps };
};

export default function RoleStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 90,
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
        name="RoleScreen"
        component={RoleScreen}
        options={{ animationEnabled: false, title: "Варіації вибору ролей" }}
      />
      <Stack.Screen
        name="AddRoleScreen"
        component={AddRoleScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <RolePermissionStack.Screen
        name="RolePermissionScreen"
        component={RolePermissionScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}
