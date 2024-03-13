import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PersonScreen from "../../../screens/app/home/person/PersonScreen";
import AddPersonNameScreen from "../../../screens/app/home/person/AddPersonNameScreen";
import AddPersonRoleScreen from "../../../screens/app/home/person/AddPersonRoleScreen";
import PersonPaswordAchiveScreen from "../../../screens/app/home/person/PersonPaswordAchiveScreen";
import PersonInfoScreen from "../../../screens/app/home/person/PersonInfoScreen";
import EditPersonScreen from "../../../screens/app/home/person/EditPersonScreen";
import Person from "../../../class/Person";
import { PersonProps } from "../../../types/Types";
import { Image } from "react-native";
import PersonNewPasswordScreen from "../../../screens/app/home/person/PersonNewPasswordScreen";

const Stack = createStackNavigator();
const AddPersonRoleStack =
  createStackNavigator<AddPersonRoleScreenParamListBase>();
const PersonPaswordAchiveStack =
  createStackNavigator<PersonPaswordAchiveScreeParamListBase>();
const PersonInfoStack = createStackNavigator<PersonInfoScreenParamListBase>();
const EditPersonStack = createStackNavigator<EditPersonScreenParamListBase>();
const PersonNewPasswordStack =
  createStackNavigator<PersonNewPasswordScreenParamListBase>();

type AddPersonRoleScreenParamListBase = {
  AddPersonRoleScreen: { person: Person };
};
type PersonPaswordAchiveScreeParamListBase = {
  PersonPaswordAchiveScreen: { person: Person };
};
type PersonInfoScreenParamListBase = {
  PersonInfoScreen: { person: PersonProps };
};
type EditPersonScreenParamListBase = {
  EditPersonScreen: { person: PersonProps };
};

type PersonNewPasswordScreenParamListBase = {
  PersonNewPasswordScreen: { person: PersonProps };
};

export default function PersonStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 30,
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
        name="PersonScreen"
        component={PersonScreen}
        options={{ animationEnabled: false, title: "Всі люди" }}
      />
      <Stack.Screen
        name="AddPersonNameScreen"
        component={AddPersonNameScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <AddPersonRoleStack.Screen
        name="AddPersonRoleScreen"
        component={AddPersonRoleScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <PersonPaswordAchiveStack.Screen
        name="PersonPaswordAchiveScreen"
        component={PersonPaswordAchiveScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <PersonInfoStack.Screen
        name="PersonInfoScreen"
        component={PersonInfoScreen}
        options={{
          animationEnabled: false,
          title: "Інфо-картка",
          headerStatusBarHeight: 90,
        }}
      />
      <EditPersonStack.Screen
        name="EditPersonScreen"
        component={EditPersonScreen}
        options={{ animationEnabled: false, title: "Редагування даних" }}
      />
      <PersonNewPasswordStack.Screen
        name="PersonNewPasswordScreen"
        component={PersonNewPasswordScreen}
        options={{ animationEnabled: false, title: "Зміна паролю" }}
      />
    </Stack.Navigator>
  );
}
