import React from "react";
import { View, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Text, Button } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Logo from "../components/svg/Logo";

import i18n from "../i18n";

type signpostScreenProp = StackNavigationProp<RootStackParamList, "Signpost">;

const SignpostScreen: React.FC = () => {
  const navigation = useNavigation<signpostScreenProp>();

  return (
    <LayoutSafeArea>
      <View style={{ flex: 1, padding: 24 }}>
        <Logo />
        <View style={{ paddingTop: 40, paddingBottom: 40 }}>
          <Text
            category="h2"
            appearance="default"
            style={{ paddingBottom: 15 }}>
            {i18n.t("signpost_heading")}
          </Text>
          <Text category="s2">{i18n.t("signpost_subheading")}</Text>
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: 30,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image
            style={{ width: 310, height: 302 }}
            source={require("../../assets/man-walking.png")}
          />
        </View>
        <Button
          size="large"
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate("Home")}>
          {i18n.t("sign_in")}
        </Button>
        <Button
          size="large"
          appearance="outline"
          onPress={() => navigation.navigate("SignUp")}>
          {i18n.t("sign_up")}
        </Button>
      </View>
    </LayoutSafeArea>
  );
};

export default SignpostScreen;
