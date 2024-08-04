import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import ItemsList from "../components/ItemsList";
import { ThemeContext } from "../ThemeContext";

// display the list of items based on the content type, activities or diet
export default function Contents({ route }) {
  const { theme } = useContext(ThemeContext);
  const content = route.params.content;
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ItemsList collectionName={content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
