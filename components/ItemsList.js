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
          // iterate through each document in the snapshot
          querySnapshot.forEach((docSnapShot) => {
            newArray.push({ ...docSnapShot.data(), id: docSnapShot.id });
          });
        }
        // update state based on the collection name
        if (collectionName === "Activities") {
          setActivitiesData(newArray);
        } else {
          setDietData(newArray);
        }
      }
    );
    // cleanup subscription on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // determine which data to display based on the collection name
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
