import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Header } from "@/components/header";

export default function Cadastro() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isContact />
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md bg-gray-100 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Cadastre-se</h1>
            <p className="text-gray-600">
              Crie sua conta para acessar o sistema
            </p>
          </div>

          <AuthForm type="cadastro" />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-black font-medium underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
