import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";
import { RoleProps } from "../../types/Types";

type RoleApiProps = {
  name: string;
  permissions: number[];
  id?: number;
};
type loadDefaultRolesProps = {
  roles: string[];
};

const requestToGetAllRoles = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/roles/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToGetDefaultRoles = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/load/roles/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToAddRole = async (body: RoleApiProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/roles/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToDeleteRole = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/roles/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateRole = async (body: RoleApiProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/roles/${body.id}/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data as RoleProps;
  }
  return result;
};

const requestToLoadDefaultRoles = async (body: loadDefaultRolesProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/load/roles/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToGetPermissions = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/permissions/`,
  });

  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

export {
  requestToGetAllRoles,
  requestToGetDefaultRoles,
  requestToAddRole,
  requestToDeleteRole,
  requestToUpdateRole,
  requestToGetPermissions,
  requestToLoadDefaultRoles,
};
