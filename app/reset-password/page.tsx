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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
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

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-foreground">
                Recuperación de contraseña
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Ingrese la dirección de correo electrónico empresarial para
                poder recuperar su cuenta
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSendCode}>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="email@propysol.com"
                  required
                  className="bg-accent border-border focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </div>
              <Button
                type="submit"
                variant={"default"}
                className="w-full mt-2 cursor-pointer"
              >
                Recuperar
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-foreground">
                Ingresa el código
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                ¡Te enviamos un correo electrónico! {""}
                Ingrese el código de recuperación de 6 dígitos
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleVerifyCode}>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Código de recuperación
                </label>
                <Input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  required
                  className="bg-accent border-border focus-visible:ring-1 focus-visible:ring-gray-400 text-center text-lg tracking-[0.5em] font-semibold"
                />
              </div>
              <Button
                type="submit"
                variant={"default"}
                className="w-full mt-2 cursor-pointer"
              >
                Verificar código
              </Button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-muted-foreground  mt-4 block"
              >
                ¿No recibiste el código?{" "}
                <span className="underline hover:text-foreground hover:cursor-pointer">
                  Reenviar
                </span>
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-foreground">
                Crea una nueva contraseña
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Tu nueva contraseña debe ser diferente a las anteriores.
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Nueva contraseña
                </label>
                <Input
                  type="password"
                  required
                  placeholder="******"
                  className="bg-accent border-border focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Confirmar contraseña
                </label>
                <Input
                  type="password"
                  required
                  placeholder="******"
                  className="bg-accent border-border focus-visible:ring-1 focus-visible:ring-gray-400"
                />
              </div>
              <Button
                type="submit"
                variant={"default"}
                className="w-full mt-2 cursor-pointer"
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
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
