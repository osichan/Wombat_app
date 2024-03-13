import SupplyTabBar from "../../../components/navigation/SupplyTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WarehouseProps } from "../../../types/Types";
import ToolsInWarehouseScreen from "../../../screens/app/warehouse/supplyInWarehouse/ToolsInWarehouseScreen";
import ConsumablesInWarehousScreen from "../../../screens/app/warehouse/supplyInWarehouse/ConsumablesInWarehousScreen";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../redux/reducers/userInfoReducer";

const Tab = createBottomTabNavigator();

type SupplyInWarehouseTabNavigatorProps = {
  navigation: any;
  route: RouteProp<Record<string, { warehouse: WarehouseProps }>, string>;
};

const SupplyInWarehouseTabNavigator = ({
  navigation,
  route,
}: SupplyInWarehouseTabNavigatorProps) => {
  const userPermissions = useSelector(selectUserInfo)?.permissionIds;
  let tabs: {
    name: string;
    label: string;
    component: React.ComponentType<any>;
  }[] = [];
  if (userPermissions.includes(20)) {
    tabs.push({
      name: "ConsumablesInWarehousScreen",
      label: "матеріали",
      component: ConsumablesInWarehousScreen,
    });
  }
  if (userPermissions.includes(24)) {
    tabs.push({
      name: "ToolsInWarehouseScreen",
      label: "інструменти",
      component: ToolsInWarehouseScreen,
    });
  }

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <SupplyTabBar
          {...props}
          numberOfTabs={tabs.length}
          dataNameToSend="warehouse"
          dataToSend={route.params.warehouse}
        />
      )}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 34,
        },
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

export default SupplyInWarehouseTabNavigator;
