import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import colors from "../colors";

export default function PressableButton({ title, children, style, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.button,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
  },
});
