"use client";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";
import { makeReclamacao, ReclamacaoData } from "@/services/reclamacao";
import { toast } from "sonner";

export default function Contato() {
  const { user } = useAuthContext();
  const [tipo, setTipo] = useState("");
  const [message, setMessage] = useState("");
  async function handleSendMessage() {
    const body: ReclamacaoData = {
      tipo,
      descricao: message,
      status: "Em andamento",
      usuario_id: user.usuario_id,
      estacao_id: 1,
      linha_id: 1,
    };
    const response = await makeReclamacao(body);

    if (response) {
      toast.success("Reclamação enviada com sucesso!");
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
            <label htmlFor="tipo" className="font-medium mb-2">
              Tipo de problema{" "}
              <span className="text-red-600" aria-label="campo obrigatório">
                *
              </span>
            </label>
            <input
              type="text"
              name="tipo"
              id="tipo"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              placeholder="Digite o tipo de problema aqui"
              aria-required="true"
              onChange={(ev) => setTipo(ev.target.value)}
            />
            <label htmlFor="mensagem" className="font-medium my-2">
              Mensagem{" "}
              <span className="text-red-600" aria-label="campo obrigatório">
                *
              </span>
            </label>
            <textarea
              name="mensagem"
              id="mensagem"
              className="resize-none p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium h-56"
              placeholder="Digite sua mensagem"
              onChange={(ev) => setMessage(ev.target.value)}
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleSendMessage}
            className="bg-black flex items-center h-14 w-56 rounded-full text-white font-semibold px-6 py-3 relative cursor-pointer"
            aria-label="Enviar mensagem"
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
