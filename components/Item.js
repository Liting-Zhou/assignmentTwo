import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";

export default function Item({ itemData, collectionName }) {
  const navigation = useNavigation();
  // console.log("itemData in Item.js: ", itemData);
  const handleItemPress = (itemData) => {
    const editScreen =
      collectionName === "Activities" ? "AddActivity" : "AddDiet";
    navigation.navigate(editScreen, { itemData });
  };

  return (
    <Pressable
      onPress={() => handleItemPress(itemData)}
      style={styles.container}
    >
      <Text style={styles.name}>{itemData.name}</Text>
      <View style={styles.warningContainer}>
        {itemData.special && (
          <MaterialIcons
            name="warning-amber"
            size={24}
            color={colors.tabIconFocused}
          />
        )}
      </View>
      <Text style={styles.date}>{itemData.date}</Text>
      <Text style={styles.quantity}>
        {itemData.quantity}
        {collectionName === "Activities" ? " min" : " cal"}
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
  warningContainer: { flex: 1 },
  date: {
    flex: 3,
    padding: 5,
    backgroundColor: colors.whiteText,
    color: colors.textAndBorder,
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  quantity: {
    flex: 1.5,
    padding: 5,
    color: colors.textAndBorder,
    backgroundColor: colors.whiteText,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
