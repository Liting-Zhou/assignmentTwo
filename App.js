import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import Home from "./screens/Home";
import AddActivity from "./screens/AddActivity";
import AddDiet from "./screens/AddDiet";
import { ThemeProvider } from "./ThemeContext";
import colors from "./colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddActivity"
            component={AddActivity}
            options={{
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: colors.headerBackground,
              },
              headerTintColor: colors.whiteText,
            }}
          />
          <Stack.Screen
            name="AddDiet"
            component={AddDiet}
            options={{
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: colors.headerBackground,
              },
              headerTintColor: colors.whiteText,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // backgroundColor: "#fff",
  //   backgroundColor: theme.backgroundColor,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
