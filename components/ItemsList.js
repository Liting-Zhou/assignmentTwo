import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import Item from "./Item";

export default function ItemsList({ collection }) {
  const activitiesData = [
    { id: 1, name: "Running", quantity: 30, date: new Date() },
    { id: 2, name: "Swimming", quantity: 45, date: new Date() },
  ];

  const dietData = [
    { id: 1, name: "Apple", quantity: 95, date: new Date() },
    { id: 2, name: "Banana", quantity: 105, date: new Date() },
  ];
  const data = collection === "Activities" ? activitiesData : dietData;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item itemData={item} collection={collection} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
