import React from "react";
import { View, Image } from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Text, Button } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";

import i18n from "../i18n";

type signpostScreenProp = StackNavigationProp<RootStackParamList, "Onboarding">;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<signpostScreenProp>();

  const data = [
    {
      key: "one",
      title: i18n.t("onboarding_1_title"),
      text: i18n.t("onboarding_1_text"),
      image: require("../../assets/onboarding-2.png"),
    },
    {
      key: "two",
      title: i18n.t("onboarding_2_title"),
      text: i18n.t("onboarding_2_text"),
      image: require("../../assets/onboarding-3.png"),
    },
    {
      key: "three",
      title: i18n.t("onboarding_3_title"),
      text: i18n.t("onboarding_3_text"),
      image: require("../../assets/onboarding-1.png"),
    },
  ];

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 0.8 }}>
        <Image source={item.image} style={{ width: 230, height: 200, marginBottom: 40 }} />
        <View style={{ paddingLeft: 30, paddingRight: 30 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "600",
              fontFamily: "OpenSans_600SemiBold",
              marginBottom: 30,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const viewedOnboarding = async () => {
    console.log("viewedOnboarding");
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
      navigation.replace("SignIn");
    } catch (err) {
      console.log("Error @setItem: ", err);
    }
  };

  return (
    <LayoutSafeArea>
      <AppIntroSlider
        data={data}
        renderItem={renderItem}
        dotStyle={{ backgroundColor: "#E4E4E4", marginBottom: 10 }}
        activeDotStyle={{ backgroundColor: "#C4C4C4", marginBottom: 10 }}
        onSkip={() => viewedOnboarding()}
        renderSkipButton={() => (
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 15,
              marginRight: 15,
            }}>
            <Text style={{ fontWeight: "500", fontFamily: "OpenSans_500Medium" }}>{i18n.t("skip")}</Text>
          </View>
        )}
        renderNextButton={() => (
          <View
            style={{
              marginLeft: 15,
              marginBottom: 15,
              marginTop: 35,
            }}>
            <Text style={{ fontWeight: "500", fontFamily: "OpenSans_500Medium" }}>{i18n.t("next")}</Text>
          </View>
        )}
        renderDoneButton={() => (
          <Button size="large" onPress={() => viewedOnboarding()} style={{ marginTop: 20 }}>
            {i18n.t("start")}
          </Button>
        )}
        bottomButton
        showSkipButton
      />
    </LayoutSafeArea>
  );
};

export default OnboardingScreen;
