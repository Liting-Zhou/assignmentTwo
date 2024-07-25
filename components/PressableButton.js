import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import colors from "../colors";

export default function PressableButton({ title, children, style, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.androidRipple }}
      style={({ pressed }) => {
        return [styles.button, style, pressed && styles.pressedStyle];
      }}
    >
      <Text style={styles.buttonText}>{title}</Text>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.headerBackground,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.whiteText,
    fontSize: 16,
  },
  pressedStyle: {
    opacity: 0.5,
  },
});
