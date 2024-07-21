import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import Item from "./Item";

export default function ItemsList({ collection }) {
  const activitiesData = [
    { id: 1, name: "running", quantity: "30", date: new Date("2023-10-05") },
    { id: 2, name: "swimming", quantity: "45", date: new Date("2023-11-05") },
  ];

  const dietData = [
    { id: 1, name: "apple", quantity: 95, date: new Date("2023-01-05") },
    { id: 2, name: "banana", quantity: 105, date: new Date("2023-02-05") },
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
