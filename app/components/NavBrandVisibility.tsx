"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface NavBrandContextValue {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const NavBrandContext = createContext<NavBrandContextValue>({
  visible: true,
  setVisible: () => {},
});

export function NavBrandProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  return (
    <NavBrandContext.Provider value={{ visible, setVisible }}>
      {children}
    </NavBrandContext.Provider>
  );
}

export function useNavBrandVisibility() {
  return useContext(NavBrandContext);
}
