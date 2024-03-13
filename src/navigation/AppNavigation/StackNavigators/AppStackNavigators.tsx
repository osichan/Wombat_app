import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";

import RoleStack from "./RoleStackNavigator";

import HomeScreen from "../../../screens/app/home/HomeScreen";
import ConsumablesStackNavigator from "./ConsumablesStackNavigator";
import PersonStackNavigator from "./PersonStackNavigator";
import ToolsStackNavigator from "./ToolsStackNavigator";

import AddNewWarehouseScreen from "../../../screens/app/warehouse/AddNewWarehouseScreen";
import EditWarehouseScreen from "../../../screens/app/warehouse/EditWarehouseScreen";
import WarehouseScreen from "../../../screens/app/warehouse/WarehouseScreen";
import SupplyInWarehouseTabNavigator from "./SupplyInWarehouseNavigator";

import ActiveProjectsScreen from "../../../screens/app/project/ActiveProjectsScreen";
import NotActiveProjectsScreen from "../../../screens/app/project/NotActiveProjectScreen";

import MenuScreen from "../../../screens/app/menu/MenuScreen";
import AddProjectScreen from "../../../screens/app/project/AddProjectScreen";
import BrigadesStackNavigator from "./BrigadesStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import SupplyCategoriyStack from "./SupplyCategoryStack";
import SupplyHistoryNavigator from "./SupplyHistoryNavigator";

import ProjectSettingsButton from "../../../components/app/project/ProjectSettingsButton";
import EditProjectScreen from "../../../screens/app/project/EditProjectScreen";
import ProjectNotesScreen from "../../../screens/app/project/ProjectNotesScreen";
import ProjectScreen from "../../../screens/app/project/ProjectScreen";
import ProjectTaskNavigator from "./ProjectTaskNavigator";

import KeyboardVisibility from "../../../components/KeyboardVisibilityCheck";
import PermissionCheck from "../../../components/app/PermissionCheck";
import { ProjectProps, WarehouseProps } from "../../../types/Types";
import SpecialStatusStackNavigator from "./SpecialStatusStackNavigator";

const Stack = createStackNavigator();

const ProjectScreenStack =
  createStackNavigator<ProjectScreenStackParamListBase>();
const EditProjectScreenStack =
  createStackNavigator<EditProjectScreenParamListBase>();
const EditWarehouseStack = createStackNavigator<EditWarehouseParamListBase>();
const ProjectNotesStack =
  createStackNavigator<ProjectNotesScreenParamListBase>();
const SupplyInWarehouseTabNavigatorStack =
  createStackNavigator<SupplyInWarehouseTabNavigatorParamListBase>();

type EditWarehouseParamListBase = {
  EditWarehouseScreen: { warehouse: WarehouseProps };
};
type ProjectScreenStackParamListBase = {
  ProjectScreen: { project: ProjectProps };
};
type EditProjectScreenParamListBase = {
  EditProjectScreen: { project: ProjectProps };
};
type ProjectNotesScreenParamListBase = {
  ProjectNotesScreen: { project: ProjectProps };
};
type SupplyInWarehouseTabNavigatorParamListBase = {
  SupplyInWarehouseTabNavigator: { warehouse: WarehouseProps };
};

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="PersonStackNavigator"
        component={PersonStackNavigator}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ToolsStackNavigator"
        component={ToolsStackNavigator}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ConsumablesStackNavigator"
        component={ConsumablesStackNavigator}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}
export function WarehouseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WarehouseScreen"
        component={WarehouseScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="AddNewWarehouseScreen"
        component={AddNewWarehouseScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <EditWarehouseStack.Screen
        name="EditWarehouseScreen"
        component={EditWarehouseScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
      <SupplyInWarehouseTabNavigatorStack.Screen
        name="SupplyInWarehouseTabNavigator"
        component={SupplyInWarehouseTabNavigator}
        options={({ route }) => {
          return {
            title: route.params.warehouse.name,
            headerBackgroundContainerStyle: {
              backgroundColor: "#313131",
              alignItems: "center",
            },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 24,
              fontWeight: "600",
            },
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
          };
        }}
      />
    </Stack.Navigator>
  );
}
export function ProjectStack() {
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
        name="ActiveProjectsScreen"
        component={ActiveProjectsScreen}
        options={{
          animationEnabled: false,
          title: "Активні Обʼєкти",
          headerBackImage: () => null,
        }}
      />
      <Stack.Screen
        name="NotActiveProjectsScreen"
        component={NotActiveProjectsScreen}
        options={{
          animationEnabled: false,
          title: "Закриті Обʼєкти",
          headerBackImage: () => null,
        }}
      />
      <Stack.Screen
        name="AddProjectScreen"
        component={AddProjectScreen}
        options={{
          headerShown: !KeyboardVisibility(),
          animationEnabled: false,
          title: "Створення обʼєкту",
        }}
      />
      <ProjectScreenStack.Screen
        name="ProjectScreen"
        component={ProjectScreen}
        options={({ navigation, route }) => {
          return {
            animationEnabled: false,
            headerBackgroundContainerStyle: {
              backgroundColor: "#313131",
              alignItems: "center",
            },
            headerStyle: {
              height: 130,
            },
            title: "",
            headerRight: () => (
              <PermissionCheck permissionsToBeVisible={[9]}>
                <ProjectSettingsButton
                  navigation={navigation}
                  project={route.params.project}
                  whereToNavigate="EditProjectScreen"
                />
              </PermissionCheck>
            ),
          };
        }}
      />
      <EditProjectScreenStack.Screen
        name="EditProjectScreen"
        component={EditProjectScreen}
        options={{
          animationEnabled: false,
          title: "Редагування обʼєкту",
        }}
      />
      <ProjectNotesStack.Screen
        name="ProjectNotesScreen"
        component={ProjectNotesScreen}
        options={{
          animationEnabled: false,
          title: "Нотатки по обʼєкту",
        }}
      />
      <Stack.Screen
        name="ProjectTaskNavigator"
        component={ProjectTaskNavigator}
        options={{
          animationEnabled: false,
          header: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
}
export function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="RoleStack"
        component={RoleStack}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SupplyCategoriyStack"
        component={SupplyCategoriyStack}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SupplyHistoryNavigator"
        component={SupplyHistoryNavigator}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="BrigadesStackNavigator"
        component={BrigadesStackNavigator}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SpecialStatusStackNavigator"
        component={SpecialStatusStackNavigator}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
}
