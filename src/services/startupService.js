import axios from "axios";

const API = "http://127.0.0.1:8000/api/startups";

export const getStartups = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getStartupById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};