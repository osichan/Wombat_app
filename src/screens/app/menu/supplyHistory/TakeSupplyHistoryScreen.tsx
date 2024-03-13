import { RouteProp } from "@react-navigation/native";
import React from "react";
import ConsumableHistoryScreenComponent from "../../../../components/app/menu/history/ConsumableHistoryScreenComponent";

type TakeSupplyHistoryScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { type: "T" | "C" }>, string>;
};

const TakeSupplyHistoryScreen = ({
  navigation,
  route,
}: TakeSupplyHistoryScreenProps) => {
  return (
    <ConsumableHistoryScreenComponent
      filterByAction="U"
      updateType="Взято"
      type={route.params.type}
    />
  );
};

export default TakeSupplyHistoryScreen;
