import { Dimensions, Platform, StatusBar } from "react-native";

export const phoneHeight = Dimensions.get("window").height;
export const phoneWidth = Dimensions.get("window").width;
export const statusBarHeight =
  Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
