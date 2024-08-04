import React, { createContext, useState } from "react";
import colors from "./colors";

// create a context for the theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  //toggle the theme between dark and light
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  //change background color and text color based on the theme
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
