import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ItemsList from "../components/ItemsList";
import { ThemeContext } from "../ThemeContext";
import colors from "../colors";

export default function Contents({ route }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const content = route.params.content;
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ItemsList collection={content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
