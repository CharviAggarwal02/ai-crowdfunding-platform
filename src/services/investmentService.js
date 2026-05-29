import API from "./api";

export const invest = async (campaign_name, amount) => {
  const response = await API.post("/investments/invest", {
    campaign_name,
    amount,
  });

  return response.data;
};