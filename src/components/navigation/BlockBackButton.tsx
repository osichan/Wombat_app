import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

const BlockBackButton = () => {
  useFocusEffect(
    React.useCallback(() => {
      const disableBackButton = () => true;
      BackHandler.addEventListener("hardwareBackPress", disableBackButton);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
      };
    }, [])
  );
};

export default BlockBackButton;
