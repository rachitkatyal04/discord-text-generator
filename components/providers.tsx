"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "blue",
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Clear any saved theme and force light theme
    localStorage.removeItem("theme");
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("light");
    setColorScheme("light");
  }, []);

  const toggleTheme = () => {
    const newTheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}

// Script to prevent flash
const themeScript = `
  (function() {
    localStorage.removeItem("theme");
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("light");
  })();
`;

export { themeScript };
