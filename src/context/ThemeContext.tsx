"use client";

import type React from "react";
import { createContext, useContext } from "react";

type Theme = "dark";  // Remove 'light' since we only want dark mode

type ThemeContextType = {
  theme: Theme;
  // Remove toggleTheme since we won't need it
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Simplified provider that always uses dark theme
  const theme: Theme = "dark";

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
