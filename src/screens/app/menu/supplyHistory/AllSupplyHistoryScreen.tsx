import { RouteProp } from "@react-navigation/native";
import React from "react";
import ConsumableHistoryScreenComponent from "../../../../components/app/menu/history/ConsumableHistoryScreenComponent";

type AllSupplyHistoryScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { type: "T" | "C" }>, string>;
};

const AllSupplyHistoryScreen = ({
  navigation,
  route,
}: AllSupplyHistoryScreenProps) => {
  return (
    <ConsumableHistoryScreenComponent
      filterByAction="A"
      type={route.params.type}
    />
  );
};

export default AllSupplyHistoryScreen;
