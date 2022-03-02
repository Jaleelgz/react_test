import axios from "axios";

const baseURL = "http://54.253.29.55/api/stores";

export async function getData(url) {
  const response = await axios.get(url ? url : baseURL);
  if (!response) {
    return null;
  }
  return response;
}
