import axios from "axios";

const axiosInstance = axios.create();

interface ApiConnection {
  method: string;
  URL: string;
  bodyData?: object;
  headers?: object;
  params?: object | string;
}

export const apiConnector = ({
  method,
  URL,
  bodyData,
  headers,
  params,
}: ApiConnection) => {
  return axiosInstance({
    method: method,
    url: URL,
    data: bodyData || undefined,
    headers: headers || undefined,
    params: params || undefined,
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error("> Error: " + err.message);
      throw err;
    });
};
