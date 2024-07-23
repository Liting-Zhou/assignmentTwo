import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import PressableButton from "../components/PressableButton";
import { ThemeContext } from "../ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleToggleTheme = () => {
    // console.log("toggle theme");
    toggleTheme();
  };
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <PressableButton title={"Toggle Theme"} onPress={handleToggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
