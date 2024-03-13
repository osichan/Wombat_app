import React from "react";
import ConsumablesScreenComponent from "../../../../components/app/home/supply/consumables/ConsumablesScreenComponent";

export default function FreeConsumablesScreen({ navigation }: any) {
  return (
    <ConsumablesScreenComponent navigation={navigation} groupByField="WH" />
  );
}
