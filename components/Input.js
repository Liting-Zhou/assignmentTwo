import { StyleSheet, TextInput } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import colors from "../colors";

export default function Input({
  onChangeText,
  value,
  editable,
  pointerEvents,
  style,
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <TextInput
      style={[styles.input, style, { color: theme.textColor }]}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      pointerEvents={pointerEvents}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.textAndBorder,
    borderRadius: 5,
    padding: 10,
  },
});
