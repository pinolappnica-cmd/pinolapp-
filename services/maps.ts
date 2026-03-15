import axios from "axios";

export const getRoute = async (origin: string, destination: string) => {
  const res = await axios.get(`/api/maps?origin=${origin}&destination=${destination}`);
  return res.data;
};
