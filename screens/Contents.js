import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemsList from "../components/ItemsList";

export default function Contents({ route }) {
  const content = route.params.content;
  return <ItemsList collection={content} />;
}

const styles = StyleSheet.create({});
