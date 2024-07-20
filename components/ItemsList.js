import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

export default function ItemsList({ collection }) {
  const activitiesData = [
    { id: 1, name: "Running" },
    { id: 2, name: "Swimming" },
  ];

  const dietData = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
  ];
  const data = collection === "activities" ? activitiesData : dietData;
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
