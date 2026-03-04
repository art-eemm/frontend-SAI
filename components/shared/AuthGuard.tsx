"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("sai_token");

    if (!storedToken) {
      router.replace("/login");
    } else {
      setToken(storedToken);
    }

    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f9]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent" />
      </div>
    );
  }

  if (!token) return null;

  return <>{children}</>;
}
