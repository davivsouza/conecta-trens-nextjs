import { api } from "../api";

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export async function registerUser(data: RegisterData) {

  const response = await api.post("/usuarios", data);

  return response.data;
}
