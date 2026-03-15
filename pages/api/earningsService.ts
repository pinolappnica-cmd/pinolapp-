import axios from "axios";

export const getEarnings = async () => {
  const res = await axios.get("/api/admin/earnings");
  return res.data;
};
