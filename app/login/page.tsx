"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.svg"
            alt="Propysol"
            width={250}
            height={80}
            priority
          />
        </div>

        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-semibold text-gray-800">
            Sistema de Administración Integral
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Inicia sesión con tu correo empresarial o número de asociado
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Email o número de asociado
            </label>
            <Input
              type="text"
              placeholder="email@propysol.com"
              className="bg-gray-100 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2">
              Contraseña
            </label>
            <Input
              type="password"
              className="bg-gray-100 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white mt-2"
          >
            Iniciar sesión
          </Button>
        </form>

        {/* Link */}
        <div className="text-center mt-6">
          <Link
            href="/reset-password"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}
