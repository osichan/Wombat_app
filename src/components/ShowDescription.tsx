import React, { useEffect } from "react";
import { StyleSheet, Animated, StyleProp, ViewStyle, Text } from "react-native";

type ShowDescriptionProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>;
  text: string;
};

export default function ShowDescription({
  visible,
  setVisible,
  style,
  text,
}: ShowDescriptionProps) {
  const opacity = new Animated.Value(visible ? 1 : 0);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start(() => setVisible(false));
      }, 10000);
    }
  }, [visible]);

  if (visible) {
    return (
      <Animated.View style={[styles.container, { opacity: opacity }, style]}>
        <Text>{text}</Text>
      </Animated.View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    position: "absolute",
    width: 280,
    padding: 15,
    borderRadius: 10,
    zIndex: 10,
  },
});
