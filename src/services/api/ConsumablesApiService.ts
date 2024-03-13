import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";
import { CurrentlyAtProps } from "../../types/Types";

type requestToAddConsumableProps =
  | {
      consumable: number;
      unit_quantity: number;
      warehouse: string;
    }
  | {
      consumable: number;
      unit_quantity: number;
      owner: number;
      project: number;
    }
  | {
      consumable: number;
      unit_quantity: number;
      special_status: string;
    };

type nonChangedConsumabelProps = {
  id: number;
  name: string;
  description: string;
  unit_quantity: number;
  measured_by: string;
  category: string;
  currently_at: CurrentlyAtProps;
};

type requestToUpdateToolProps = {
  id: number;
  name: string;
  description: string;
  unit_quantity: number;
  measured_by: string;
  category: string;
  currently_at: CurrentlyAtProps;
};

type requestToTransferConsumableProps =
  | {
      id: number;
      unit_quantity: number;
      warehouse: string;
    }
  | {
      id: number;
      unit_quantity: number;
      special_status: string;
    }
  | {
      id: number;
      unit_quantity: number;
      project: number;
      owner: number;
    };
type requestToSpendConsumablesProps = {
  id: number;
  unit_quantity: number;
};
type requestToGetAllConsumablesByQueryProps = {
  byWhat: "warehouse" | "special_status" | "category" | "search";
  queryValue: string;
};

const requestToGetAllConsumables = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/consumables/taken/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as nonChangedConsumabelProps[];

    const dataToReturn = data.map((element) => ({
      id: element.id,
      name: element.name,
      description: element.description,
      unitQuantity: element.unit_quantity,
      measuredBy: element.measured_by,
      category: element.category,
      currentlyAt: element.currently_at,
    }));
    return dataToReturn;
  }
  return result;
};

const requestToAddConsumable = async (body: requestToAddConsumableProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/supplies/consumables/taken/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as nonChangedConsumabelProps;
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      unitQuantity: data.unit_quantity,
      measuredBy: data.measured_by,
      category: data.category,
      currentlyAt: data.currently_at,
    };
  }
  return result;
};

const requestToDeleteConsumable = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/consumables/taken/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateConsumable = async (body: requestToUpdateToolProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/supplies/consumables/taken/${body.id}/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as nonChangedConsumabelProps;
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      unitQuantity: data.unit_quantity,
      measuredBy: data.measured_by,
      category: data.category,
      currentlyAt: data.currently_at,
    };
  }
  return result;
};

const requestToTransferConsumable = async (
  body: requestToTransferConsumableProps
) => {
  const config = await tokenConfig({
    method: "PATCH",
    endPoint: `/supplies/consumables/transfer/${body.id}/`,
    body,
    ContentType: "multipart/form-data;",
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToGetAllConsumablesBySearch = async (serachText: string) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/consumables/taken/?search=${serachText}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as nonChangedConsumabelProps[];

    const dataToReturn = data.map((element) => ({
      id: element.id,
      name: element.name,
      description: element.description,
      unitQuantity: element.unit_quantity,
      measuredBy: element.measured_by,
      category: element.category,
      currentlyAt: element.currently_at,
    }));
    return dataToReturn;
  }
  return result;
};

const requestToSpendConsumables = async (
  body: requestToSpendConsumablesProps
) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/consumables/${body.id}/spend/`,
    body,
  });
  return await defaultTry({ config, responseReturn: "true" });
};
const requestToGetAllConsumablesByQuery = async ({
  byWhat,
  queryValue,
}: requestToGetAllConsumablesByQueryProps) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/consumables/taken/?${byWhat}=${queryValue}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as nonChangedConsumabelProps[];

    const dataToReturn = data.map((element) => ({
      id: element.id,
      name: element.name,
      description: element.description,
      unitQuantity: element.unit_quantity,
      measuredBy: element.measured_by,
      category: element.category,
      currentlyAt: element.currently_at,
    }));
    return dataToReturn;
  }
  return result;
};

export {
  requestToGetAllConsumables,
  requestToAddConsumable,
  requestToDeleteConsumable,
  requestToUpdateConsumable,
  requestToTransferConsumable,
  requestToGetAllConsumablesBySearch,
  requestToSpendConsumables,
  requestToGetAllConsumablesByQuery,
};
