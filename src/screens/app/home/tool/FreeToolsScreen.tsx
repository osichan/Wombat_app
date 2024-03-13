import React from "react";
import ToolsScreenComponent from "../../../../components/app/home/supply/tool/ToolsScreenComponent";

export default function AnotherToolsScreen({ navigation }: any) {
  return <ToolsScreenComponent navigation={navigation} groupByField="WH" />;
}
