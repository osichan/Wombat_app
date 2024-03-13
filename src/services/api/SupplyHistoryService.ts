import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";
import { CurrentlyAtProps } from "../../types/Types";

type RequestToGetAllHistoryByQueryParamsProps = {
  type: "T" | "C";
  queryString: string;
};

type RequestToGetAllHistoryByTypeAndActionProps = {
  type: "T" | "C";
  action: "C" | "U" | "D" | "A";
  name?: string;
};

type ToolHistoryPropsNotChanged = {
  id: number;
  caused_by: string;
  timestamp: string;
  related_object: {
    name: string;
    currently_at: CurrentlyAtProps;
  };
  status: "Взято" | "Додано" | "Повернено" | "Витрачено";
};

type SupplyHistoryPropsNotChanged = {
  id: number;
  caused_by: string;
  timestamp: string;
  related_object: {
    name: string;
    currently_at: CurrentlyAtProps;
    unit_quantity: number;
  };
  status: "Взято" | "Додано" | "Повернено" | "Витрачено";
};

const requestToGetAllHistoryByTypeAndAction = async ({
  type,
  action,
  name,
}: RequestToGetAllHistoryByTypeAndActionProps) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/history/?type=${type}&${
      action !== "A" ? `action=${action}&` : ""
    }${name !== "" && `object=${name}`}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    if (type === "T") {
      return result.data.map((element: ToolHistoryPropsNotChanged) => ({
        id: element.id,
        causedBy: element.caused_by,
        timestamp: element.timestamp,
        relatedObject: {
          name: element.related_object.name,
          currentlyAt: element.related_object.currently_at,
        },
        status: element.status,
      }));
    } else {
      return result.data.map((element: SupplyHistoryPropsNotChanged) => ({
        id: element.id,
        causedBy: element.caused_by,
        timestamp: element.timestamp,
        relatedObject: {
          name: element.related_object.name,
          unitQuantity: element.related_object.unit_quantity,
          currentlyAt: element.related_object.currently_at,
        },
        status: element.status,
      }));
    }
  }
  return result;
};

const requestToGetAllHistoryByQueryParams = async ({
  queryString,
  type,
}: RequestToGetAllHistoryByQueryParamsProps) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/history/?${queryString}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    if (type === "T") {
      return result.data.map((element: ToolHistoryPropsNotChanged) => ({
        id: element.id,
        causedBy: element.caused_by,
        timestamp: element.timestamp,
        relatedObject: {
          name: element.related_object.name,
          currentlyAt: element.related_object.currently_at,
        },
        status: element.status,
      }));
    } else {
      return result.data.map((element: SupplyHistoryPropsNotChanged) => ({
        id: element.id,
        causedBy: element.caused_by,
        timestamp: element.timestamp,
        relatedObject: {
          name: element.related_object.name,
          unitQuantity: element.related_object.unit_quantity,
          currentlyAt: element.related_object.currently_at,
        },
        status: element.status,
      }));
    }
  }
  return result;
};

export {
  requestToGetAllHistoryByTypeAndAction,
  requestToGetAllHistoryByQueryParams,
};
