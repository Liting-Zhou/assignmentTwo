import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import Item from "./Item";
import { db } from "../firebase/firebaseSetup";

export default function ItemsList({ collectionName }) {
  const [dietData, setDietData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  // const activitiesData = [
  //   {
  //     id: 1,
  //     name: "running",
  //     quantity: "80",
  //     date: new Date("2023-10-05"),
  //     special: true,
  //   },
  //   {
  //     id: 2,
  //     name: "swimming",
  //     quantity: "45",
  //     date: new Date("2023-11-05"),
  //     special: false,
  //   },
  // ];

  // const dietData = [
  //   {
  //     id: 1,
  //     name: "apple",
  //     quantity: "895",
  //     date: new Date("2023-01-05"),
  //     special: true,
  //   },
  //   {
  //     id: 2,
  //     name: "banana",
  //     quantity: "105",
  //     date: new Date("2023-02-05"),
  //     special: false,
  //   },
  // ];

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (querySnapshot) => {
        let newArray = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnapShot) => {
            newArray.push({ ...docSnapShot.data(), id: docSnapShot.id });
          });
        }
        console.log("newArrayDiet: ", newArray);
        if (collectionName === "Activities") {
          setActivitiesData(newArray);
        } else {
          setDietData(newArray);
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const data = collectionName === "Activities" ? activitiesData : dietData;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item itemData={item} collectionName={collectionName} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
