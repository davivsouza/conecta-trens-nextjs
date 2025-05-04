import { api } from "../api";

export async function listLinhas() {
  const response = await api.get("/linhas");
  return response.data;
}
