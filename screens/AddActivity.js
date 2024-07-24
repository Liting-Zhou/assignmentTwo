import { StyleSheet, Text, View, Alert, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../ThemeContext";
import PressableButton from "../components/PressableButton";
import Input from "../components/Input";
import colors from "../colors";
import CustomText from "../components/CustomText";
import { writeToDB } from "../firebase/firebaseHelper";

export default function AddActivity({ route }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // if an item is clicked, the route will have the item data
  // otherwise, use default values
  const itemData = route.params
    ? route.params.itemData
    : { date: new Date(), id: 0, name: "", quantity: "" };
  const parsedDate = new Date(itemData.date); //todo: fix this
  const [activityType, setActivityType] = useState(itemData.name);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [duration, setDuration] = useState(itemData.quantity);
  const [date, setDate] = useState(parsedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [special, setSpecial] = useState(itemData.special);
  const [isChecked, setChecked] = useState(false);
  const specialActivities = ["running", "weights"];
  const navigation = useNavigation();

  // if route.params exists, set the title to "Edit"
  useLayoutEffect(() => {
    const headerTitle = route.params ? "Edit" : "Add An Activity";
    navigation.setOptions({
      title: headerTitle,
      headerRight: () =>
        route.params ? (
          <Pressable onPress={handleDelete}>
            <View style={{ marginRight: 10 }}>
              <MaterialIcons
                name="delete-forever"
                size={24}
                color={colors.whiteText}
              />
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

    //alert the user to confirm change in Edit mode
    if (route.params) {
      const nameOld = route.params.itemData.name;
      const quantityOld = route.params.itemData.quantity;
      const dateOld = parsedDate;

      if (
        nameOld !== activityType ||
        quantityOld !== duration ||
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
    const special = isSpecialActivity();
    setSpecial(special);

    //construct the data
    const data = {
      name: activityType,
      quantity: duration,
      date: date.toDateString(),
      special: isSpecialActivity(),
    };
    // save the data
    writeToDB(data, "Activities");
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={[styles.formItemContainer, { zIndex: 1000 }]}>
        {/* <Text style={styles.label}>Activity*</Text> */}
        <CustomText>Activity*</CustomText>
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
          textStyle={{ color: theme.textColor }}
          style={{
            borderColor: colors.textAndBorder,
            backgroundColor: theme.backgroundColor,
          }}
        />
      </View>
      <View style={styles.formItemContainer}>
        <CustomText>Duration (min)*</CustomText>
        <Input value={duration} onChangeText={setDuration} />
      </View>
      <View style={styles.formItemContainer}>
        {/* <Text style={styles.label}>Date*</Text> */}
        <CustomText>Date*</CustomText>
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
            <CustomText>
              This item is marked as special. Select the checkbox if you would
              like to approve it.
            </CustomText>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? colors.textAndBorder : undefined}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <PressableButton
            title="Cancel"
            onPress={handleCancel}
            style={{ width: "40%", backgroundColor: colors.cancelButton }}
          />
          <PressableButton
            title="Save"
            onPress={handleSave}
            style={{ width: "40%" }}
          />
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

  checkbox: {
    marginLeft: 5,
    borderColor: colors.textAndBorder,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 80,
  },
  textCheckboxContainer: {
    paddingBottom: 5,
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
