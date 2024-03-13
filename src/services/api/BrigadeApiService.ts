import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";
import { BrigadeProps } from "../../types/Types";

type NotChangedBrigadeProps = {
  id: number;
  name: string;
  description: string;
  foreman: {
    id: number;
    full_name: string;
  };
  staff: {
    id: number;
    full_name: string;
  }[];
};

type requestToAddBrigadeProps = {
  name: string;
  description: string;
  foreman: number;
  staff: number[];
};

type requestToUpdateBrigadeProps = {
  id: number;
  name: string;
  description: string;
  foreman: number;
};
const requestToGetAllBrigades = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/brigades/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data.map((brigade: NotChangedBrigadeProps) => ({
      ...brigade,
      foreman: { id: brigade.foreman.id, fullName: brigade.foreman.full_name },
    }));
  }
  return result;
};

const requestToAddBrigade = async (body: requestToAddBrigadeProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/brigades/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToDeleteBigade = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/brigades/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdateBrigade = async (body: requestToUpdateBrigadeProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/brigades/${body.id}/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToAddStaffToBrigade = async (body: BrigadeProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/brigades/${body.id}/staff/add/`,
    body,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToDeletePersonFromStaffToBrigade = async (body: BrigadeProps) => {
  const config = await tokenConfig({
    method: "PATCH",
    endPoint: `/brigades/${body.id}/staff/remove/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data;
  }
  return result;
};

const requestToGetBrigadesBySearch = async (searchText: string) => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/brigades/?search=${searchText}`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    return result.data.map((brigade: NotChangedBrigadeProps) => ({
      ...brigade,
      foreman: { id: brigade.foreman.id, fullName: brigade.foreman.full_name },
      staff: brigade.staff.map((staffPerson) => ({
        id: staffPerson.id,
        fullName: staffPerson.full_name,
      })),
    }));
  }
  return result;
};

export {
  requestToGetAllBrigades,
  requestToAddBrigade,
  requestToDeleteBigade,
  requestToUpdateBrigade,
  requestToAddStaffToBrigade,
  requestToDeletePersonFromStaffToBrigade,
  requestToGetBrigadesBySearch,
};
