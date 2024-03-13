import { MeasurementUnitProps } from "../../types/Types";
import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";

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
export { requestToGetAllMeasurementUnits };
