"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      question: "Como faço para solicitar um comprovante de atraso?",
      answer:
        'Para solicitar um comprovante de atraso, acesse a seção "Comprovantes" no menu superior e preencha o formulário com as informações necessárias. O documento será gerado automaticamente.',
    },
    {
      question: "Como posso comprar passagens?",
      answer:
        "Você pode comprar suas passagens diretamente nas bilheterias das estações ou através do nosso aplicativo móvel. Aceitamos pagamentos em dinheiro, cartão de débito e crédito. Para viagens frequentes, recomendamos o cartão de transporte que oferece descontos especiais.",
    },
    {
      question: "Como posso entrar em contato em caso de dúvidas ou problemas?",
      answer:
        "Você pode entrar em contato conosco através do nosso canal de atendimento pelo telefone 0800-XXX-XXXX, disponível 24 horas por dia, ou pelo formulário de contato em nosso site. Para atendimento presencial, procure um de nossos funcionários nas estações.",
    },
    {
      question: "Esqueci um objeto na estação, o que devo fazer?",
      answer:
        "Em caso de objetos perdidos, entre em contato imediatamente com nossa central de achados e perdidos pelo telefone 0800-XXX-XXXX ou dirija-se ao balcão de informações da estação mais próxima. Manteremos os objetos encontrados por até 60 dias em nossa central.",
    },
  ];

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white max-w-[1000px] mx-auto py-20 px-4">
      <p className="text-black font-semibold mb-2">F.A.Q</p>
      <h1 className="text-[2rem] text-black mb-12 font-bold">
        Perguntas frequentes
      </h1>

      <div className="max-w-[1000px] mx-auto">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#f3f0e9] p-5 rounded-lg border-b border-[#e4e4e4] mb-4"
          >
            <div
              className="flex justify-between items-center  cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h3 className="text-sm font-medium">{item.question}</h3>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                activeIndex === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <p className="pb-4 mt-5 text-sm leading-relaxed text-gray-600">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
