import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";

type NonChangedConsumableUnitProps = {
  id: number;
  name: string;
  measured_by: string;
  category: string;
  description: string;
};

type AddConsumableUnitProps = {
  name: string;
  measured_by: string;
  category: string;
  description: string;
};

const requestToGetAllConsumableUnits = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/consumables/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as NonChangedConsumableUnitProps[];

    const dataToReturn = data.map((element) => ({
      id: element.id,
      name: element.name,
      description: element.description,
      measuredBy: element.measured_by,
      category: element.category,
    }));
    return dataToReturn;
  }
  return result;
};

const requestToAddConsumableUnit = async (body: AddConsumableUnitProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/supplies/consumables/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as NonChangedConsumableUnitProps;
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      measuredBy: data.measured_by,
      category: data.category,
    };
  }
  return result;
};

const requestToDeleteConsumableUnit = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/consumables/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateConsumableUnit = async (
  body: NonChangedConsumableUnitProps
) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/supplies/consumables/${body.id}/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as NonChangedConsumableUnitProps;
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      measuredBy: data.measured_by,
      category: data.category,
    };
  }
  return result;
};

export {
  requestToGetAllConsumableUnits,
  requestToAddConsumableUnit,
  requestToDeleteConsumableUnit,
  requestToUpdateConsumableUnit,
};
