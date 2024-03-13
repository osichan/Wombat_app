import React from "react";
import Svg, { Path } from "react-native-svg";
import { ColorValue, StyleProp, ViewStyle } from "react-native";

interface SvgProjectIconProps {
  style?: StyleProp<ViewStyle>;
  fill: ColorValue;
}

export default function SvgProjectIcon({ style, fill }: SvgProjectIconProps) {
  return (
    <Svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={style}>
      <Path
        d="M7.5135 9H12V15H9V18H12V19.5H9V22.5H12V31.5H7.5135C5.85 31.5 4.5 30.06 4.5 28.275V12.225C4.5 10.443 5.853 9 7.5135 9Z"
        fill={fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5135 4.5C14.853 4.5 13.5 5.8395 13.5 7.4925V31.5H28.4865C29.2827 31.5019 30.0473 31.188 30.6122 30.627C31.177 30.066 31.4964 29.3037 31.5 28.5075V7.4925C31.5 5.8395 30.1515 4.5 28.4865 4.5H16.5135ZM21 10.5H18V13.5H21V10.5ZM21 15H18V18H21V15ZM21 19.5H18V22.5H21V19.5ZM24 24H21V28.5H24V24ZM27 10.5H24V13.5H27V10.5ZM27 15H24V18H27V15ZM27 19.5H24V22.5H27V19.5Z"
        fill={fill}
      />
    </Svg>
  );
}
