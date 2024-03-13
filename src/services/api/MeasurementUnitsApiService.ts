import { MeasurementUnitProps } from "../../types/Types";
import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";

type requestToAddMeasurementUnitProps = {
  name: string;
};

const requestToGetAllMeasurementUnits = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/units/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as MeasurementUnitProps[];
  }
  return result;
};

const requestToAddMeasurementUnit = async (
  body: requestToAddMeasurementUnitProps
) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/supplies/units/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as MeasurementUnitProps;
  }
  return result;
};

const requestToDeleteMeasurementUnit = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/units/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateMeasurementUnit = async (body: MeasurementUnitProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/supplies/units/${body.id}/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as MeasurementUnitProps;
  }
  return result;
};

export {
  requestToGetAllMeasurementUnits,
  requestToAddMeasurementUnit,
  requestToDeleteMeasurementUnit,
  requestToUpdateMeasurementUnit,
};
