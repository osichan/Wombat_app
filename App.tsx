import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Loading from "./src/screens/Loading";
import AuthNavigator from "./src/navigation/AuthNavigation/AuthNavigator";
import AppTabNavigator from "./src/navigation/AppNavigation/AppTabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ConnectionAlertProvider } from "./src/components/ConnectionAlertProvider";
import { LogBox } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["VirtualizedLists should never"]);
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Provider store={store}>
        <ConnectionAlertProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Loading"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="Loading"
                component={Loading}
                options={{ animationEnabled: true }}
              />
              <Stack.Screen
                name="AuthNavigator"
                component={AuthNavigator}
                options={{ animationEnabled: false }}
              />
              <Stack.Screen
                name="AppTabNavigator"
                component={AppTabNavigator}
                options={{
                  animationEnabled: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ConnectionAlertProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
