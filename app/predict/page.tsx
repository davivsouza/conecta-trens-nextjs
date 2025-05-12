import { Header } from "@/components/header";
import { OccupancyPredictionForm } from "@/components/occupancy-prediction-form";

export default function PRedict() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <Header isContact/>
        <div className="max-w-4xl mx-auto  mt-24">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Previsão de Ocupação
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Utilize nossa ferramenta de previsão para estimar os níveis de
              ocupação com base em diversos fatores como dia da semana, hora e
              condições climáticas.
            </p>
          </div>

          <OccupancyPredictionForm />
        </div>
      </main>
    </>
  );
}
