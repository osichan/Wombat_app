import API_IP from "../../utils/config/api";
import { AxiosRequestConfig } from "axios";
import { getDataAsync } from "../../storage/Async";
import {
  USER_TOKEN_KEY,
  COMPANY_DOMAIN_KEY,
} from "../constants/asyncStorageKeys";

type tokenConfigProps = {
  method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH";
  endPoint: string;
  body?: any;
  domain?: string;
  AUTH?: boolean;
  ContentType?: string;
};
const tokenConfig = async ({
  method,
  endPoint,
  body,
  domain,
  AUTH,
  ContentType,
}: tokenConfigProps): Promise<AxiosRequestConfig<any>> => {
  //---------------------------------local---------------------------------------\\
  // let headers;
  // const token = await getDataAsync({ key: USER_TOKEN_KEY });

  // if (!domain) {
  //   const asyncDomain = await getDataAsync({ key: COMPANY_DOMAIN_KEY });
  //   domain = asyncDomain;
  // }
  // const urlDomain = domain?.replace(".", "-");
  // if (AUTH !== false) {
  //   headers = {
  //     Host: urlDomain,
  //     Authorization: `Token ${token?.token}`,
  //   };
  // } else {
  //   headers = {
  //     Host: urlDomain,
  //   };
  // }
  // if (ContentType) {
  //   headers = { ...headers, "content-type": ContentType };
  // }

  // const config: AxiosRequestConfig = {
  //   url: `http://${API_IP}:8004${endPoint}`,
  //   method,
  //   headers,
  //   data: body,
  // };
  // return config;

  //----------------------------------wombase.online------------------------------------\\
  let headers;
  const token = await getDataAsync({ key: USER_TOKEN_KEY });

  if (domain === undefined) {
    const asyncDomain = await getDataAsync({ key: COMPANY_DOMAIN_KEY });
    domain = asyncDomain;
  }
  const urlDomain = domain?.replace(".", "-");
  if (AUTH !== false) {
    headers = {
      Authorization: `Token ${token?.token}`,
    };
  }
  if (ContentType) {
    headers = { ...headers, "content-type": ContentType };
  }

  const config: AxiosRequestConfig = {
    url: `https://${urlDomain}.wombase.online:8443${endPoint}`,
    method,
    headers,
    data: body,
  };
  return config;
};

export default tokenConfig;
