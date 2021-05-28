import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import AppLoading from "expo-app-loading";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import FeatherIconsPack from "./src/ui/FeatherIconsPack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import OnboardingScreen from "./src/screens/OnboardingScreen";
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

import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://e4e62e9009ce42a1aef84d6286896a36@o550006.ingest.sentry.io/5786541",
  enableInExpoDevelopment: true,
  debug: false,
});

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  let colorScheme = useColorScheme();
  let firstScreen: string;

  const [viewedOnboarding, setWiewedOnboarding] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const loadApp = async () => {
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
    loadApp();
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onFinish={() => setIsReady(true)}
        onError={console.error}
      />
    );
  }

  if (!viewedOnboarding) {
    firstScreen = "Onboarding";
  } else {
    firstScreen = "Signpost";
  }

  const screens: {
    name: keyof RootStackParamList;
    component: React.ReactNode;
  }[] = [
    { name: "Signpost", component: SignpostScreen },
    { name: "Onboarding", component: OnboardingScreen },
    { name: "SignIn", component: SignInScreen },
    { name: "SignUp", component: SignUpScreen },
    { name: "RequestChange", component: RequestChangeScreen },
    { name: "SetNewPassword", component: SetNewPasswordScreen },
    { name: "VerifyEmail", component: VerifyEmailScreen },
    { name: "SendInstructions", component: SendInstructionsScreen },
    { name: "Home", component: TabNavigator },
    { name: "FeedbackSuccess", component: FeedbackSuccessScreen },
  ];

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
            {screens
              .sort((a, b) => {
                if (a.name == firstScreen) return -1;
                if (b.name == firstScreen) return 1;
                return 0;
              })
              .map((it: any) => (
                <Stack.Screen key={it.name} {...it} />
              ))}
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
