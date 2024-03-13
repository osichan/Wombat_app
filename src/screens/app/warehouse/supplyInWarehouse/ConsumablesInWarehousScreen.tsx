import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import SupplyInWarehouseComponent from "../../../../components/app/warehouse/SupplyInWarehouseComponent";
import { WarehouseProps } from "../../../../types/Types";

type ConsumablesInWarehousScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { warehouse: WarehouseProps }>, string>;
};

const ConsumablesInWarehousScreen = ({
  navigation,
  route,
}: ConsumablesInWarehousScreenProps) => {
  return (
    <SupplyInWarehouseComponent
      navigation={navigation}
      warehouseName={route.params && route.params.warehouse.name}
      type="C"
    />
  );
};

export default ConsumablesInWarehousScreen;
