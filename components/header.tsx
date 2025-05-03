"use client";

import { ShowClockAndLocal } from "@/components/show-clock-and-local";
import { Clock, MapPin, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  isHome?: boolean;
  isContact?: boolean;
}

export function Header({ isHome, isContact }: Props) {
  const [showClockAndLocal, setShowClockAndLocal] = useState<"local" | "clock">(
    "local"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <header className="w-full max-w-[1000px] mx-auto h-[110px] flex items-center justify-between px-4 absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
      <nav className="w-full flex justify-between items-center">
        <nav className="flex items-center  gap-3">
          <Link href="/">
            <Image
              src={isContact ? "./logo2.svg" : "./logo.svg"}
              alt="Logo ConectaTrens - Clique para voltar à página inicial"
              className="w-[65px] h-[65px]"
              width={65}
              height={65}
            />
          </Link>
        </nav>

        <div className="flex w-full justify-end md:justify-between items-center space-x-4">
          <div className="md:py-5 md:px-7 p-4 bg-gradient-horario md:justify-end rounded-full ml-4">
            <button
              className="md:hidden cursor-pointer flex justify-center items-center w-[40px] h-[40px]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={32} color={isContact ? "black" : "white"} />
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
              {user && (
                <>
                  <li>
                    <Link href="/login">{user.nome}</Link>
                  </li>
                  <li
                    onClick={() => localStorage.removeItem("user")}
                    className="cursor-pointer text-red-500"
                  >
                    Sair
                  </li>
                </>
              )}
              {!user && (
                <li>
                  <Link href="/login" className="cursor-pointer">
                    Login/Cadastro
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="/contato"
              className={`hidden md:flex bg-gradient-horario py-5 px-7 rounded-[32px] ${
                isContact ? "text-black" : "text-white"
              }`}
            >
              Contate-nos
            </Link>
            {isHome && (
              <>
                <button
                  className={`hidden w-[55px] h-[55px] md:flex items-center justify-center rounded-full transition ${
                    showClockAndLocal === "local"
                      ? "bg-white text-black"
                      : "bg-gradient-horario text-white"
                  }`}
                  onClick={() => setShowClockAndLocal("local")}
                >
                  <MapPin />
                </button>
                <button
                  className={`hidden w-[55px] h-[55px] md:flex items-center justify-center rounded-full transition ${
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
        </div>
      </nav>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <ul
          className={`absolute top-[100px] right-5 w-[80%] rounded-xl bg-black flex flex-col items-center  gap-8 py-6 md:hidden transition-transform ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <li>
            <Link className="text-white text-lg" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-white text-lg" href="/estacoes">
              Estações
            </Link>
          </li>
          <li>
            <Link className="text-white text-lg" href="/comprovantes">
              Comprovantes
            </Link>
          </li>
          <li>
            <Link href="/contato" className="text-white text-lg">
              Contate-nos
            </Link>
          </li>
        </ul>
      )}

      {isHome && <ShowClockAndLocal showClockAndLocal={showClockAndLocal} />}
    </header>
  );
}
