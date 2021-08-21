import React from "react";
import { View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Header from "../components/modules/Header";
import SignInForm from "../components/modules/forms/SignInForm";

import i18n from "../i18n";

const LoginScreen: React.FC = () => {
  return (
    <LayoutSafeArea>
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, padding: 24, paddingTop: 80 }}>
          <Header heading={i18n.t("sign_in_heading")} subheading={i18n.t("sign_in_subheading")} />
          <SignInForm />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeArea>
  );
};

export default LoginScreen;
