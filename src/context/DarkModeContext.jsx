// import { createContext, useContext, useState } from "react";

// const DarkModeContext = createContext();

// function DarkModeProvider({ children }) {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   function toggleDarkMode() {
//     setIsDarkMode((isDark) => !isDark);
//   }

//   return (
//     <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }

// function useDarkMode() {
//   const context = useContext(DarkModeContext);
//   if (context === undefined)
//     throw new Error("DarkModeContext was used outside of DarkModeProvider");
//   return context;
// }

// export { DarkModeProvider, useDarkMode };

import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get the initial value from localStorage
    return JSON.parse(localStorage.getItem("isDarkMode")) || false;
  });

  useEffect(() => {
    // Save the value to localStorage whenever it changes
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
