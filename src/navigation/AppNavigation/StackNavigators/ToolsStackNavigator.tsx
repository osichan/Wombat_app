import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ToolsScreen from "../../../screens/app/home/tool/AllToolsScreen";
import FreeToolsScreen from "../../../screens/app/home/tool/FreeToolsScreen";
import TakenToolsScreen from "../../../screens/app/home/tool/TakenToolsScreen";
import AnotherToolsScreen from "../../../screens/app/home/tool/AnotherToolsScreen";
import SupplyTabBar from "../../../components/navigation/SupplyTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddToolScreen from "../../../screens/app/home/tool/AddToolScreen";
import ToolScreen from "../../../screens/app/home/tool/ToolScreen";
import { ToolProps } from "../../../types/Types";
import EditToolScreen from "../../../screens/app/home/tool/EditToolScreen";
import KeyboardVisibility from "../../../components/KeyboardVisibilityCheck";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ToolStack = createStackNavigator<ToolScreenParamListBase>();
const EditToolStack = createStackNavigator<EditToolScreenParamListBase>();
const AddToolStack = createStackNavigator<AddToolScreenParamListBase>();

type ToolScreenParamListBase = {
  ToolScreen: { tool: ToolProps };
};

type EditToolScreenParamListBase = {
  EditToolScreen: { tool: ToolProps };
};

type AddToolScreenParamListBase = {
  AddToolScreen: { category?: string; warehouse?: string };
};

export default function () {
  return (
    <Stack.Navigator
      screenOptions={{
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
        name="ConsumableTabNavigator"
        component={ToolTabNavigator}
        options={{ animationEnabled: false, title: "Інструменти" }}
      />
      <AddToolStack.Screen
        name="AddToolScreen"
        component={AddToolScreen}
        options={{
          headerShown: !KeyboardVisibility(),
          animationEnabled: false,
          title: "Створення інструменту",
        }}
      />
      <ToolStack.Screen
        name="ToolScreen"
        component={ToolScreen}
        options={({ route }) => ({
          animationEnabled: false,
          title:
            route.params.tool.category === null
              ? "Інструмент без категорії"
              : route.params.tool.category,
        })}
      />
      <EditToolStack.Screen
        name="EditToolScreen"
        component={EditToolScreen}
        options={{
          headerShown: !KeyboardVisibility(),
          animationEnabled: false,
          title: "Редагування інструменту",
        }}
      />
    </Stack.Navigator>
  );
}
const ToolTabNavigator = () => {
  const tabs = [
    {
      name: "AllToolsScreen",
      label: "Всі",
      component: ToolsScreen,
    },
    {
      name: "FreeToolsScreen",
      label: "Вільні",
      component: FreeToolsScreen,
    },
    {
      name: "TakenToolsScreen",
      label: "Взяті",
      component: TakenToolsScreen,
    },
    {
      name: "AnotherToolsScreen",
      label: "Інші",
      component: AnotherToolsScreen,
    },
  ];

  return (
    <Tab.Navigator
      tabBar={(props) => <SupplyTabBar {...props} numberOfTabs={4} />}
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabs.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.name}
            component={_.component}
            options={{
              tabBarLabel: _.label,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
