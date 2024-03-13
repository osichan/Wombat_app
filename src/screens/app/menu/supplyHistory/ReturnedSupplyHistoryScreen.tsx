import { RouteProp } from "@react-navigation/native";
import React from "react";
import ConsumableHistoryScreenComponent from "../../../../components/app/menu/history/ConsumableHistoryScreenComponent";

type ReturnedSupplyHistoryScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { type: "T" | "C" }>, string>;
};

const ReturnedSupplyHistoryScreen = ({
  navigation,
  route,
}: ReturnedSupplyHistoryScreenProps) => {
  return (
    <ConsumableHistoryScreenComponent
      filterByAction="U"
      updateType="Повернено"
      type={route.params.type}
    />
  );
};

export default ReturnedSupplyHistoryScreen;
