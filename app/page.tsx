import { CardFastActions } from "@/components/card-fast-actions";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isHome />

      <main className="flex-grow">
        {/* Seção Hero */}
        <section
          className="relative h-[600px] w-full bg-[url('/variant1.jpg')] bg-cover bg-no-repeat"
          aria-labelledby="hero-title"
        >
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative max-w-[1000px] mx-auto h-full">
            {/* Conteúdo Principal */}
            <div className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 w-full px-4 ">
              <p className="text-white text-lg md:text-xl mb-4">
                Sua viagem tranquila começa aqui
              </p>
              <h1 className="text-4xl md:text-5xl font-bold lg:text-[50px] text-white leading-tight mb-8">
                Conforto e segurança <br /> em cada parada
              </h1>
            </div>
          </div>
        </section>

        {/* Seção Ações Rápidas */}
        <section className="bg-white max-w-[1000px] mx-auto py-16 px-4">
          <p className="text-xl text-black font-medium mb-2">Ações Rápidas</p>
          <h1 className="text-4xl md:text-5xl lg:text-[60px] text-black font-bold mb-12">
            O que podemos fazer por <br />
            você hoje?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CardFastActions
              href="/estacoes"
              title="Preciso encontrar para onde vou"
              description="Veja as estações e linhas que atuamos e como você pode chegar nela."
              imgName="./woman-waiting.png"
              tag1="Estações"
              tag2="Linhas"
            />
            <CardFastActions
              href="/estacoes"
              title="Preciso do meu comprovante"
              description="Caso tenha acontecido algum atraso no trem você pode gerar um
              comprovante."
              imgName="./time.jpg"
              tag1="Documento"
              tag2="Atraso"
            />
            <CardFastActions
              href="/contato"
              title="Preciso relatar um problema"
              description="Caso tenha ocorrido algum problema com você use está opção para nos contar."
              imgName="./train.jpg"
              tag1="Problema"
              tag2="Estação"
            />
          </div>
        </section>

        <Faq />
      </main>

      <Footer />
    </div>
  );
}
