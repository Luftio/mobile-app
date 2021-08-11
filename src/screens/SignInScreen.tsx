import React from "react";
import { View } from "react-native";

import { TopNavigation } from "@ui-kitten/components";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Header from "../components/modules/Header";
import LoginForm from "../components/modules/SignInForm";

import i18n from "../i18n";

const LoginScreen: React.FC = () => {
  return (
    <LayoutSafeArea>
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <Header heading={i18n.t("sign_in_heading")} subheading={i18n.t("sign_in_subheading")} />
          <LoginForm />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeArea>
  );
};

export default LoginScreen;
