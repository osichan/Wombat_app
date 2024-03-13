import React from "react";
import Svg, { G, Path, Defs, Rect } from "react-native-svg";
import { ColorValue, StyleProp, ViewStyle } from "react-native";

interface SvgWarehouseIconProps {
  style?: StyleProp<ViewStyle>;
  fill: ColorValue;
}

export default function SvgWarehouseIcon({
  style,
  fill,
}: SvgWarehouseIconProps) {
  return (
    <Svg width="34" height="31" viewBox="0 0 34 31" style={style}>
      <G clip-path="url(#clip0_336_84)">
        <Path
          d="M32.894 17.1748H28.1948V22.8997L26.3152 21.6295L24.4355 22.8997V17.1748H19.7364C19.2195 17.1748 18.7966 17.6042 18.7966 18.1289V29.5788C18.7966 30.1036 19.2195 30.5329 19.7364 30.5329H32.894C33.4109 30.5329 33.8338 30.1036 33.8338 29.5788V18.1289C33.8338 17.6042 33.4109 17.1748 32.894 17.1748ZM10.3381 13.3582H23.4957C24.0126 13.3582 24.4355 12.9288 24.4355 12.404V0.954155C24.4355 0.42937 24.0126 0 23.4957 0H18.7966V5.72493L16.9169 4.45471L15.0373 5.72493V0H10.3381C9.8212 0 9.39828 0.42937 9.39828 0.954155V12.404C9.39828 12.9288 9.8212 13.3582 10.3381 13.3582ZM14.0974 17.1748H9.39828V22.8997L7.51863 21.6295L5.63897 22.8997V17.1748H0.939828C0.422923 17.1748 0 17.6042 0 18.1289V29.5788C0 30.1036 0.422923 30.5329 0.939828 30.5329H14.0974C14.6143 30.5329 15.0373 30.1036 15.0373 29.5788V18.1289C15.0373 17.6042 14.6143 17.1748 14.0974 17.1748Z"
          fill={fill}
        />
      </G>
      <Defs>
        <Rect width={41} height={37} fill={fill} />
      </Defs>
    </Svg>
  );
}
