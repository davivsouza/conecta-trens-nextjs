"use server";

import { api } from "../api";

export interface ComprovanteBodyData {
  motivo_atraso: string;
  usuario_id: number;
  linha_id: number;
  estacao_id: number;
}

export async function emitirComprovante(body: ComprovanteBodyData) {
  const response = await api.post("/comprovantes", body);

  return response.data;
}
