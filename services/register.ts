import { api } from "./api";

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export async function registerUser(data: RegisterData) {
  console.log("REGISTRO>>>>>");

  const response = await api.post("/usuarios", data);
  console.log(response.data);

  return response.data;
}
