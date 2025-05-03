import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VLibrasComponent } from "@/components/vlibras";
import { VoiceNavigator } from "@/components/voice-navigator";
import { Toaster } from "sonner";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConectaTrens",
  description:
    "ConectaTrens é uma solução que visa melhorar a acessibilidade digital dos sites das linhas de trem operadas pela CCR, unificando e otimizando a experiência dos usuários. Nosso foco é facilitar o acesso às informações essenciais e gerar declarações de atraso de maneira rápida e intuitiva para públicos com menor familiaridade tecnológica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/logo2.svg" sizes="any" />
      <body className={`${inter.className} antialiased`}>
        {children}
        <VoiceNavigator />
        <VLibrasComponent />
        <Toaster richColors />
      </body>
    </html>
  );
}
