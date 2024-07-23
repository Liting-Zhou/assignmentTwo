import React, { createContext, useState } from "react";
import colors from "./colors";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = {
    backgroundColor: isDarkTheme
      ? colors.DarkThemeBackground
      : colors.screenBackground,
    textColor: isDarkTheme ? colors.whiteText : colors.textAndBorder,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
