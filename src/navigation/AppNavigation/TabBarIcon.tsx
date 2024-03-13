import React from "react";
import { ColorValue, View } from "react-native";

import SvgHomeIcon from "../../../assets/svg/SvgHomeIcon";
import SvgProjectIcon from "../../../assets/svg/SvgProjectIcon";
import SvgWarehouseIcon from "../../../assets/svg/SvgWarehouseIcon";
import SvgMenuIcon from "../../../assets/svg/SvgMenuIcon";

type TabBarIconProps = {
  name: string;
  color: ColorValue;
};

export default function TabBarIcon({ name, color }: TabBarIconProps) {
  if (name === "HomeStack") {
    return <SvgHomeIcon fill={color} />;
  } else if (name === "ProjectStack") {
    return <SvgProjectIcon fill={color} />;
  } else if (name === "WarehouseStack") {
    return <SvgWarehouseIcon fill={color} />;
  } else if (name === "MenuStack") {
    return <SvgMenuIcon fill={color} />;
  }
  return (
    <View
      style={{
        backgroundColor: color,
        height: 30,
        width: 30,
        borderRadius: 1000,
      }}
    />
  );
}
