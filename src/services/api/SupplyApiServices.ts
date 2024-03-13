import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";
import { ConsumableUnitProps, CurrentlyAtProps } from "../../types/Types";

type SupplyPropsNonChanged = {
  id: number;
  name: string;
  description: string;
  category: string;

  currently_at: CurrentlyAtProps;
  article?: string;

  measured_by?: string;
};

type NonChangedConsumableUnitProps = {
  id: number;
  name: string;
  category: string;
  measured_by: string;
  description: string;
};

type requestToGetAllConsumablesByQueryProps = {
  byWhat: "warehouse" | "special_status" | "category" | "search";
  queryValue: string;
};

const requestToGetSupplyByCategoryId = async (id: number) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/categories/${id}/items/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: SupplyPropsNonChanged) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,

        currentlyAt: item.currently_at,
        article: item.article,

        measuredBy: item.measured_by,
      };
    });
    return data;
  }
  return result;
};

const requestToGetConsumableUnitByCategoryName = async (name: string) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/consumables/?search=${name}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: NonChangedConsumableUnitProps) => {
      return {
        id: item.id,
        name: item.name,
        category: item.category,
        measuredBy: item.measured_by,
        description: item.description,
      };
    });
    return data;
  }
  return result;
};

const requestToGetToolsByToolName = async (name: string) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/tools/?name=${name}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: SupplyPropsNonChanged) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,

        currentlyAt: item.currently_at,
        article: item.article,

        measuredBy: item.measured_by,
      };
    });
    return data;
  }
  return result;
};
const requestToGetToolsByQuery = async ({
  byWhat,
  queryValue,
}: requestToGetAllConsumablesByQueryProps) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/tools/?${byWhat}=${queryValue}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: SupplyPropsNonChanged) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,

        currentlyAt: item.currently_at,
        article: item.article,

        measuredBy: item.measured_by,
      };
    });
    return data;
  }
  return result;
};

export {
  requestToGetSupplyByCategoryId,
  requestToGetToolsByToolName,
  requestToGetToolsByQuery,
  requestToGetConsumableUnitByCategoryName,
};
