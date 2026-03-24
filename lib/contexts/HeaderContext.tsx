"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeaderState {
  title: string | null;
  subtitle: ReactNode | null;
}

interface HeaderContextType {
  headerState: HeaderState;
  setHeaderState: (state: HeaderState) => void;
  resetHeader: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [headerState, setHeaderState] = useState<HeaderState>({
    title: null,
    subtitle: null,
  });

  const resetHeader = () => setHeaderState({ title: null, subtitle: null });

  return (
    <HeaderContext.Provider
      value={{ headerState, setHeaderState, resetHeader }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader debe usarse dentro de un HeaderProvider");
  }
  return context;
}
