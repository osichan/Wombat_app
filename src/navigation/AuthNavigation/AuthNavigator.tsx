import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import ChooseScreen from "../../screens/auth/ChooseScreen";
import CompanyRegistrationScreen from "../../screens/auth/logIn/CompanyRegistrationScreen";
import ManagerRegistrationScreen from "../../screens/auth/logIn/ManagerRegistrationScreen";
import PasswordAchiveScreen from "../../screens/auth/logIn/PaswordAchiveScreen";
import SignInScreen from "../../screens/auth/signIn/SignInScreen";

import Person from "../../class/Person";

const Stack = createStackNavigator();
const CompanyRegistrationParamListBaseStack =
  createStackNavigator<CompanyRegistrationParamListBase>();
const ManagerRegistrationParamListBaseStack =
  createStackNavigator<ManagerRegistrationParamListBase>();
const PasswordAchiveParamListBaseStack =
  createStackNavigator<PasswordAchiveParamListBase>();

type CompanyRegistrationParamListBase = {
  CompanyRegistration: { message: string[]; user: Person };
};

type PasswordAchiveParamListBase = {
  PasswordAchive: { user: Person };
};

type ManagerRegistrationParamListBase = {
  ManagerRegistration: { user: Person };
};

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: "rgba(0,0,0,0)",
          alignItems: "center",
        },
        headerTitleStyle: {
          fontSize: 0,
        },
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
        name="Choose"
        component={ChooseScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <CompanyRegistrationParamListBaseStack.Screen
        name="CompanyRegistration"
        component={CompanyRegistrationScreen}
        options={{ animationEnabled: false }}
      />
      <ManagerRegistrationParamListBaseStack.Screen
        name="ManagerRegistration"
        component={ManagerRegistrationScreen}
        options={{ animationEnabled: false }}
      />
      <PasswordAchiveParamListBaseStack.Screen
        name="PasswordAchive"
        component={PasswordAchiveScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}
