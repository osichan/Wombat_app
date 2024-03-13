import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";

type changePasswordProps = {
  id: number;
  current_password: string;
  new_password: string;
};
const requestToChangeOwnPassword = async (body: changePasswordProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/profile/password/change/`,
    body,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

export { requestToChangeOwnPassword };
