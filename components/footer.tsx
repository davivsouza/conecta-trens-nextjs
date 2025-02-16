import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-6">
        {/* Coluna 1 - Logo e Descrição */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img
              src="./logo.svg"
              alt="Logo ConectaTrens"
              className="w-[50px]"
            />
            <strong className="text-[30px] text-white">ConectaTrens</strong>
          </div>
          <p className="text-white leading-relaxed">
            Nossa missão é te levar para destinos com excelência, conforto e
            segurança.
          </p>
        </div>

        {/* Coluna 2 - Contato */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold">Contato</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-white">
              <Phone className="w-5 h-5" />
              <span>0800 XXX XXXX</span>
            </div>
            <div className="flex items-start gap-3 text-white">
              <Mail className="w-5 h-5" />
              <span>conectatrens@gmail.com</span>
            </div>
            <div className="flex items-start gap-3 text-white">
              <Clock className="w-5 h-5" />
              <span>Seg - Sex: 04:00 - 00:00</span>
            </div>
            <div className="flex items-start gap-3 text-white">
              <Clock className="w-5 h-5" />
              <span>Sáb - Dom: 04:40 - 00:00</span>
            </div>
            <div className="flex items-start gap-3 text-white">
              <MapPin className="w-5 h-5" />
              <span>
                Av. Principal, 1000
                <br />
                São Paulo - SP
              </span>
            </div>
          </div>
        </div>

        {/* Coluna 3 - Navegação */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold">Navegação</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="text-white hover:text-primary hover:underline transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/estacoes"
                className="text-white hover:text-primary hover:underline transition-colors"
              >
                Estações
              </Link>
            </li>
            <li>
              <Link
                href="/comprovantes"
                className="text-white hover:text-primary hover:underline transition-colors"
              >
                Comprovantes
              </Link>
            </li>
            <li>
              <Link
                href="/contato"
                className="text-white hover:text-primary hover:underline transition-colors"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className="mt-16 py-6 border-t border-gray-800 text-center">
        <p className="text-white text-sm">
          &copy; 2024 ConectaTrens. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
