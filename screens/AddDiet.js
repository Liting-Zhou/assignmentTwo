import { StyleSheet, View, Pressable, Alert } from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../ThemeContext";
import Input from "../components/Input";
import PressableButton from "../components/PressableButton";
import CustomText from "../components/CustomText";
import colors from "../colors";
import {
  writeToDB,
  updateDocInDB,
  deleteFromDB,
} from "../firebase/firebaseHelper";

export default function AddDiet({ route }) {
  // retrieve the current theme from the ThemeContext
  const { theme } = useContext(ThemeContext);
  // if an item is clicked, the route will have the item data
  // otherwise, use default values
  const itemData = route.params
    ? route.params.itemData
    : { date: new Date(), id: 0, name: "", quantity: "", special: false };
  const parsedDate = new Date(itemData.date); //parse the date string to Date object
  const [description, setDescription] = useState(itemData.name);
  const [calories, setCalories] = useState(itemData.quantity);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(parsedDate);
  const [special, setSpecial] = useState(itemData.special);
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  // if route.params exists, set the title to "Edit" and add a delete button
  useLayoutEffect(() => {
    const headerTitle = route.params ? "Edit" : "Add A Diet Entry";
    navigation.setOptions({
      headerTitle,
      headerRight: () =>
        route.params ? (
          <Pressable
            onPress={() => handleDelete(route.params.itemData.id)}
            style={({ pressed }) => {
              return pressed && styles.pressedStyle;
            }}
          >
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

  const handleDelete = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteFromDB(id, "Diet");
          navigation.goBack();
        },
      },
    ]);
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
    //construct the data
    const data = {
      name: description,
      quantity: calories,
      date: date.toDateString(),
      special: isSpecial(),
    };
    //alert the user to confirm change in Edit mode
    if (route.params) {
      const nameOld = route.params.itemData.name;
      const quantityOld = route.params.itemData.quantity;
      const dateOld = parsedDate;
      //only alert the user if there is a change
      if (
        nameOld !== description ||
        quantityOld !== calories ||
        dateOld !== date
      ) {
        if (special && !isChecked) {
          Alert.alert("Error", "Please approve the special entry.");
          return;
        }
        Alert.alert(
          "Important",
          "Are you sure you want to save these changes?",
          [
            {
              text: "No",
            },
            {
              text: "Yes",
              onPress: () => {
                updateDocInDB(route.params.itemData.id, data, "Diet");
                navigation.goBack();
              },
            },
          ]
        );
      } else {
        //if no changes, just go back
        navigation.goBack();
      }
    } else {
      // if not in Edit mode, just save to the database
      writeToDB(data, "Diet");
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.formItemContainer}>
        <CustomText>Description*</CustomText>
        <Input
          value={description}
          onChangeText={setDescription}
          style={styles.description}
        />
      </View>
      <View style={styles.formItemContainer}>
        <CustomText>Calories*</CustomText>
        <Input value={calories} onChangeText={setCalories} />
      </View>
      <View style={styles.formItemContainer}>
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

  description: {
    height: 80,
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
  pressedStyle: {
    opacity: 0.5,
  },
});
