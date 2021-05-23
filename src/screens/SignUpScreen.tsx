import React from "react";
import { View } from "react-native";

import { TopNavigation } from "@ui-kitten/components";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Header from "../components/modules/Header";
import SignUpForm from "../components/modules/SignUpForm";

import i18n from "../i18n";

const SignUpScreen: React.FC = () => {
  return (
    <LayoutSafeArea>
      <TopNavigation
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
      />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <Header
            heading={i18n.t("sign_up_heading")}
            subheading={i18n.t("sign_up_subheading")}
          />
          <SignUpForm />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeArea>
  );
};

export default SignUpScreen;
