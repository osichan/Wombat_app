import defaultTry from "../../utils/helpers/defaultTry";
import tokenConfig from "../../utils/helpers/tokenConfig";

type RequestToAddRoleProps = {
  name: string;
  address: string;
  manager: number;
  client: number | null;
};

type RequestToGetProjectsBySearchProps = {
  search: string;
  isActive: boolean;
};

type ProjectPropsNonChanged = {
  id: number;
  name: string;
  address: string;
  manager: { full_name: string; id: number };
  notes: string;
  is_active: boolean;
  client: { full_name: string; id: number } | null;
};

type RequestToUpdateProjectProps = {
  id: number;
  name: string;
  address: string;

  manager: number;
  notes: string;
  isActive: boolean;
  client: number | null;
};

const requestToGetAllProjects = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/projects/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: ProjectPropsNonChanged) => {
      return {
        id: item.id,
        name: item.name,
        address: item.address,
        manager: {
          fullName: item.manager.full_name,
          id: item.manager.id,
        },
        notes: item.notes,
        isActive: item.is_active,
        client: item.client
          ? {
              fullName: item.client.full_name,
              id: item.client.id,
            }
          : null,
      };
    });
    return data;
  }
  return result;
};

const requestToAddProject = async (body: RequestToAddRoleProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/projects/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data as ProjectPropsNonChanged;
    return {
      id: data.id,
      name: data.name,
      address: data.address,
      manager: {
        fullName: data.manager.full_name,
        id: data.manager.id,
      },
      notes: data.notes,
      isActive: data.is_active,
      client: data.client
        ? {
            fullName: data.client.full_name,
            id: data.client.id,
          }
        : null,
    };
  }
  return result;
};

const requestToDeleteProject = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/projects/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateProject = async (body: RequestToUpdateProjectProps) => {
  if (!body.notes) {
    body.notes = "";
  }

  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/projects/${body.id}/`,
    body: {
      name: body.name,
      address: body.address,
      manager: body.manager,
      notes: body.notes,
      is_active: body.isActive,
      client: body.client,
    },
  });

  const result = await defaultTry({ config, responseReturn: "response" });

  if (result && typeof result !== "boolean") {
    const data = result.data;
    return {
      id: data.id,
      name: data.name,
      address: data.address,
      manager: {
        fullName: data.manager.full_name,
        id: data.manager.id,
      },
      notes: data.notes,
      isActive: data.is_active,
      client: data.client
        ? {
            fullName: data.client.full_name,
            id: data.client.id,
          }
        : null,
    };
  }
  return result;
};

const requestToGetProjectsBySearch = async ({
  search,
  isActive,
}: RequestToGetProjectsBySearchProps) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/projects/?search=${search}&is_active=${isActive}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: ProjectPropsNonChanged) => {
      return {
        id: item.id,
        name: item.name,
        address: item.address,
        manager: {
          fullName: item.manager.full_name,
          id: item.manager.id,
        },
        notes: item.notes,
        isActive: item.is_active,
        client: item.client
          ? {
              fullName: item.client.full_name,
              id: item.client.id,
            }
          : item.client,
      };
    });
    return data;
  }
  return result;
};

const requestToGetAllActiveUnActiveProjects = async (isActive: boolean) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/projects/?is_active=${isActive}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: ProjectPropsNonChanged) => {
      return {
        id: item.id,
        name: item.name,
        address: item.address,
        manager: {
          fullName: item.manager.full_name,
          id: item.manager.id,
        },
        notes: item.notes,
        isActive: item.is_active,
        client: item.client
          ? {
              fullName: item.client.full_name,
              id: item.client.id,
            }
          : null,
      };
    });
    return data;
  }
  return result;
};

export {
  requestToAddProject,
  requestToDeleteProject,
  requestToGetAllActiveUnActiveProjects,
  requestToGetAllProjects,
  requestToGetProjectsBySearch,
  requestToUpdateProject,
};
