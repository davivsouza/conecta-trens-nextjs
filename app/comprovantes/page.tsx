"use client";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { listLinhas } from "@/services/linha/list-linhas";
import { listEstacoes } from "@/services/estacao/list-estacoes";
import { emitirComprovante } from "@/services/comprovante/emitir-comprovante";
import { useAuthContext } from "@/hooks/useAuthContext";
import { listarComprovanteByUserId } from "@/services/comprovante/listar-comprovantes-by-id";

export default function Comprovantes() {
  const [linhas, setLinhas] = useState([]);
  const [estacoes, setEstacoes] = useState([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState<number | null>(
    null
  );
  const [motivoAtraso, setMotivoAtraso] = useState("");
  const [comprovantes, setComprovantes] = useState<any[]>([]);
  const { user } = useAuthContext();
  useEffect(() => {
    async function fetchData() {
      const linhasData = await listLinhas();
      const estacoesData = await listEstacoes();
      const comprovantesData = await listarComprovanteByUserId(user.usuario_id);

      setLinhas(linhasData);
      setEstacoes(estacoesData);
      setComprovantes(comprovantesData);
    }
    fetchData();
  }, [user.usuario_id]);

  async function handleEmitirComprovante() {
    if (!linhaSelecionada || !estacaoSelecionada) {
      toast.error("Selecione uma linha e uma estação.");
      return;
    }

    const novo = await emitirComprovante({
      motivo_atraso: motivoAtraso,
      usuario_id: user.usuario_id,
      linha_id: linhaSelecionada,
      estacao_id: estacaoSelecionada,
    });

    if (novo) {
      toast.success("Comprovante emitido com sucesso!");
      setEstacaoSelecionada(null);
      setLinhaSelecionada(null);
      setMotivoAtraso("");
    }
  }

  function formatDate(isoDate: string): string {
    const date = new Date(isoDate);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // meses começam do 0
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  return (
    <>
      <Header isContact />
      <main className="w-full max-w-[1000px] mx-auto mt-[130px] flex flex-col gap-8 px-4 pb-20">
        <h1 className="text-2xl font-semibold">Emissão de Comprovantes</h1>

        {/* Formulário de seleção */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="atraso" className="font-medium mb-2">
              Motivo do Atraso <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="atraso"
              id="atraso"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              placeholder="Digite o motivo do atraso do trem"
              onChange={(ev) => setMotivoAtraso(ev.target.value)}
            />
            <label htmlFor="linha" className="font-medium mb-1 mt-2">
              Linha <span className="text-red-600">*</span>
            </label>
            <select
              id="linha"
              className="p-3 border border-gray-300 rounded-lg"
              value={linhaSelecionada ?? ""}
              onChange={(e) => setLinhaSelecionada(Number(e.target.value))}
            >
              <option value="">Selecione uma linha</option>
              {linhas.map((linha: any) => (
                <option key={linha.linha_id} value={linha.linha_id}>
                  {linha.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="estacao" className="font-medium mb-1">
              Estação <span className="text-red-600">*</span>
            </label>
            <select
              id="estacao"
              className="p-3 border border-gray-300 rounded-lg"
              value={estacaoSelecionada ?? ""}
              onChange={(e) => setEstacaoSelecionada(Number(e.target.value))}
            >
              <option value="">Selecione uma estação</option>
              {estacoes.map((estacao: any) => (
                <option key={estacao.estacao_id} value={estacao.estacao_id}>
                  {estacao.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-black text-white rounded-full px-6 py-3 font-semibold w-fit mt-2"
            onClick={handleEmitirComprovante}
          >
            Emitir Comprovante
          </button>
        </div>

        {/* Lista de comprovantes */}
        <section aria-label="Lista de comprovantes por linha">
          {comprovantes.length === 0 && (
            <p>Nenhum comprovante emitido ainda.</p>
          )}

          {comprovantes.length > 0 && (
            <>
              <h2 className="my-8 text-lg font-bold">Comprovantes Emitidos</h2>
              {comprovantes.map((comp: any, index: number) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[30px] bg-gray-200 mb-6"
                >
                  <div
                    className={`flex items-center p-6 gap-4 bg-[#a5a8a8]`} // cor fixa ou você pode mapear por linha
                    role="heading"
                    aria-level={2}
                  >
                    <strong className="text-white text-2xl">
                      {comp.linha?.nome ?? "Linha Desconhecida"}
                    </strong>
                  </div>
                  <div className="flex flex-col gap-6 p-6">
                    <div
                      className="flex justify-between flex-wrap gap-4"
                      role="article"
                    >
                      <p>
                        <strong>Situação: </strong>
                        <span>
                          Comprovante gerado às{" "}
                          {formatDate(comp.data_emissao) ?? "00:00"} -{" "}
                          {comp.estacao?.nome}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 cursor-pointer text-[#75a702] hover:underline">
                        <Download /> <span>Comprovante</span>
                      </div>
                    </div>
                    <div className="w-full h-[2px] bg-gray-300"></div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold">Motivo do atraso:</p>
                      <p>{comp.motivo_atraso}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
