import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Contato() {
  return (
    <>
      <Header isContact />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-screen px-4 pt-32 max-w-screen-lg mx-auto pb-10">
        <h1 className="text-2xl font-semibold text-black">
          Ficou alguma dúvida? Nos envie uma mensagem
        </h1>
        <form
          className="flex flex-col gap-4"
          aria-label="Formulário de contato"
        >
          <div className="flex flex-col">
            <label htmlFor="nome" className="font-medium">
              Nome{" "}
              <span className="text-red-600" aria-label="campo obrigatório">
                *
              </span>
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              placeholder="Digite seu nome aqui"
              aria-required="true"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium">
              E-mail{" "}
              <span className="text-red-600" aria-label="campo obrigatório">
                *
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              placeholder="Digite seu email aqui"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="telefone" className="font-medium">
              Telefone{" "}
              <span className="text-red-600" aria-label="campo obrigatório">
                *
              </span>
            </label>
            <input
              type="tel"
              name="telefone"
              id="telefone"
              className="p-4 bg-transparent border border-gray-300 rounded-lg w-full text-lg font-medium"
              placeholder="Digite seu telefone aqui"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mensagem" className="font-medium">
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
            ></textarea>
          </div>
          <button
            type="submit"
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
