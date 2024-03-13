import tokenConfig from "../../utils/helpers/tokenConfig";
import defaultTry from "../../utils/helpers/defaultTry";

type addPersonProps = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  phoneNumber: string;
};

type updatePersonProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  isLoaned: boolean;
};

type UpdatePersonPasswordProps = {
  id: number;
  password: string;
};

const requestToGetAllPersones = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/people/`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    const dataToReturn = data.map(
      (element: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        phone_number: string;
        is_loaned: boolean;
      }) => ({
        id: element.id,
        email: element.email,
        firstName: element.first_name,
        lastName: element.last_name,
        role: element.role,
        phoneNumber: element.phone_number,
        isLoaned: element.is_loaned,
      })
    );
    return dataToReturn;
  }

  return result;
};

const requestToAddPerson = async (person: addPersonProps) => {
  const config = await tokenConfig({
    method: "POST",
    endPoint: `/register/`,
    body: {
      email: person.email,
      first_name: person.firstName,
      last_name: person.lastName,
      role: person.role,
      password: person.password,
      phone_number: `+380${person.phoneNumber}`,
    },
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
      phoneNumber: data.phone_number,
      isLoaned: data.is_loaned,
    };
  }
  return result;
};

const requestToDeletePerson = async (id: number) => {
  const config = await tokenConfig({
    method: "DELETE",
    endPoint: `/people/${id}/`,
  });
  return await defaultTry({ config, responseReturn: "true" });
};

const requestToUpdatePerson = async (person: updatePersonProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/people/${person.id}/`,
    body: {
      email: person.email,
      first_name: person.firstName,
      last_name: person.lastName,
      role: person.role,
      phone_number: `+380${person.phoneNumber}`,
      is_loaned: person.isLoaned,
    },
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
      phoneNumber: data.phone_number,
      isLoaned: data.is_loaned,
    };
  }
  return result;
};

const requestToUpdatePersonPassword = async ({
  password,
  id,
}: UpdatePersonPasswordProps) => {
  const config = await tokenConfig({
    method: "PUT",
    endPoint: `/people/${id}/`,
    body: {
      password,
    },
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      role: data.role,
      phoneNumber: data.phone_number,
      isLoaned: data.is_loaned,
    };
  }
  return result;
};

const requestToGetAllStaffPersons = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/people/staff/?all=true`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    const dataToReturn = data.map(
      (element: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        phone_number: string;
        is_loaned: boolean;
      }) => ({
        id: element.id,
        email: element.email,
        firstName: element.first_name,
        lastName: element.last_name,
        role: element.role,
        phoneNumber: element.phone_number,
        isLoaned: element.is_loaned,
      })
    );
    return dataToReturn;
  }

  return result;
};

const requestToGetAllСustomerPersons = async () => {
  const config = await tokenConfig({
    method: "GET",
    endPoint: `/people/?role__name=Замовник`,
  });
  const result = await defaultTry({ config, responseReturn: "response" });
  if (result && typeof result !== "boolean") {
    const data = result.data;
    const dataToReturn = data.map(
      (element: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        phone_number: string;
        is_loaned: boolean;
      }) => ({
        id: element.id,
        email: element.email,
        firstName: element.first_name,
        lastName: element.last_name,
        role: element.role,
        phoneNumber: element.phone_number,
        isLoaned: element.is_loaned,
      })
    );
    return dataToReturn;
  }

  return result;
};

export {
  requestToAddPerson,
  requestToDeletePerson,
  requestToGetAllPersones,
  requestToUpdatePerson,
  requestToUpdatePersonPassword,
  requestToGetAllStaffPersons,
  requestToGetAllСustomerPersons,
};
