import axios from "axios";

export const getDrivers = async (available?: boolean) => {
  const url = available !== undefined ? `/api/drivers?available=${available}` : "/api/drivers";
  const res = await axios.get(url);
  return res.data;
};
