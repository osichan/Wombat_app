import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SupplyTabBar from "../../../components/navigation/SupplyTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AllSupplyHistoryScreen from "../../../screens/app/menu/supplyHistory/AllSupplyHistoryScreen";
import AddedSupplyHistoryScreen from "../../../screens/app/menu/supplyHistory/AddedSupplyHistoryScreen";
import ReturnedSupplyHistoryScreen from "../../../screens/app/menu/supplyHistory/ReturnedSupplyHistoryScreen";
import TakeSupplyHistoryScreen from "../../../screens/app/menu/supplyHistory/TakeSupplyHistoryScreen";
import ChooseHistoryScreen from "../../../screens/app/menu/supplyHistory/ChooseHistoryScreen";
import { RouteProp } from "@react-navigation/native";

const Stack = createStackNavigator();
const ToolTabNavigatorStack =
  createStackNavigator<ToolTabNavigatorParamListBase>();
const Tab = createBottomTabNavigator();

type ToolTabNavigatorProps = {
  route: RouteProp<Record<string, { type: "T" | "C" }>, string>;
};
type ToolTabNavigatorParamListBase = {
  ConsumableTabNavigator: { type: "T" | "C" };
};

export default function () {
  return (
    <Stack.Navigator
      initialRouteName={"ChooseHistoryScreen"}
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
        name="ChooseHistoryScreen"
        component={ChooseHistoryScreen}
        options={{ animationEnabled: false, title: "" }}
      />
      <ToolTabNavigatorStack.Screen
        name="ConsumableTabNavigator"
        component={ToolTabNavigator}
        options={({ route }) => ({
          animationEnabled: false,
          title: route.params.type === "T" ? "Інструменти" : "Матеріали",
        })}
      />
    </Stack.Navigator>
  );
}
const ToolTabNavigator = ({ route }: ToolTabNavigatorProps) => {
  const tabs = [
    {
      name: "AddedSupplyHistoryScreen",
      label: route.params.type === "T" ? "створили" : "додали",
      component: AddedSupplyHistoryScreen,
    },
    {
      name: "TakeSupplyHistoryScreen",
      label: "взяли",
      component: TakeSupplyHistoryScreen,
    },
    {
      name: "ReturnedSupplyHistoryScreen",
      label: "повернули",
      component: ReturnedSupplyHistoryScreen,
    },
    {
      name: "AllSupplyHistoryScreen",
      label: "усі",
      component: AllSupplyHistoryScreen,
    },
  ];

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <SupplyTabBar
          {...props}
          numberOfTabs={4}
          dataNameToSend="type"
          dataToSend={route.params.type}
        />
      )}
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
