import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

export default function PressableButton({ children, style, onPress }) {
  return (
    // <Pressable onPress={() => navigation.navigate("AddActivity")}>
    //   <View style={{ flexDirection: "row", marginRight: 10 }}>
    //     <MaterialIcons name="add" size={24} color="black" />
    //     <MaterialIcons name="directions-run" size={24} color="black" />
    //   </View>
    // </Pressable>
    <Pressable onPress={onPress}>{children}</Pressable>
  );
}

const styles = StyleSheet.create({});
