import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";

type ProjectTaskPropsNonChanged = {
  id: number;
  name: string;
  description: string;
  task_status: "A" | "O" | "D";
  show_to_client: boolean;
};

type requestToAddProjectStatusProps = {
  name: string;
  description: string;
  task_status: "A" | "O" | "D";
  show_to_client: boolean;
  projectId: number;
};

type requestToUpdateProjectStatusProps = {
  id: number;
  name: string;
  description: string;
  task_status: "A" | "O" | "D";
  show_to_client: boolean;
  projectId: number;
};

const requestToGetAllTasksOfProject = async (projectId: number) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/projects/${projectId}/tasks`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data.map((item: ProjectTaskPropsNonChanged) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        taskStatus: item.task_status,
        showToClient: item.show_to_client,
      };
    });
    return data;
  }
  return result;
};

const requestToAddProjectStatus = async (
  body: requestToAddProjectStatusProps
) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/projects/${body.projectId}/tasks/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToUpdateProjectStatus = async (
  body: requestToUpdateProjectStatusProps
) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/projects/${body.projectId}/tasks/${body.id}/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

export {
  requestToGetAllTasksOfProject,
  requestToAddProjectStatus,
  requestToUpdateProjectStatus,
};
