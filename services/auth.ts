import axios from "axios";

export const register = async (email: string, password: string, name: string) => {
  const res = await axios.post("/api/auth", { action: "register", email, password, name });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await axios.post("/api/auth", { action: "login", email, password });
  return res.data;
};
