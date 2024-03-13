import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";

const requestToPermissionsLoad = async () => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/load/permissions/`,
    AUTH: false,
  });
  return await defaultTry({ config, responseReturn: "true" });
};
export default requestToPermissionsLoad;
