"use client";

import { api } from "../api";

interface LoginProps {
  email: string;
  senha: string;
}

export async function login(loginData: LoginProps) {
  try {
    const response = await api.post("/auth/login", loginData);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {}
}
