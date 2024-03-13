import axios, { AxiosRequestConfig, AxiosError } from "axios";

type defaultTryProps = {
  config: AxiosRequestConfig<any>;
  responseReturn: "response" | "true";
};

const defaultTry = async ({ config, responseReturn }: defaultTryProps) => {
  try {
    const response = await axios(config);

    return responseReturn === "response" ? response : true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status && axiosError.response.status < 500) {
        return false;
      } else {
        return null;
      }
    } else {
      throw error;
    }
  }
};

export default defaultTry;
