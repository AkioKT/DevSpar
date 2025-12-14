import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { LivesProvider } from "./src/context/LivesContext";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useState } from "react";
import "react-native-url-polyfill/auto";
import GetStarted from "./src/GetStarted";
import SelectCategory from "./src/features/learn/screens/SelectCategory";
import HtmlLevel from "./src/features/learn/screens/HtmlLevel";
import CssLevel from "./src/features/learn/screens/CssLevel";
import JavascriptLevel from "./src/features/learn/screens/JSLevel";
import PythonLevel from "./src/features/learn/screens/PythonLevel";
import PHPLevel from "./src/features/learn/screens/PHPLevel";
import NavigationHTML from "./src/navigation/NavigationHTML";
import NavigationCSS from "./src/navigation/NavigationCSS";
import NavbarButtom from "./src/componentsglobal/NavbarBottom";
import HomeScreen from "./src/features/home/screens/HomeScreen";
import LearningScreenHTML from "./src/features/learn/screens/LearningScreenHTML";
import LearningScreenCSS from "./src/features/learn/screens/LearningScreenCSS";
import { ProgressProvider } from "./src/context/ProgressOverview";
import { SettingsProvider } from "./src/context/SettingsContext";
import { EquipmentProvider } from "./src/context/EquipmentContext";
import DebugSettings from "./src/context/DebugSettings";
import { StackScreen } from "react-native-screens";
import ProfileScreen from "./src/features/profile/screens/ProfileScreen";
import BattleLobby from "./src/battle/BattleLobby";
import BattleRoom from "./src/battle/BattleRoom";
import BattleScreen from "./src/battle/BattleScreen";
import PracticeScreen from "./src/features/practice/screens/PracticeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [sound, setSound] = useState();

  // async function playMusic() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("./assets/sounds/Boba_Date.mp3"),
  //     {
  //       volume: 0.2,
  //       isLooping: true,
  //       shouldPlay: true,
  //     }
  //   );

  //   setSound(sound);
  //   await sound.playAsync();
  // }

  // useEffect(() => {
  //   playMusic();

  //   return () => {
  //     if (sound) {
  //       sound.unloadAsync(); // cleanup agar tidak double play
  //     }
  //   };
  // }, []);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden"); // sembunyikan bar bawah
    NavigationBar.setBehaviorAsync("overlay-swipe"); // tetap bisa swipe untuk munculkan
  }, []);
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Poppins" };
  return (
    <SettingsProvider>
      <LivesProvider>
        <ProgressProvider>
          <EquipmentProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="GetStarted"
                screenOptions={{
                  headerShown: false, // biar tampilan lebih bersih
                }}
              >
                <Stack.Screen name="GetStarted" component={GetStarted} />
                <Stack.Screen
                  name="SelectCategory"
                  component={SelectCategory}
                />
                <Stack.Screen name="MainTabs" component={NavbarButtom} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="HtmlLevel" component={HtmlLevel} />
                <Stack.Screen name="CssLevel" component={CssLevel} />
                <Stack.Screen
                  name="JavascriptLevel"
                  component={JavascriptLevel}
                />
                <Stack.Screen name="PythonLevel" component={PythonLevel} />
                <Stack.Screen name="PHPLevel" component={PHPLevel} />
                <Stack.Screen
                  name="NavigationHTML"
                  component={NavigationHTML}
                />
                <Stack.Screen
                  name="NavigationCSS"
                  component={NavigationCSS}
                />
                <Stack.Screen
                  name="LearningScreenHTML"
                  component={LearningScreenHTML}
                />
                <Stack.Screen
                  name="LearningScreenCSS"
                  component={LearningScreenCSS}
                />
                <Stack.Screen
                  name="PracticeScreen"
                  component={PracticeScreen}
                />
                <Stack.Screen
                  name="BattleLobby"
                  component={BattleLobby}
                  options={{ headerShown: false }}
                />

                <Stack.Screen name="BattleRoom" component={BattleRoom} />
                <Stack.Screen name="BattleScreen" component={BattleScreen} />
              </Stack.Navigator>
              <StatusBar hidden={true} />
            </NavigationContainer>
          </EquipmentProvider>
        </ProgressProvider>
      </LivesProvider>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
});
