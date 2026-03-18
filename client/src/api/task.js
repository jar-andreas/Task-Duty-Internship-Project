import axiosClient from "../utils/axiosClient";

export const createTask = async ({ formData, accessToken }) => {
  return await axiosClient.post("/task/create", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getMyTasks = async (accessToken) => {
  return await axiosClient.get("/task/getmytasks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSingleTask = async (id, accessToken) => {
  return await axiosClient.get(`/task/get/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateTask = async ( id, taskData, accessToken ) => {
  return await axiosClient.patch(`/task/update/${id}`, taskData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTask = async ({ id, accessToken }) => {
  return await axiosClient.delete(`/task/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
