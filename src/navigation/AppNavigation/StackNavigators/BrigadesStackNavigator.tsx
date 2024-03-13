import React, { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import BrigadesScreen from "../../../screens/app/menu/brigades/BrigadesScreen";
import SingleBrigadeScreen from "../../../screens/app/menu/brigades/SingleBrigadeScreen";
import EditBrigadeScreen from "../../../screens/app/menu/brigades/EditBrigadeScreen";
import { BrigadeProps } from "../../../types/Types";
import PermissionCheck from "../../../components/app/PermissionCheck";
import KeyboardVisibility from "../../../components/KeyboardVisibilityCheck";

const Stack = createStackNavigator();

const SingleBrigadeStack = createStackNavigator<SingleBrigadeListBase>();
const EditBrigadeScreenStack =
  createStackNavigator<EditBrigadeScreenListBase>();

type SingleBrigadeListBase = {
  SingleBrigadeScreen: { brigade: BrigadeProps };
};

type EditBrigadeScreenListBase = {
  EditBrigadeScreen: { brigade?: BrigadeProps };
};

export default function BrigadesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: "#313131",
          alignItems: "center",
        },
        headerShown: !KeyboardVisibility(),
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
        name="BrigadesScreen"
        component={BrigadesScreen}
        options={{ animationEnabled: false, title: "Бригади" }}
      />
      <SingleBrigadeStack.Screen
        name="SingleBrigadeScreen"
        component={SingleBrigadeScreen}
        options={({ route, navigation }) => {
          return {
            title: "",
            animationEnabled: false,
            headerRight: () => (
              <PermissionCheck permissionsToBeVisible={[7]}>
                <TouchableOpacity
                  style={{ marginRight: 26 }}
                  onPress={() => {
                    navigation.navigate("EditBrigadeScreen", {
                      brigade: route.params.brigade,
                    });
                  }}
                >
                  <Image
                    source={require("@assets/images/settingsIcon.png")}
                    style={{ width: 32, height: 32 }}
                  />
                </TouchableOpacity>
              </PermissionCheck>
            ),
          };
        }}
      />
      <EditBrigadeScreenStack.Screen
        name="EditBrigadeScreen"
        component={EditBrigadeScreen}
        options={({ route }) => ({
          animationEnabled: false,
          title: route.params?.brigade
            ? `Редагування ${route.params.brigade.name}`
            : "Створення бригади",
        })}
      />
    </Stack.Navigator>
  );
}
