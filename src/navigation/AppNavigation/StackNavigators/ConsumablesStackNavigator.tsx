import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import FreeConsumablesScreen from "../../../screens/app/home/consumable/FreeConsumablesScreen";
import TakenConsumablesScreen from "../../../screens/app/home/consumable/TakenConsumablesScreen";
import AnotherConsumablesScree from "../../../screens/app/home/consumable/AnotherConsumablesScreen";
import SupplyTabBar from "../../../components/navigation/SupplyTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConsumableScreen from "../../../screens/app/home/consumable/ConsumableScreen";
import { ConsumableProps } from "../../../types/Types";
import AddConsumableScreen from "../../../screens/app/home/consumable/AddConsumableScreen";
import SpendConsumableScreen from "../../../screens/app/home/consumable/SpendConsumableScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ConsumableStack = createStackNavigator<ConsumableScreenParamListBase>();
const AddConsumableStack =
  createStackNavigator<AddConsumableScreenParamListBase>();
const SpendProjectScreenStack =
  createStackNavigator<SpendConsumableScreenTabNavigatorParamListBase>();

type ConsumableScreenParamListBase = {
  ConsumableScreen: { consumable: ConsumableProps };
};

type AddConsumableScreenParamListBase = {
  AddConsumableScreen: {
    consumable?: ConsumableProps;
    unit?: string;
    warehouse?: string;
    specialStatus?: string;
    project?: number;
    owner?: number;
  };
};
type SpendConsumableScreenTabNavigatorParamListBase = {
  SpendConsumableScreen: { consumable: ConsumableProps };
};

export default function ConsumablesStackNavigator() {
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
        component={ConsumableTabNavigator}
        options={{ animationEnabled: false, title: "Матеріали" }}
      />
      <ConsumableStack.Screen
        name="ConsumableScreen"
        component={ConsumableScreen}
        options={({ route }) => ({
          animationEnabled: false,
          title:
            route.params.consumable.currentlyAt.type === "OP"
              ? route.params.consumable.currentlyAt.data.project.name
              : route.params.consumable.currentlyAt.data,
        })}
      />
      <AddConsumableStack.Screen
        name="AddConsumableScreen"
        component={AddConsumableScreen}
        options={{ animationEnabled: false, title: "Додавання матеріалу" }}
      />
      <SpendProjectScreenStack.Screen
        name="SpendConsumableScreen"
        component={SpendConsumableScreen}
        options={{
          animationEnabled: false,
          title: "Витрачення матеріалу",
        }}
      />
    </Stack.Navigator>
  );
}
const ConsumableTabNavigator = () => {
  const tabs = [
    {
      name: "FreeConsumablesScreen",
      label: "Вільні",
      component: FreeConsumablesScreen,
    },
    {
      name: "TakenConsumablesScreen",
      label: "Взяті",
      component: TakenConsumablesScreen,
    },
    {
      name: "AnotherConsumablesScree",
      label: "Інші",
      component: AnotherConsumablesScree,
    },
  ];

  return (
    <Tab.Navigator
      tabBar={(props) => <SupplyTabBar {...props} numberOfTabs={3} />}
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
