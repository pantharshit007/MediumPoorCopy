const BASE_URL = import.meta.env.VITE_BASE_URL + "api/v1";

export const authEndPoint = {
  SIGNUP: BASE_URL + "/signup",
  LOGIN: BASE_URL + "/login",
  LOGOUT: BASE_URL + "/logout",
};

export const blogEndPoint = {
  CREATE_BLOG: BASE_URL + "/blog/create",
  UPDATE_BLOG: BASE_URL + "/blog/update", //:id
  ALL_BLOG: BASE_URL + "/blog/bulk",
  GET_BLOG: BASE_URL + "/blog", //:id
  USER_BLOG: BASE_URL + "/blog/@me",
  DELETE_BLOG: BASE_URL + "/blog/delete", //:id
};
