import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "../components/PressableButton";

export default function AddActivity() {
  const [activityType, setActivityType] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const specialActivities = ["running", "weights"];
  const navigation = useNavigation();

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
      <View style={styles.form}>
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
          // style={styles.dropdown}
          multiple={false}
        />

        <Text style={styles.label}>Duration (min)*</Text>
        <TextInput
          // style={styles.input}
          // keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <Text style={styles.label}>Date*</Text>
        <PressableButton onPress={() => setShowDatePicker(true)}>
          <TextInput
            //   style={styles.input}
            value={date.toDateString()}
            editable={false}
            pointerEvents="none"
          />
        </PressableButton>
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
  container: { flex: 1 },
  form: { flex: 2 },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
