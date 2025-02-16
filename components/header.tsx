"use client";

import { Clock, MapPin, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ShowClockAndLocal } from "@/components/show-clock-and-local";

interface Props {
  isHome?: boolean;
  isContact?: boolean;
}

export function Header({ isHome, isContact }: Props) {
  const [showClockAndLocal, setShowClockAndLocal] = useState<"local" | "clock">(
    "local"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full max-w-[1000px] mx-auto h-[110px] flex items-center justify-between px-4 absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
      <nav className="w-full flex justify-between items-center">
        <nav className="flex items-center gap-3">
          <Link href="/">
            <img
              src={isContact ? "./logo2.svg" : "./logo.svg"}
              alt="Logo ConectaTrens - Clique para voltar à página inicial"
              className="w-[65px] h-[65px]"
            />
          </Link>

          <div className="flex items-center bg-gradient-horario py-5 px-7 rounded-[32px]">
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={32} />
            </button>

            <ul
              className={`hidden md:flex space-x-4 ${
                isContact ? "text-black" : "text-white"
              }`}
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/estacoes">Estações</Link>
              </li>
              <li>
                <Link href="/comprovantes">Comprovantes</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/contato"
            className="bg-gradient-horario py-5 px-7 rounded-[32px] text-white"
          >
            Contate-nos
          </Link>
          {isHome && (
            <>
              <button
                className={`w-[55px] h-[55px] flex items-center justify-center rounded-full transition ${
                  showClockAndLocal === "local"
                    ? "bg-white text-black"
                    : "bg-gradient-horario text-white"
                }`}
                onClick={() => setShowClockAndLocal("local")}
              >
                <MapPin />
              </button>
              <button
                className={`w-[55px] h-[55px] flex items-center justify-center rounded-full transition ${
                  showClockAndLocal === "clock"
                    ? "bg-white text-black"
                    : "bg-gradient-horario text-white"
                }`}
                onClick={() => setShowClockAndLocal("clock")}
              >
                <Clock />
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Menu Mobile */}
      <ul
        className={`absolute top-[100px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-2 md:hidden transition-transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/estacoes">Estações</Link>
        </li>
        <li>
          <Link href="/comprovantes">Comprovantes</Link>
        </li>
        <li>
          <Link
            href="/contato"
            className="px-[22px] py-[30px] rounded-[32px] bg-black text-white"
          >
            Contate-nos
          </Link>
        </li>
      </ul>

      {isHome && <ShowClockAndLocal showClockAndLocal={showClockAndLocal} />}
    </header>
  );
}
