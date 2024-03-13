import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";
import { SupplyCategoryProps } from "../../types/Types";

type CategoryProps = {
  id?: number;
  name: string;
  type: "T" | "C";
  description: string;
};

const requestToGetAllCategories = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/categories/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToAddCategory = async (category: CategoryProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/supplies/categories/`,
    body: {
      name: category.name,
      type: category.type,
      description: category.description,
    },
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as SupplyCategoryProps;
  }
  return result;
};

const requestToDeleteCategory = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/categories/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateCategory = async (category: CategoryProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/supplies/categories/${category.id}/`,
    body: {
      name: category.name,
      type: category.type,
      description: category.description,
    },
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as SupplyCategoryProps;
  }
  return result;
};

const requestToGetAllToolCategories = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/categories/?type=T`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as SupplyCategoryProps[];
  }
  return result;
};

const requestToGetAllConsumableCategories = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/categories/?type=C`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as SupplyCategoryProps[];
  }
  return result;
};

export {
  requestToGetAllCategories,
  requestToAddCategory,
  requestToDeleteCategory,
  requestToUpdateCategory,
  requestToGetAllToolCategories,
  requestToGetAllConsumableCategories,
};
