import React from "react";
import { View, Text } from "react-native";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { NavigationState } from "@react-navigation/native";

import { phoneWidth } from "../ScreenInfo";

interface TabBarProps {
  state: NavigationState;
  descriptors: { [key: string]: any };
  navigation: any;
  numberOfTabs: number;
  dataToSend?: any;
  dataNameToSend?: string;
}

const SupplyTabBar = ({
  state,
  descriptors,
  navigation,
  numberOfTabs,
  dataNameToSend,
  dataToSend,
}: TabBarProps) => {
  const TabBarWidth = phoneWidth / numberOfTabs;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, {
                [dataNameToSend ? dataNameToSend : ""]: dataToSend,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableWithoutFeedback
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              key={`${index}--${route.key}`}
            >
              <View style={styles.innerView}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.iconText,
                    { width: TabBarWidth },
                    isFocused
                      ? { color: "white" }
                      : { color: "rgba(255, 255, 255, 0.60)" },
                  ]}
                >
                  {label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#313131",
    position: "absolute",
    width: "100%",
  },
  tabButton: {
    flex: 1,
  },
  innerView: {
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 34,
  },
  iconText: {
    textAlign: "center",
    marginTop: "auto",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
});
export default SupplyTabBar;
