'use client'
import { estacoes } from "@/components/linhas-form";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
  showClockAndLocal: "local" | "clock";
}

export function ShowClockAndLocal({ showClockAndLocal }: Props) {
  const router = useRouter();
  const stationRef = useRef<HTMLSelectElement>(null);

  function searchStationWhereUserGoTo() {
    if (stationRef.current?.value.length === 0) {
      return;
    }
    if (stationRef.current?.value) {
      router.push(`/estacoes?station=${stationRef.current.value}`);
    }
  }

  return (
    <>
      {showClockAndLocal === "local" && (
        <div className="flex z-20 absolute right-0 top-[125px]">
          <form
            className="hidden md:flex  bg-white  h-[55px] w-[317px] items-center rounded-[50px] relative "
            role="search"
          >
            <select
              id="estacao-busca"
              ref={stationRef}
              aria-label="Selecione a estação"
              defaultValue=""
              className="w-full p-3 bg-transparent text-black border-none outline-none text-[17px]"
            >
              <option value="" disabled>
                Qual estação você vai?
              </option>
              {estacoes.map((estacao) => (
                <option key={estacao.id} value={estacao.name}>
                  {estacao.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center text-white absolute right-[2px]"
              aria-label="Buscar estação"
              onClick={searchStationWhereUserGoTo}
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      )}

      {showClockAndLocal === "clock" && (
        <div className="w-[320px] absolute right-0 top-[104px] rounded-[20px] bg-gradient-to-b from-white/20 to-white/30 p-[12px_20px_20px] flex flex-col gap-3">
          <div className="max-w-[120px] w-full h-[2px] bg-white rounded-full mx-auto" />
          <div className="bg-white rounded-[20px] p-4">
            <strong>Durante a semana</strong>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="text-xs text-[#515151]">Abre ás</span>
                <p className="font-medium">04:00</p>
              </div>
              <div>
                <span className="text-xs text-[#515151]">Intervalo</span>
                <p className="text-xs text-center rounded-[20px] bg-[#c3ff3d] px-2 py-1">
                  5min
                </p>
              </div>
              <div>
                <span className="text-xs text-[#515151]">Fecha ás</span>
                <p className="font-medium">00:00</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-4">
            <strong>Final de semana e feriado</strong>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="text-xs text-[#515151]">Abre ás</span>
                <p className="font-medium">04:40</p>
              </div>
              <div>
                <span className="text-xs text-[#515151]">Intervalo</span>
                <p className="text-xs text-center rounded-[20px] bg-[#c3ff3d] px-2 py-1">
                  15min
                </p>
              </div>
              <div>
                <span className="text-xs text-[#515151]">Fecha ás</span>
                <p className="font-medium">00:00</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}