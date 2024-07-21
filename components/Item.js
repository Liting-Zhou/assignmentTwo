import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";

export default function Item({ itemData, collection }) {
  const navigation = useNavigation();

  const handleItemPress = (itemData) => {
    const editScreen = collection === "Activities" ? "AddActivity" : "AddDiet";
    navigation.navigate(editScreen, { itemData });
  };

  return (
    <Pressable
      onPress={() => handleItemPress(itemData)}
      style={styles.container}
    >
      <Text style={styles.name}>{itemData.name}</Text>
      <Text style={styles.date}>{itemData.date}</Text>
      <Text style={styles.quantity}>
        {itemData.quantity}
        {collection === "Activities" ? " min" : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.itemContainer,
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  name: {
    flex: 2,
    padding: 5,
  },
  date: {
    flex: 2,
    padding: 5,
    backgroundColor: colors.itemBackground,
  },
  quantity: {
    flex: 1,
    padding: 5,
    backgroundColor: colors.itemBackground,
  },
});
