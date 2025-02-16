import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Download } from "lucide-react";

const linhas = [
  { linha: "Linha 4 - Amarela", cor: "bg-[#efba00]" },
  { linha: "Linha 8 - Diamante", cor: "bg-[#949488]" },
  { linha: "Linha 9 - Esmeralda", cor: "bg-[#009896]" },
];

export default function Comprovantes() {
  return (
    <>
      <Header isContact />
      <main className="w-full max-w-[1000px] mx-auto mt-[130px] flex flex-col gap-6 px-4">
        <section aria-label="Lista de comprovantes por linha">
          {linhas.map(({ linha, cor }, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[30px] bg-gray-200 mb-6"
            >
              <div
                className={`flex items-center p-6 gap-4 ${cor}`}
                role="heading"
                aria-level={2}
              >
                <strong className="text-white text-2xl">{linha}</strong>
              </div>
              <div className="flex flex-col gap-6 p-6">
                <div
                  className="flex justify-between flex-wrap gap-4"
                  role="article"
                >
                  <p>
                    <strong>Situação: </strong>
                    <span aria-label="Status do comprovante">
                      Comprovante de ocorrência - {linha} - Gerado às 16:11
                    </span>
                  </p>
                  <div className="flex items-center gap-2 cursor-pointer text-[#75a702] hover:underline">
                    <Download /> <span>Comprovante</span>
                  </div>
                </div>
                <div className="w-full h-[2px] bg-gray-300"></div>
              </div>
            </div>
          ))}
          {/* <div className="overflow-hidden rounded-[30px] bg-gray-200">
            <div className="flex items-center p-6 gap-4 bg-teal-600">
              <strong className="text-white text-2xl">
                Linha 9 - Esmeralda
              </strong>
            </div>
            <div className="flex flex-col gap-6 p-6">
              <p>Sem nenhuma ocorrência até o momento</p>
              <div className="w-full h-[2px] bg-gray-300"></div>
            </div>
          </div> */}
        </section>
      </main>
      <Footer />
    </>
  );
}
