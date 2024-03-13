import { createStackNavigator } from "@react-navigation/stack";
import { Image, TouchableOpacity } from "react-native";

import KeyboardVisibility from "../../../components/KeyboardVisibilityCheck";
import PermissionCheck from "../../../components/app/PermissionCheck";
import ChooseCategoryScreen from "../../../screens/app/menu/supplyCategories/ChooseCategoryScreen";
import EidtSupplyCategoryScreen from "../../../screens/app/menu/supplyCategories/EditSupplyCategoryScreen";
import SupplyCategoryScreen from "../../../screens/app/menu/supplyCategories/SupplyCategoryScreen";
import ToolInCategoryScreen from "../../../screens/app/menu/supplyCategories/ToolInCategoryScreen";
import ConsumableInUnitScreen from "../../../screens/app/menu/supplyCategories/consumableUnit/ConsumableInUnitScreen";
import ConsumableUnitInCategoryScreen from "../../../screens/app/menu/supplyCategories/consumableUnit/ConsumableUnitInCategoryScreen";
import EditConsumableUnitScreen from "../../../screens/app/menu/supplyCategories/consumableUnit/EditConsumableUnitScreen";
import { ConsumableUnitProps, SupplyCategoryProps } from "../../../types/Types";
import MeasurementUnitsStackNavigator from "./MeasurementUnitsNavigator";

const Stack = createStackNavigator();

const SupplyCategoryStack =
  createStackNavigator<SupplyCategoryScreenParamListBase>();

const ToolInCategoryStack = createStackNavigator<ToolInCategoryParamListBase>();
const ConsumableUnitInCategoryStack =
  createStackNavigator<ConsumableUnitInCategoryParamListBase>();

const EditSupplyCategoryStack =
  createStackNavigator<EidtSupplyCategoryParamListBase>();

const EditConsumableUnitStack =
  createStackNavigator<EditConsumableUnitParamListBase>();

const ConsumableInUnitStack =
  createStackNavigator<ConsumableInUnitParamListBase>();

type SupplyCategoryScreenParamListBase = {
  SupplyCategoryScreen: { type: "T" | "C" };
};

type ConsumableUnitInCategoryParamListBase = {
  ConsumableUnitInCategoryScreen: { category: SupplyCategoryProps };
};

type ToolInCategoryParamListBase = {
  ToolInCategoryScreen: { category: SupplyCategoryProps };
};

type EidtSupplyCategoryParamListBase = {
  EditSupplyCategoryScreen: { category: SupplyCategoryProps };
};

type EditConsumableUnitParamListBase = {
  EditConsumableUnitScreen: { unit?: ConsumableUnitProps };
};

type ConsumableInUnitParamListBase = {
  ConsumableInUnitScreen: { unit: ConsumableUnitProps };
};

export default function SupplyCategoriyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: !KeyboardVisibility(),
        headerBackgroundContainerStyle: {
          backgroundColor: "#313131",
          alignItems: "center",
        },
        headerTitleStyle: { color: "#fff", fontSize: 24, fontWeight: "600" },
        headerTitleAlign: "center",
        headerBackImage: () => (
          <Image
            source={require("@assets/images/whiteBackButtonIcon.png")}
            style={{
              width: 30,
              height: 30,
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="ChooseCategoryScreen"
        component={ChooseCategoryScreen}
        options={{
          headerShown: true,
          animationEnabled: false,
          title: "Категорії",
          headerTitleStyle: {
            fontSize: 42,
            top: 50,
            color: "#5EC396",
          },
        }}
      />
      <SupplyCategoryStack.Screen
        name="SupplyCategoryScreen"
        component={SupplyCategoryScreen}
        options={({ route }) => ({
          headerShown: true,
          animationEnabled: false,
          title:
            route.params.type === "T"
              ? "Категорії інструментів"
              : "Категорії матеріалів",
        })}
      />
      <ToolInCategoryStack.Screen
        name="ToolInCategoryScreen"
        component={ToolInCategoryScreen}
        options={({ route, navigation }) => {
          return {
            headerShown: true,
            animationEnabled: false,
            title: route.params.category.name,
            headerRight: () => (
              <PermissionCheck permissionsToBeVisible={[29]}>
                <TouchableOpacity
                  style={{ marginRight: 26 }}
                  onPress={() =>
                    navigation.navigate("EditSupplyCategoryScreen", {
                      category: route.params.category,
                    })
                  }
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
      <ConsumableUnitInCategoryStack.Screen
        name="ConsumableUnitInCategoryScreen"
        component={ConsumableUnitInCategoryScreen}
        options={({ route, navigation }) => {
          return {
            headerShown: true,
            animationEnabled: false,
            title: route.params.category.name,
            headerRight: () => (
              <PermissionCheck permissionsToBeVisible={[29]}>
                <TouchableOpacity
                  style={{ marginRight: 26 }}
                  onPress={() =>
                    navigation.navigate("EditSupplyCategoryScreen", {
                      category: route.params.category,
                    })
                  }
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
      <EditSupplyCategoryStack.Screen
        name="EditSupplyCategoryScreen"
        component={EidtSupplyCategoryScreen}
        options={({ route }) => ({
          animationEnabled: false,
          title: route.params ? "Редагування категорії" : "Створення категорії",
        })}
      />
      <EditConsumableUnitStack.Screen
        name="EditConsumableUnitScreen"
        component={EditConsumableUnitScreen}
        options={({ route }) => ({
          animationEnabled: false,
          title: route.params
            ? "Редагування одиниці матеріалів"
            : "Створення одиниці матеріалів",
        })}
      />
      <ConsumableInUnitStack.Screen
        name="ConsumableInUnitScreen"
        component={ConsumableInUnitScreen}
        options={({ route }) => ({
          animationEnabled: false,
          title: route.params.unit.category,
        })}
      />
      <Stack.Screen
        name="MeasurementUnitsStackNavigator"
        component={MeasurementUnitsStackNavigator}
        options={{ animationEnabled: false, headerShown: false }}
      />
    </Stack.Navigator>
  );
}
