import { getDataAsync } from "../../storage/Async";
import { COMPANY_DOMAIN_KEY } from "../../utils/constants/asyncStorageKeys";
import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";

const requestToCheckDomain = async () => {
  const domain = await getDataAsync({ key: COMPANY_DOMAIN_KEY });

  if (!domain) {
    return false;
  }
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/company/${domain.replace(".", "-")}`,
    domain: "",
  });

  return await defaultTry({ config, responseReturn: "true" });
};

export { requestToCheckDomain };
