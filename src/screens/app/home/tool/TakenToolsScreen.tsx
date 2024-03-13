import React from "react";
import ToolsScreenComponent from "../../../../components/app/home/supply/tool/ToolsScreenComponent";

export default function TakenToolsScreen({ navigation }: any) {
  return <ToolsScreenComponent navigation={navigation} groupByField="OP" />;
}
