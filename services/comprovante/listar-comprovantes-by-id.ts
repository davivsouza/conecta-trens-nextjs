"use server";

import { api } from "../api";

export async function listarComprovanteByUserId(id: number) {
  const response = await api.get(`/comprovantes/user/${id}`);

  return response.data;
}
