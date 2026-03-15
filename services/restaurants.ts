import axios from "axios";

export const getRestaurants = async (categoryId?: number) => {
  const url = categoryId ? `/api/restaurants?categoryId=${categoryId}` : "/api/restaurants";
  const res = await axios.get(url);
  return res.data;
};
