import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ItemsList({ collection }) {
  const navigation = useNavigation();

  const activitiesData = [
    { id: 1, name: "Running" },
    { id: 2, name: "Swimming" },
  ];

  const dietData = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
  ];
  const data = collection === "Activities" ? activitiesData : dietData;

  const handleItemPress = (item) => {
    const editScreen = collection === "Activities" ? "AddActivity" : "AddDiet";
    navigation.navigate(editScreen, { item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleItemPress(item)}>
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
