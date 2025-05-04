"use server";

import { api } from "../api";

export async function listEstacoes() {
  const response = await api.get("/estacoes");

  return response.data;
}
