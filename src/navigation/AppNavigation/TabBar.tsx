import React, { useEffect, useRef, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import { StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { NavigationState } from "@react-navigation/native";

import { phoneWidth } from "../../components/ScreenInfo";
import TabBarIcon from "./TabBarIcon";

interface TabBarProps {
  state: NavigationState;
  descriptors: { [key: string]: any };
  navigation: any;
  numberOfTabs: number;
}

const ANIMATED_PART_HEIGHT = 3;

const TabBar = ({
  state,
  descriptors,
  navigation,
  numberOfTabs,
}: TabBarProps) => {
  const [tabBarWidth, setTabBarWidth] = useState(100);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const animationHorizontalValue = useRef(new Animated.Value(0)).current;

  const animate = (index: number) => {
    Animated.spring(animationHorizontalValue, {
      toValue: index * tabBarWidth,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (numberOfTabs !== 0) {
      setTabBarWidth(phoneWidth / numberOfTabs);
    }
  }, [numberOfTabs]);

  useEffect(() => {
    animate(state.index);
  }, [state.index]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedWrapper, { width: tabBarWidth }]}>
        <Animated.View
          style={[
            styles.animatedView,
            {
              width: tabBarWidth,
              transform: [{ translateX: animationHorizontalValue }],
            },
          ]}
        />
      </Animated.View>

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
              navigation.navigate(route.name);
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
                <TabBarIcon
                  color={isFocused ? "white" : "black"}
                  name={route.name}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.iconText,
                    {
                      color: isFocused ? "white" : "black",
                      width: tabBarWidth,
                    },
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
    borderTopColor: "gray",
    borderTopWidth: 0.5,
    backgroundColor: "#5EC396",
    bottom: 0,
  },
  tabButton: {
    flex: 1,
  },
  innerView: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  iconText: {
    textAlign: "center",
    marginBottom: 0,
    marginTop: "auto",
    fontWeight: "600",
  },
  animatedView: {
    height: ANIMATED_PART_HEIGHT,
    backgroundColor: "white",
  },
  animatedWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TabBar;
