import axios from "axios";

const API = "http://127.0.0.1:8000/api/analytics";

// Summary (alias for both names)
export const getSummary = async () => {
  const res = await axios.get(`${API}/summary`);
  return res.data;
};

// Category distribution
export const getCategoryDistribution = async () => {
  const res = await axios.get(`${API}/categories`);
  return res.data;
};

// Funding trend
export const getFundingTrend = async () => {
  const res = await axios.get(`${API}/funding-trend`);
  return res.data;
};

// Sector analytics
export const getSectors = async () => {
  const res = await axios.get(`${API}/sectors`);
  return res.data;
};

// Top projects
export const getTopProjects = async () => {
  const res = await axios.get(`${API}/top-projects`);
  return res.data;
};

// Recent investments
export const getRecentInvestments = async () => {
  const res = await axios.get(`${API}/recent-investments`);
  return res.data;
};

// Recent campaigns
export const getRecentCampaigns = async () => {
  const res = await axios.get(`${API}/recent`);
  return res.data;
};
