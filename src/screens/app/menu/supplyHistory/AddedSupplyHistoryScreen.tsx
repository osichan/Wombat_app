import { RouteProp } from "@react-navigation/native";
import React from "react";

import ConsumableHistoryScreenComponent from "../../../../components/app/menu/history/ConsumableHistoryScreenComponent";

type AddedSupplyHistoryScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { type: "T" | "C" }>, string>;
};

const AddedSupplyHistoryScreen = ({
  navigation,
  route,
}: AddedSupplyHistoryScreenProps) => {
  return (
    <ConsumableHistoryScreenComponent
      filterByAction="C"
      type={route.params.type}
    />
  );
};

export default AddedSupplyHistoryScreen;
