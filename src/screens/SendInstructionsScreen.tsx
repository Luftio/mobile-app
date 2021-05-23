import React from "react";
import { View } from "react-native";

import { TopNavigation } from "@ui-kitten/components";

import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Header from "../components/modules/Header";
import EmailClients from "../components/modules/EmailClients";

import i18n from "../i18n";

const SendInstructionsScreen: React.FC = () => {
  return (
    <LayoutSafeArea>
      <TopNavigation
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
      />
      <View style={{ flex: 1, padding: 24 }}>
        <Header
          heading={i18n.t("send_instructions_heading")}
          subheading={i18n.t("send_instructions_subheading")}
        />
        <EmailClients />
      </View>
    </LayoutSafeArea>
  );
};

export default SendInstructionsScreen;
