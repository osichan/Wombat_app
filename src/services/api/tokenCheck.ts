import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";

type NonChangedUserInfo = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  description: string | null;
  is_loaned: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  telegram_id: number | null;
  permission_ids: number[];
};

const tokenCheck = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/profile/`,
  });

  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as NonChangedUserInfo;
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      phoneNumber: data.phone_number,
      role: data.role,
      description: data.description,
      isLoaned: data.is_loaned,
      isStaff: data.is_staff,
      isSuperuser: data.is_superuser,
      telegramId: data.telegram_id,
      permissionIds: data.permission_ids,
    };
  }
  return result;
};

export { tokenCheck };
