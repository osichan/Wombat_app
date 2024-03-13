import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";

import { SpecialStatusProps } from "../../types/Types";

const requestToGetAllStatuses = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/supplies/statuses/`,
  });

  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToAddSpecialStatus = async (information: string) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/supplies/statuses/`,
    body: { information },
  });

  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToUpdateSpecialStatuses = async (
  specialStatus: SpecialStatusProps
) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/supplies/statuses/${specialStatus.id}/`,
    body: {
      information: specialStatus.information,
    },
  });

  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToDeleteSpecialStatuses = async (
  specialStatus: SpecialStatusProps
) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/supplies/statuses/${specialStatus.id}/`,
  });

  return await defaultTry({ config, responseReturn: "true" });
};

export {
  requestToGetAllStatuses,
  requestToAddSpecialStatus,
  requestToUpdateSpecialStatuses,
  requestToDeleteSpecialStatuses,
};
