"use client";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useState } from "react";
import {
  makeReclamacao,
  ReclamacaoData,
} from "@/services/reclamacao/criar-reclamacao";
import { toast } from "sonner";
import { listLinhas } from "@/services/linha/list-linhas";
import { listEstacoes } from "@/services/estacao/list-estacoes";

// Suponha que existam essas funções para buscar linhas e estações

export default function Contato() {
  const { user } = useAuthContext();

  const [tipo, setTipo] = useState("");
  const [message, setMessage] = useState("");
  const [linhas, setLinhas] = useState([]);
  const [estacoes, setEstacoes] = useState([]);
  const [linhaSelecionada, setLinhaSelecionada] = useState<number | null>(null);
  const [estacaoSelecionada, setEstacaoSelecionada] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const linhasData = await listLinhas();
      const estacoesData = await listEstacoes();
      setLinhas(linhasData);
      setEstacoes(estacoesData);
    }
    fetchData();
  }, []);

  async function handleSendMessage() {
    if (!linhaSelecionada || !estacaoSelecionada) {
      toast.error("Selecione uma linha e uma estação.");
      return;
    }

    const body: ReclamacaoData = {
      tipo,
      descricao: message,
      status: "Em Análise",
      usuario_id: user.usuario_id,
      estacao_id: estacaoSelecionada,
      linha_id: linhaSelecionada,
    };
    const response = await makeReclamacao(body);

    if (response) {
      toast.success("Reclamação enviada com sucesso!");
      setEstacaoSelecionada(null);
      setLinhaSelecionada(null);
      setTipo("");
      setMessage("");
    }
  }

  return (
    <>
      <Header isContact />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen px-4 pt-32 max-w-screen-lg mx-auto pb-10">
        <h1 className="text-2xl font-semibold text-black">
          Teve algum problema ou quer registrar uma reclamação? Envie uma
          mensagem para a gente.
        </h1>
        <form
          className="flex flex-col gap-4"
          aria-label="Formulário de contato"
        >
          <div className="flex flex-col">
            {/* Tipo de problema */}
            <label htmlFor="tipo" className="font-medium mb-2">
              Tipo de problema <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="tipo"
              id="tipo"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              placeholder="Digite o tipo de problema aqui"
              onChange={(ev) => setTipo(ev.target.value)}
            />

            {/* Linha */}
            <label htmlFor="linha" className="font-medium my-2">
              Linha <span className="text-red-600">*</span>
            </label>
            <select
              id="linha"
              name="linha"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              onChange={(e) => setLinhaSelecionada(Number(e.target.value))}
              value={linhaSelecionada ?? ""}
            >
              <option value="">Selecione uma linha</option>
              {linhas.map((linha: any) => (
                <option key={linha.linha_id} value={linha.linha_id}>
                  {linha.nome}
                </option>
              ))}
            </select>

            {/* Estação */}
            <label htmlFor="estacao" className="font-medium my-2">
              Estação <span className="text-red-600">*</span>
            </label>
            <select
              id="estacao"
              name="estacao"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              onChange={(e) => setEstacaoSelecionada(Number(e.target.value))}
              value={estacaoSelecionada ?? ""}
            >
              <option value="">Selecione uma estação</option>
              {estacoes.map((estacao: any) => (
                <option key={estacao.estacao_id} value={estacao.estacao_id}>
                  {estacao.nome}
                </option>
              ))}
            </select>

            {/* Mensagem */}
            <label htmlFor="mensagem" className="font-medium my-2">
              Mensagem <span className="text-red-600">*</span>
            </label>
            <textarea
              name="mensagem"
              id="mensagem"
              className="resize-none p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium h-56"
              placeholder="Digite sua mensagem"
              onChange={(ev) => setMessage(ev.target.value)}
            ></textarea>
          </div>

          {/* Botão */}
          <button
            type="button"
            onClick={handleSendMessage}
            className="bg-black flex items-center h-14 w-56 rounded-full text-white font-semibold px-6 py-3 relative cursor-pointer"
          >
            Enviar mensagem
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black absolute right-2">
              <ArrowRight />
            </div>
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}
