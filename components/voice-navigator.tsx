"use client";

import { AudioLines, Mic, Navigation, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    mozSpeechRecognition: any;
    msSpeechRecognition: any;
  }
}

let speechRecognition: any;

const homeSinonimos = ["tela inicial", "página inicial", "começo", "home"];
const comprovanteSinonimos = ["comprovante", "ocorrência"];
const contatoSinonimos = ["contato", "reclamar", "dúvida"];
const estacoesSinonimos = [
  "estações",
  "estação",
  "linha",
  "viajar",
  "baldeação",
];

export function VoiceNavigator() {
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [browserSupported, setBrowserSupported] = useState(true);
  const router = useRouter();

  // Verificar suporte do navegador ao carregar o componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSupported =
        "SpeechRecognition" in window ||
        "webkitSpeechRecognition" in window ||
        "mozSpeechRecognition" in window ||
        "msSpeechRecognition" in window;

      setBrowserSupported(isSupported);
    }
  }, []);

  function getSpeechRecognitionAPI() {
    if (typeof window === "undefined") return null;

    return (
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition
    );
  }

  function handleStartRecording() {
    const SpeechRecognitionAPI = getSpeechRecognitionAPI();

    if (!SpeechRecognitionAPI) {
      alert("Infelizmente seu navegador não suporta a API de gravação de voz.");
      setBrowserSupported(false);
      return;
    }

    try {
      setIsRecording(true);
      speechRecognition = new SpeechRecognitionAPI();
      speechRecognition.lang = "pt-BR";
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.maxAlternatives = 1;

      speechRecognition.onresult = (event: any) => {
        const transcription = event.results[0][0].transcript;
        setContent(transcription);
      };

      speechRecognition.onerror = (event: any) => {
        console.error("Erro de reconhecimento de voz:", event.error);
        setIsRecording(false);

        if (event.error === "not-allowed") {
          alert(
            "É necessário permitir o acesso ao microfone para usar essa funcionalidade.",
          );
        }
      };

      speechRecognition.onend = () => {
        if (isRecording) {
          // O reconhecimento terminou sem chamar handleStopRecording
          handleProcessSpeech();
        }
      };

      speechRecognition.start();
    } catch (error) {
      console.error("Erro ao iniciar o reconhecimento de voz:", error);
      setIsRecording(false);
      alert(
        "Ocorreu um erro ao iniciar o reconhecimento de voz. Verifique as permissões do microfone.",
      );
    }
  }

  function handleStopRecording() {
    if (speechRecognition) {
      try {
        speechRecognition.stop();
      } catch (error) {
        console.error("Erro ao parar o reconhecimento de voz:", error);
      }
    }

    handleProcessSpeech();
  }

  function handleProcessSpeech() {
    setIsRecording(false);

    if (content.length > 0) {
      setIsNavigating(true);

      // Processa o comando de voz
      let destinationPath = "";

      if (
        comprovanteSinonimos.some((palavra) =>
          content.toLowerCase().includes(palavra.toLowerCase()),
        )
      ) {
        destinationPath = "/comprovantes";
      } else if (
        homeSinonimos.some((palavra) =>
          content.toLowerCase().includes(palavra.toLowerCase()),
        )
      ) {
        destinationPath = "/";
      } else if (
        contatoSinonimos.some((palavra) =>
          content.toLowerCase().includes(palavra.toLowerCase()),
        )
      ) {
        destinationPath = "/contato";
      } else if (
        estacoesSinonimos.some((palavra) =>
          content.toLowerCase().includes(palavra.toLowerCase()),
        )
      ) {
        destinationPath = "/estacoes";
      }

      if (destinationPath) {
        setTimeout(() => {
          router.push(destinationPath);
          setIsNavigating(false);
          setContent("");
          setShowModal(false);
        }, 3000);
      } else {
        setTimeout(() => {
          setIsNavigating(false);
          alert("Comando não reconhecido. Por favor, tente novamente.");
        }, 1000);
      }
    } else {
      setIsNavigating(false);
      setContent("");
    }
  }

  return (
    <>
      {showModal && (
        <div className="fixed flex items-center justify-center p-12 bg-gray-200 bottom-20 right-16 z-10 rounded-lg pt-10 pb-5 sm:right-16 max-sm:right-4">
          <div>
            <div>
              <strong className="block my-4">
                Exemplos de comandos de voz.
              </strong>
              <ol className="pl-5">
                <li> Ir para tela inicial</li>
                <li> Ir para comprovantes</li>
                <li> Ir para contato</li>
                <li> Estações</li>
              </ol>
            </div>
            {!browserSupported && (
              <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg w-80 text-sm">
                Seu navegador pode não ser compatível com a API de
                reconhecimento de voz. Recomendamos usar Chrome, Edge ou Safari
                para melhor experiência.
              </div>
            )}
            {content.length > 0 && (
              <>
                <strong className="block my-4">Você falou:</strong>
                <div className="rounded-xl p-2 bg-white text-black text-center text-lg">
                  {content}
                </div>
              </>
            )}
            {!isRecording && !isNavigating && (
              <button
                className="border-none bg-red-500 rounded-xl py-3 px-2 flex items-center justify-center gap-2 w-full my-3 text-white text-lg cursor-pointer hover:brightness-90"
                onClick={handleStartRecording}
              >
                <Mic />
                <span>Começar a gravar</span>
              </button>
            )}
            {isRecording && !isNavigating && (
              <button
                className="border-none bg-red-500 rounded-xl py-3 px-2 flex items-center justify-center gap-2 w-full my-3 text-white text-lg cursor-pointer hover:brightness-90"
                onClick={handleStopRecording}
              >
                <AudioLines className="animate-pulse" />
                <span>Parar de gravar</span>
              </button>
            )}
            {isNavigating && (
              <button
                className="border-none bg-lime-300 rounded-xl py-3 px-2 flex items-center justify-center gap-2 w-full my-3 text-black text-lg cursor-pointer"
                disabled
              >
                <Navigation />
                <span>Navegando para seu destino.</span>
              </button>
            )}
          </div>
        </div>
      )}
      <div
        className="w-16 h-16 rounded-full p-3 flex items-center justify-center fixed bottom-5 right-5 bg-lime-300 z-10 cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        {showModal ? <X /> : <Mic color="black" size={30} />}
      </div>
    </>
  );
}
