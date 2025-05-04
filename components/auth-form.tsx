"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { login } from "@/services/login";
import { registerUser } from "@/services/register";

interface AuthFormProps {
  type: "login" | "cadastro";
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === "cadastro") {
        if (formData.senha !== formData.confirmarSenha) {
          toast.error("As senhas não coincidem");

          setIsLoading(false);
          return;
        }

        if (formData.senha.length < 8) {
          toast.error("A senha deve ter pelo menos 8 caracteres");

          setIsLoading(false);
          return;
        }
        const response = await registerUser(formData);
      }

      const response = await login({
        email: formData.email,
        senha: formData.senha,
      });

      console.log(response);

      toast.success("Login realizado com sucesso!");

      router.push("/");
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {type === "cadastro" && (
        <div className="space-y-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            name="nome"
            type="text"
            placeholder="Seu nome"
            className="rounded-xl"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          className="rounded-xl"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {type === "cadastro" && (
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            placeholder="(11) 99999-9999"
            className="rounded-xl"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        {type === "login" && (
          <div className="flex items-center justify-between">
            <Label htmlFor="senha">Senha</Label>
            <a href="/recuperar-senha" className="text-sm text-black underline">
              Esqueceu a senha?
            </a>
          </div>
        )}
        {type === "cadastro" && <Label htmlFor="senha">Senha</Label>}
        <Input
          id="senha"
          name="senha"
          type="password"
          placeholder={type === "cadastro" ? "Mínimo 8 caracteres" : "••••••••"}
          className="rounded-xl"
          value={formData.senha}
          onChange={handleChange}
          required
        />
      </div>

      {type === "cadastro" && (
        <div className="space-y-2">
          <Label htmlFor="confirmarSenha">Confirmar senha</Label>
          <Input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            placeholder="Digite a senha novamente"
            className="rounded-xl"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <Button
        type="submit"
        className={`w-full rounded-full ${
          type === "cadastro"
            ? "bg-lime-400 text-black hover:bg-lime-500"
            : "bg-black text-white hover:bg-black/80"
        }`}
        disabled={isLoading}
      >
        {isLoading
          ? "Processando..."
          : type === "cadastro"
          ? "Cadastrar"
          : "Entrar"}
      </Button>
    </form>
  );
}
