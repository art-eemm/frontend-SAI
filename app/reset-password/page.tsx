"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    //  lógica de base de datos
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center px-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
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

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-gray-800">
                Recuperación de contraseña
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Ingrese la dirección de correo electrónico empresarial para
                poder recuperar su cuenta
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSendCode}>
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="email@propysol.com"
                  required
                  className="bg-gray-100 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white mt-2"
              >
                Recuperar
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-gray-800">
                Ingresa el código
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                ¡Te enviamos un correo electrónico! {""}
                Ingrese el código de recuperación de 6 dígitos
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleVerifyCode}>
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Código de recuperación
                </label>
                <Input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  required
                  className="bg-gray-100 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 text-center text-lg tracking-[0.5em] font-semibold"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white mt-2"
              >
                Verificar código
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-gray-500  mt-4 block"
              >
                ¿No recibiste el código?{" "}
                <span className="underline hover:text-gray-700 hover:cursor-pointer">
                  Reenviar
                </span>
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-gray-800">
                Crea una nueva contraseña
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Tu nueva contraseña debe ser diferente a las anteriores.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Nueva contraseña
                </label>
                <Input
                  type="password"
                  required
                  placeholder="******"
                  className="bg-gray-100 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  Confirmar contraseña
                </label>
                <Input
                  type="password"
                  required
                  placeholder="******"
                  className="bg-gray-100 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white mt-2"
              >
                Guardar contraseña
              </Button>
            </form>
          </div>
        )}

        {step === 1 && (
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
