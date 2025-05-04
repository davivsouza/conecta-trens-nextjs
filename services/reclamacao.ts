"use server";
import { api } from "./api";

export interface ReclamacaoData {
  tipo: string;
  descricao: string;
  status: string;
  usuario_id: number;
  linha_id: number;
  estacao_id: number;
}

export async function makeReclamacao(data: ReclamacaoData) {
  console.log(data);
  const response = await api.post("/reclamacoes", data);
  console.log("RECLAMACAO >>>>", response.data);

  return response.data;
}
