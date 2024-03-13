import { WarehouseProps } from "../../types/Types";
import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";

type addWarehouseProps = {
  name: string;
  address: string;
  description: string;
};

const requestToGetAllWareHouses = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/warehouses/`,
  });

  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToAddWarehouse = async ({
  name,
  address,
  description,
}: addWarehouseProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/supplies/warehouses/`,
    body: {
      name,
      address,
      description,
    },
  });

  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToUpdateWarehouse = async (warehouse: WarehouseProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/supplies/warehouses/${warehouse.id}/`,
    body: {
      name: warehouse.name,
      address: warehouse.address,
      description: warehouse.description,
    },
  });

  return await defaultTry({ config, responseReturn: "true" });
};

const requestToDeleteWarehouse = async (warehouse: WarehouseProps) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/warehouses/${warehouse.id}/`,
  });

  return await defaultTry({ config, responseReturn: "true" });
};

export {
  requestToGetAllWareHouses,
  requestToAddWarehouse,
  requestToUpdateWarehouse,
  requestToDeleteWarehouse,
};
