import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "./TabBar";
import {
  HomeStack,
  WarehouseStack,
  ProjectStack,
  MenuStack,
} from "./StackNavigators/AppStackNavigators";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/reducers/userInfoReducer";

const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
  const userPermissions = useSelector(selectUserInfo)?.permissionIds;
  const [numberOfTabs, setNumberOfTabs] = useState(0);
  const tabs = [
    {
      name: "HomeStack",
      label: "головна",
      permissionsToBeVisible: [4, 24, 20],
      component: HomeStack,
    },
    {
      name: "ProjectStack",
      label: "обʼєкти",
      permissionsToBeVisible: [8],
      component: ProjectStack,
    },
    {
      name: "WarehouseStack",
      label: "склади",
      permissionsToBeVisible: [12],
      component: WarehouseStack,
    },
    {
      name: "MenuStack",
      label: "меню",
      permissionsToBeVisible: "all",
      component: MenuStack,
    },
  ];
  useEffect(() => {
    let count = 0;
    tabs.forEach((tab) => {
      if (areAllNumbersInFirstArray(tab.permissionsToBeVisible)) {
        count++;
      }
    });
    setNumberOfTabs(count);
  }, [userPermissions]);
  const areAllNumbersInFirstArray = (permissionRequired: number[] | string) => {
    if (typeof permissionRequired === "string") {
      return true;
    }
    for (const number of permissionRequired) {
      if (userPermissions?.includes(number)) {
        return true;
      }
    }
    return false;
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar numberOfTabs={numberOfTabs} {...props} />}
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabs.map((_, index) => {
        if (areAllNumbersInFirstArray(_.permissionsToBeVisible)) {
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
        }
      })}
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
