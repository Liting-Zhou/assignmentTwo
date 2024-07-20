import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import colors from "../colors";
export default function Input({
  onChangeText,
  value,
  editable,
  pointerEvents,
}) {
  return (
    <TextInput
      style={styles.input}
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
    borderColor: colors.inputBorder,
    borderRadius: 5,
    padding: 10,
  },
});
