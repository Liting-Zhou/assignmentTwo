import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";

export default function Item({ itemData, collection }) {
  const navigation = useNavigation();

  const handleItemPress = (itemData) => {
    const editScreen = collection === "Activities" ? "AddActivity" : "AddDiet";
    navigation.navigate(editScreen, {
      itemData: {
        ...itemData,
        date: itemData.date.toISOString(),
      },
    });
  };

  return (
    <Pressable
      onPress={() => handleItemPress(itemData)}
      style={styles.container}
    >
      <Text style={styles.name}>{itemData.name}</Text>
      <Text style={styles.date}>{itemData.date.toDateString()}</Text>
      <Text style={styles.quantity}>
        {itemData.quantity}
        {collection === "Activities" ? " min" : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.headerBackground,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  name: {
    flex: 2,
    padding: 5,
    color: colors.whiteText,
    fontWeight: "bold",
  },
  date: {
    flex: 3,
    padding: 5,
    backgroundColor: colors.whiteText,
    color: colors.textAndBorder,
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  quantity: {
    flex: 1,
    padding: 5,
    color: colors.textAndBorder,
    backgroundColor: colors.whiteText,
    fontWeight: "bold",
    fontSize: 12,
  },
});
