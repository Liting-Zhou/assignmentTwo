import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Settings from "./Settings";
import Contents from "./Contents";
import PressableButton from "../components/PressableButton";
import colors from "../colors";

const Tab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.headerBackground,
        },
        tabBarActiveTintColor: colors.tabIconFocused,
      }}
    >
      <Tab.Screen
        name="Activities"
        component={Contents}
        initialParams={{ content: "Activities" }}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="directions-run"
              size={size}
              color={focused ? colors.tabIconFocused : colors.header}
            />
          ),
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTintColor: colors.header,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("AddActivity")}>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <MaterialIcons name="add" size={24} color={colors.header} />
                <MaterialIcons
                  name="directions-run"
                  size={24}
                  color={colors.header}
                />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Diet"
        component={Contents}
        initialParams={{ content: "Diet" }}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="fastfood"
              size={size}
              color={focused ? colors.tabIconFocused : colors.header}
            />
          ),
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTintColor: colors.header,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("AddDiet")}>
              <View style={{ flexDirection: "row", marginRight: 10 }}>
                <MaterialIcons name="add" size={24} color={colors.header} />
                <MaterialIcons
                  name="fastfood"
                  size={24}
                  color={colors.header}
                />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="settings"
              size={size}
              color={focused ? colors.tabIconFocused : colors.header}
            />
          ),
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTintColor: colors.header,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
