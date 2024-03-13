import React from "react";
import Svg, { Path } from "react-native-svg";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";

interface SvgMenuIconProps {
  style?: StyleProp<ViewStyle>;
  fill: ColorValue;
}

export default function SvgMenuIcon({ style, fill }: SvgMenuIconProps) {
  return (
    <Svg width="36" height="36" viewBox="0 0 36 36" style={style}>
      <Path d="M6 27H30" stroke={fill} strokeWidth="5" strokeLinecap="round" />
      <Path d="M6 18H30" stroke={fill} strokeWidth="5" strokeLinecap="round" />
      <Path d="M6 9H30" stroke={fill} strokeWidth="5" strokeLinecap="round" />
    </Svg>
  );
}
