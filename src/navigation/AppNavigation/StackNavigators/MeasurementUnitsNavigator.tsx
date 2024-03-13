import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import MeasurementUnitsScreen from "../../../screens/app/menu/supplyCategories/consumableUnit/measurementUnits/MeasurementUnitsScreen";
import AddMesurementUnitsScreen from "../../../screens/app/menu/supplyCategories/consumableUnit/measurementUnits/AddMeasurementUnitsScreen";

const Stack = createStackNavigator();

export default function MeasurementUnitsStackNavigator() {
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
        name="MeasurementUnitsScreen"
        component={MeasurementUnitsScreen}
        options={{ animationEnabled: false, title: "Одиниці вимірювання" }}
      />
      <Stack.Screen
        name="AddMesurementUnitsScreen"
        component={AddMesurementUnitsScreen}
        options={{ animationEnabled: false, title: "Створення одиниці" }}
      />
    </Stack.Navigator>
  );
}
