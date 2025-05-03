import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Header } from "@/components/header";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isContact />

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-100 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Entrar</h1>
            <p className="text-gray-600">Acesse sua conta para continuar</p>
          </div>

          <AuthForm type="login" />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="text-black font-medium underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
