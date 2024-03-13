import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";

type AuthProps = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  companyDomain?: string;
  companyName?: string;
};
const requestToRegisterOwner = async ({
  email,
  firstName,
  lastName,
  password,
  phoneNumber,
}: AuthProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/register/owner/`,
    domain: email?.split("@")[1],
    body: {
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: `+380${phoneNumber}`,
      password,
    },
    AUTH: false,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToRegisterCompany = async ({
  companyDomain,
  companyName,
}: AuthProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/register/company/`,
    domain: companyDomain,
    body: {
      domain: companyDomain,
      company: companyName,
    },
    AUTH: false,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToSignIn = async ({ email, password }: AuthProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/login/`,
    domain: email?.split("@")[1],
    body: {
      email,
      password,
    },
    AUTH: false,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

export { requestToRegisterOwner, requestToRegisterCompany, requestToSignIn };
