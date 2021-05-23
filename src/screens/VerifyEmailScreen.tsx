import React from "react";
import { View } from "react-native";

import { TopNavigation } from "@ui-kitten/components";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Header from "../components/modules/Header";
import EmailClients from "../components/modules/EmailClients";

import i18n from "../i18n";

const VerifyEmailScreen: React.FC = () => {
  return (
    <LayoutSafeArea>
      <TopNavigation
        alignment="center"
        //@ts-ignore
        accessoryLeft={() => renderBackAction}
      />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <Header
            heading={i18n.t("verify_email_heading")}
            subheading={i18n.t("verify_email_subheading")}
          />
          <EmailClients />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeArea>
  );
};

export default VerifyEmailScreen;
