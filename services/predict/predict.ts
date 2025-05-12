"use server";

import axios from "axios";

export interface Predict {
  dia_semana: number;
  hora: number;
  impacto_climatico: number;
  evento_simplificado: number;
}

export async function predict(data: Predict) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/predict",
    data
  );
  return response.data;
}
