import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";
import colors from "../colors";

export default function AddDiet({ route }) {
  // if an item is clicked, the route will have the item data
  // otherwise, use default values
  const itemData = route.params
    ? route.params.itemData
    : { date: new Date(), id: 0, name: "", quantity: "", special: false };
  const parsedDate = new Date(itemData.date); //todo: fix this
  const [description, setDescription] = useState(itemData.name);
  const [calories, setCalories] = useState(itemData.quantity);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(parsedDate);
  const [special, setSpecial] = useState(itemData.special);
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  // if route.params exists, set the title to "Edit"
  useLayoutEffect(() => {
    const headerTitle = route.params ? "Edit" : "Add A Diet Entry";
    navigation.setOptions({
      headerTitle,
      headerRight: () =>
        route.params ? (
          <Pressable onPress={handleDelete}>
            <View style={{ marginRight: 10 }}>
              <MaterialIcons name="delete-forever" size={24} color="black" />
            </View>
          </Pressable>
        ) : null,
    });
  }, []);

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "No",
      },
      { text: "Yes", onPress: () => navigation.goBack() },
    ]);
    //todo: delete the item
  };

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

    //alert the user to confirm change in Edit mode
    if (route.params) {
      const nameOld = route.params.itemData.name;
      const quantityOld = route.params.itemData.quantity;
      const dateOld = parsedDate;

      if (
        nameOld !== description ||
        quantityOld !== calories ||
        dateOld !== date
      ) {
        Alert.alert(
          "Important",
          "Are you sure you want to save these changes?",
          [
            {
              text: "No",
            },
            { text: "Yes", onPress: () => navigation.goBack() },
          ]
        );
      } else {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }

    const special = isSpecial();
    setSpecial(special);
    //todo: save the data
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
      <View style={styles.bottomContainer}>
        {special && (
          <View style={styles.textCheckboxContainer}>
            <Text>
              This item is marked as special. Select the checkbox if you would
              like to approve it.
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? colors.Checkbox : undefined}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <PressableButton title="Cancel" onPress={handleCancel} />
          <PressableButton title="Save" onPress={handleSave} />
        </View>
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
  checkbox: {
    marginLeft: 10,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 80,
  },
  textCheckboxContainer: {
    paddingBottom: 10,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
