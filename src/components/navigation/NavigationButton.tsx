
import React from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";

interface NavigationButtonProps {
  navigation: any;
  whereToNavigate: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const NavigationButton = ({
  whereToNavigate,
  children,
  style,
  navigation,
}: NavigationButtonProps) => {
  const navigateToScreen = () => {
    if (whereToNavigate) {
      navigation.navigate(whereToNavigate);
    }
  };

  return (
    <TouchableOpacity style={[style]} onPress={navigateToScreen}>
      {children}
    </TouchableOpacity>
  );
};

export default NavigationButton;
