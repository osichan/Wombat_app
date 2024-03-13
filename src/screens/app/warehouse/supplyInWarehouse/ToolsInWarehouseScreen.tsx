import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import SupplyInWarehouseComponent from "../../../../components/app/warehouse/SupplyInWarehouseComponent";
import { WarehouseProps } from "../../../../types/Types";

type ToolsInWarehousScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { warehouse: WarehouseProps }>, string>;
};

const ToolsInWarehousScreen = ({
  navigation,
  route,
}: ToolsInWarehousScreenProps) => {
  return (
    <SupplyInWarehouseComponent
      navigation={navigation}
      warehouseName={route.params && route.params.warehouse.name}
      type="T"
    />
  );
};

export default ToolsInWarehousScreen;
