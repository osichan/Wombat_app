import { ToolProps } from "../../types/Types";
import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";
import { CurrentlyAtProps } from "../../types/Types";

type requestToAddToolProps = {
  name: string;
  article: string;
  description: string;
  category: string;
  warehouse: string;
};

type NonChangedToolProps = {
  id: number;
  name: string;
  article: string;
  description: string;
  category: string;
  currently_at: CurrentlyAtProps;
};

type requestToGetAllToolsByQueryProps = {
  byWhat: "warehouse" | "special_status" | "category" | "search";
  queryValue: string;
};

type requestToTransferToolProps =
  | {
      id: number;
      warehouse: string;
    }
  | {
      id: number;
      special_status: string;
    }
  | {
      id: number;
      project: number;
      owner: number;
    };

const requestToGetAllTools = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/tools/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;

    const dataToReturn = data.map((element: NonChangedToolProps) => ({
      id: element.id,
      name: element.name,
      article: element.article,
      description: element.description,
      category: element.category,
      currentlyAt: element.currently_at,
    }));
    return dataToReturn;
  }
  return result;
};

const requestToAddTool = async (tool: requestToAddToolProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/supplies/tools/`,
    body: {
      name: tool.name,
      article: tool.article,
      description: tool.description,
      category: tool.category,
      warehouse: tool.warehouse,
    },
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    return {
      id: data.id,
      name: data.name,
      article: data.article,
      description: data.description,
      category: data.category,
      currentlyAt: data.currently_at,
    };
  }
  return result;
};

const requestToDeleteTool = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/tools/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateTool = async (tool: ToolProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/supplies/tools/${tool.id}/`,
    body: {
      id: tool.id,
      name: tool.name,
      article: tool.article,
      description: tool.description,
      category: tool.category,
      currently_at: tool.currentlyAt,
    },
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    return {
      id: data.id,
      name: data.name,
      article: data.article,
      description: data.description,
      category: data.category,
      currentlyAt: data.currently_at,
    };
  }
  return result;
};
const requestToGetAllToolsByQuery = async ({
  byWhat,
  queryValue,
}: requestToGetAllToolsByQueryProps) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/tools/?${byWhat}=${queryValue}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;

    const dataToReturn = data.map((element: NonChangedToolProps) => ({
      id: element.id,
      name: element.name,
      article: element.article,
      description: element.description,
      category: element.category,
      currentlyAt: element.currently_at,
    }));
    return dataToReturn;
  }
  return result;
};

const requestToTransferTool = async (body: requestToTransferToolProps) => {
  const config = await tokenConfig({
    method: "PATCH",
    endPoint: `/supplies/tools/transfer/${body.id}/`,
    body,
    ContentType: "multipart/form-data;",
  });
  return await defaultTry({ config, responseReturn: "true" });
};

export {
  requestToGetAllTools,
  requestToAddTool,
  requestToDeleteTool,
  requestToUpdateTool,
  requestToGetAllToolsByQuery,
  requestToTransferTool,
};
