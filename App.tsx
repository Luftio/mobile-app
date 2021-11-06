import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import * as Linking from "expo-linking";

import { ApolloProvider } from "@apollo/client";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import FeatherIconsPack from "./src/ui/FeatherIconsPack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import OnboardingScreen from "./src/screens/OnboardingScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import RequestChangeScreen from "./src/screens/RequestChangeScreen";
import SetNewPasswordScreen from "./src/screens/SetNewPasswordScreen";
import VerifyEmailScreen from "./src/screens/VerifyEmailScreen";
import SendInstructionsScreen from "./src/screens/SendInstructionsScreen";
import FeedbackSuccessScreen from "./src/screens/FeedbackSuccessScreen";

import FlashMessage from "react-native-flash-message";

import ThingsboardService from "./src/services/ThingsboardService";
import { TabNavigator } from "./src/utils/TabNavigator";

import { RootStackParamList } from "./src/screens/RootStackParams";

import { default as theme } from "./config/theme.json";
import { mapping } from "./config/mapping";
import { client } from "./src/config/ApolloClient";
import { GlobalLogout } from "./src/utils/GlobalLogout";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://e4e62e9009ce42a1aef84d6286896a36@o550006.ingest.sentry.io/5786541",
  enableInExpoDevelopment: true,
  debug: false,
});

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const colorScheme = useColorScheme();

  const navigationRef = useNavigationContainerRef();

  const [firstScreen, setFirstScreen] = useState<string>();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const handleUrl = ({ url }: { url: string }) => {
    const parsed = Linking.parse(url);
    const pathParts = parsed.path?.split("/");
    if (pathParts && pathParts[pathParts?.length - 2] === "loginWithToken") {
      const token = pathParts[pathParts?.length - 1];
      AsyncStorage.setItem("token", token);
      if (navigationRef.isReady()) {
        navigationRef.resetRoot({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    }
  };

  useEffect(() => {
    Linking.addEventListener("url", handleUrl);
    return () => {
      Linking.removeEventListener("url", handleUrl);
    };
  });

  const handleLogout = () => {
    if (navigationRef.isReady()) {
      navigationRef.resetRoot({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    }
  };
  useEffect(() => {
    GlobalLogout.addListener(handleLogout);
    return () => {
      GlobalLogout.removeListener(handleLogout);
    };
  });

  const loadApp = async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      handleUrl({ url });
    }

    // Check login
    try {
      const _loggedIn = await ThingsboardService.getInstance().isLoggedIn();
      setFirstScreen("Home");
      return;
    } catch (error) {
      console.log(error);
    }
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setFirstScreen("SignIn");
        return;
      }
    } catch (err) {
      console.log("Error @checkOnboarding: ", err);
    }
    setFirstScreen("Onboarding");
  };

  if (!fontsLoaded || firstScreen === undefined) {
    return <AppLoading startAsync={loadApp} onFinish={() => {}} onError={console.error} />;
  }

  const screens: {
    name: keyof RootStackParamList;
    component: React.ReactNode;
  }[] = [
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
      <IconRegistry icons={[FeatherIconsPack, EvaIconsPack]} defaultIcons="feather" />
      <ApplicationProvider
        {...eva}
        theme={{
          ...(colorScheme === "light" ? eva.light : eva.light),
          ...theme,
        }}
        //@ts-ignore
        customMapping={mapping}>
        <ApolloProvider client={client}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}>
              {screens
                .sort((a, b) => {
                  if (a.name == firstScreen) return -1;
                  if (b.name == firstScreen) return 1;
                  return 0;
                })
                .map((it: any) => (
                  <Stack.Screen key={it.name} options={{ headerShown: false }} {...it} />
                ))}
            </Stack.Navigator>
          </NavigationContainer>
          <FlashMessage position="top" />
        </ApolloProvider>
      </ApplicationProvider>
    </>
  );
};

export default () => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);
