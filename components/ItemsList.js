import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import Item from "./Item";
import { db } from "../firebase/firebaseSetup";

export default function ItemsList({ collectionName }) {
  const [dietData, setDietData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);

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
