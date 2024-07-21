import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "../components/PressableButton";
import Input from "../components/Input";

export default function AddActivity({ route }) {
  // if an item is clicked, the route will have the item data
  // otherwise, use default values
  const itemData = route.params
    ? route.params.itemData
    : { date: new Date(), id: 0, name: null, quantity: "" };
  const parsedDate = new Date(itemData.date);
  const [activityType, setActivityType] = useState(itemData.name);

  const [openDropDown, setOpenDropDown] = useState(false);
  const [duration, setDuration] = useState(itemData.quantity);
  const [date, setDate] = useState(parsedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const specialActivities = ["running", "weights"];
  const navigation = useNavigation();

  console.log("AddActivity itemData:", itemData);
  console.log("AddActivity activityType:", activityType);
  console.log("AddActivity duration:", duration);
  console.log("AddActivity date:", date);

  useLayoutEffect(() => {
    const title = route.params ? "Edit" : "Add An Activity";
    navigation.setOptions({ title });
  }, [navigation, route.params]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const validateForm = () => {
    if (!activityType) {
      Alert.alert("Error", "Please select an activity.");
      return false;
    }
    if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
      Alert.alert("Error", "Please enter a valid duration (positive number).");
      return false;
    }
    return true;
  };

  const isSpecialActivity = () => {
    return specialActivities.includes(activityType) && parseInt(duration) > 60;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const special = isSpecialActivity();
    // todo: save the activity
    navigation.goBack();
    console.log("Save", special);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formItemContainer}>
        <Text style={styles.label}>Activity*</Text>
        <DropDownPicker
          open={openDropDown}
          value={activityType}
          items={[
            { label: "Walking", value: "walking" },
            { label: "Running", value: "running" },
            { label: "Swimming", value: "swimming" },
            { label: "Weights", value: "weights" },
            { label: "Yoga", value: "yoga" },
            { label: "Cycling", value: "cycling" },
            { label: "Hiking", value: "hiking" },
          ]}
          setOpen={setOpenDropDown}
          setValue={setActivityType}
          setItems={() => {}}
          multiple={false}
        />
      </View>
      <View style={styles.formItemContainer}>
        <Text style={styles.label}>Duration (min)*</Text>
        <Input value={duration} onChangeText={setDuration} />
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

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: 100,
  },
});
