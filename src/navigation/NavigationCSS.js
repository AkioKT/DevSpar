import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LearningCSS from "../features/learn/screens/LearningScreenCSS";

const Stack = createNativeStackNavigator();

export default function NavigationCSS() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LearningCSS" component={LearningCSS} />
    </Stack.Navigator>
  );
}
