import React from "react";
import { View, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Button, Text } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";

import i18n from "../i18n";

type FeedbackSuccessScreenProp = StackNavigationProp<
  RootStackParamList,
  "FeedbackSuccess"
>;

const FeedbackSuccessScreen: React.FC = () => {
  const navigation = useNavigation<FeedbackSuccessScreenProp>();

  return (
    <>
      <LayoutSafeArea main>
        <View
          style={{
            flex: 1,
            padding: 24,
            paddingTop: 40,
          }}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{
                width: 310,
                height: 320,
                marginTop: 40,
                marginBottom: 25,
              }}
              source={require("../../assets/man-success.png")}
            />
            <Text
              category="h1"
              style={{ marginBottom: 20, textAlign: "center" }}>
              {" "}
              {i18n.t("feedback_success_heading")}
            </Text>
            <Text
              category="p1"
              style={{ marginBottom: 180, textAlign: "center" }}>
              {i18n.t("feedback_success_subheading")}
            </Text>
          </View>

          <Button size="large" onPress={() => navigation.navigate("Home")}>
            {i18n.t("feedback_success_button_text")}
          </Button>
        </View>
      </LayoutSafeArea>
    </>
  );
};

export default FeedbackSuccessScreen;
