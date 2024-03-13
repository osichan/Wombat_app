import React from "react";
import Svg, { Path } from "react-native-svg";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";

interface SvgAddIconProps {
  style: StyleProp<ViewStyle>;
  color?: ColorValue;
  width?: number;
  height?: number;
}

export default function SvgAddIcon({
  style,
  color = "#5EC396",
  width = 45,
  height = 45,
}: SvgAddIconProps) {
  return (
    <View style={[style]}>
      <Svg width={width} height={height} viewBox="0 0 45 45">
        <Path
          d="M22.5 4L22.5 41"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <Path
          d="M4 22.5H41"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
