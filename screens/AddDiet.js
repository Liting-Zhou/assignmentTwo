import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";

export default function AddDiet({ route }) {
  // if an item is clicked, the route will have the item data
  // otherwise, use default values
  const itemData = route.params
    ? route.params.itemData
    : { date: new Date(), id: 0, name: "", quantity: "" };
  const parsedDate = new Date(itemData.date); //todo: fix this
  const [description, setDescription] = useState(itemData.name);
  const [calories, setCalories] = useState(itemData.quantity);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(parsedDate);
  const navigation = useNavigation();

  // if route.params exists, set the title to "Edit"
  useLayoutEffect(() => {
    const title = route.params ? "Edit" : "Add A Diet Entry";
    navigation.setOptions({ title });
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const validateForm = () => {
    if (!description) {
      Alert.alert("Error", "Please enter some description.");
      return false;
    }
    if (!calories || isNaN(calories) || parseInt(calories) <= 0) {
      Alert.alert("Error", "Please enter valid calories (positive number).");
      return false;
    }
    return true;
  };

  const isSpecial = () => {
    return parseInt(calories) > 800;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const special = isSpecial();
    navigation.goBack();
    console.log("Save", special);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formItemContainer}>
        <Text style={styles.label}>Description*</Text>
        <Input
          value={description}
          onChangeText={setDescription}
          style={styles.description}
        />
      </View>
      <View style={styles.formItemContainer}>
        <Text style={styles.label}>Calories*</Text>
        <Input value={calories} onChangeText={setCalories} />
      </View>
      <View style={styles.formItemContainer}>
        <Text style={styles.label}>Date*</Text>
        <Pressable onPress={() => setShowDatePicker(!showDatePicker)}>
          <Input
            value={date.toDateString()}
            editable={false}
            pointerEvents="none"
          />
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton title="Cancel" onPress={handleCancel} />
        <PressableButton title="Save" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formItemContainer: {
    padding: 10,
  },
  label: {
    padding: 5,
  },
  description: {
    height: 80,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: 100,
  },
});
