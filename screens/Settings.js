import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PressableButton from "../components/PressableButton";

export default function Settings() {
  const handleToggleTheme = () => {
    console.log("toggle theme");
  };
  return (
    <View style={styles.container}>
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
