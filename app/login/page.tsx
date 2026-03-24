"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Correo o conraseña incorrectos");
      }

      localStorage.setItem("sai_token", data.token);
      localStorage.setItem("sai_user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error inseperado",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-accent rounded-2xl border-2 border-border shadow-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.svg"
            alt="Propysol"
            width={250}
            height={80}
            priority
            className="dark:hidden"
          />
          <Image
            src="/images/logo-blackmode.svg"
            alt="Propysol"
            width={250}
            height={80}
            priority
            className="hidden dark:block"
          />
        </div>

        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-semibold text-foreground">
            Sistema de Administración Integral
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Inicia sesión con tu correo empresarial o número de asociado
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md text-center">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Email o número de asociado
            </label>
            <Input
              type="text"
              placeholder="email@propysol.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-accent border-border focus-visible:ring-1 focus-visible:ring-gray-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-accent border-border focus-visible:ring-1 focus-visible:ring-gray-400"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            variant={"default"}
            className="w-full mt-2 cursor-pointer"
          >
            Iniciar sesión
          </Button>
        </form>

        {/* Link */}
        <div className="text-center mt-6">
          <Link
            href="/reset-password"
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}
