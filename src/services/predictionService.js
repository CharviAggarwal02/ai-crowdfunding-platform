import API from "./api";

export const predictCampaign = async (data) => {
  const response = await API.post("/predict", data);
  return response.data;
};