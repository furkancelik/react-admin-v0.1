import axios from "axios";
export const URL = "http://localhost:5000/";
const endPoint = "graphql";

export const API_URL = `${URL}${endPoint}`;

export const PUBLIC_DIR = (path = "") => {
  return `${URL + path.slice(9)}`;
};

export const API = params => `${URL + endPoint}?${params}`;
export const API_POST = `${URL + endPoint}`;
export const PUBLIC_URL = url => `${URL}${url.substr(9)}`;

export const FETCH_GET = async (query, token = false) => {
  return await axios.get(API(query), { headers: buildHeaders(token) });
};

export const FILE_UPLOAD = async (formData, config) => {
  return await axios({
    baseURL: `${URL}file-upload`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
export const FETCH_POST = async ({ query, variables }, token = false) => {
  return await axios.post(
    API_URL,
    {
      query,
      variables
    },
    { headers: buildHeaders(token) }
  );
};

const buildHeaders = (token = false) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `${token}`;

  return headers;
};
