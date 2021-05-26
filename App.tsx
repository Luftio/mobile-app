import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import FeatherIconsPack from "./src/ui/FeatherIconsPack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import OnbaordingScreen from "./src/screens/OnboardingScreen";
import SignpostScreen from "./src/screens/SignpostScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import RequestChangeScreen from "./src/screens/RequestChangeScreen";
import SetNewPasswordScreen from "./src/screens/SetNewPasswordScreen";
import VerifyEmailScreen from "./src/screens/VerifyEmailScreen";
import SendInstructionsScreen from "./src/screens/SendInstructionsScreen";
import FeedbackSuccessScreen from "./src/screens/FeedbackSuccessScreen";

import { TabNavigator } from "./src/utils/TabNavigator";

import { RootStackParamList } from "./src/screens/RootStackParams";

import { default as theme } from "./config/theme.json";
import { default as mapping } from "./config/mapping.json";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  let colorScheme = useColorScheme();

  const [viewedOnboarding, setWiewedOnboarding] = useState<boolean>(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setWiewedOnboarding(true);
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <IconRegistry
        icons={[FeatherIconsPack, EvaIconsPack]}
        defaultIcons="feather"
      />
      <ApplicationProvider
        {...eva}
        theme={{
          ...(colorScheme === "light" ? eva.light : eva.light),
          ...theme,
        }}
        //@ts-ignore
        customMapping={mapping}>
        <NavigationContainer>
          <Stack.Navigator
            headerMode="none"
            screenOptions={{ animationEnabled: true }}>
            {viewedOnboarding ? (
              <Stack.Screen name="Signpost" component={SignpostScreen} />
            ) : (
              <Stack.Screen name="Onboarding" component={OnbaordingScreen} />
            )}
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="RequestChange"
              component={RequestChangeScreen}
            />
            <Stack.Screen
              name="SetNewPassword"
              component={SetNewPasswordScreen}
            />
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
            <Stack.Screen
              name="SendInstructions"
              component={SendInstructionsScreen}
            />
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen
              name="FeedbackSuccess"
              component={FeedbackSuccessScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default () => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);
