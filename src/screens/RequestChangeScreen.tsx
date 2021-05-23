import React from "react";
import { View } from "react-native";

import { TopNavigation } from "@ui-kitten/components";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Header from "../components/modules/Header";
import RequestChangeForm from "../components/modules/RequestChangeForm";

import i18n from "../i18n";

const RequestChangeScreen: React.FC = () => {
  return (
    <LayoutSafeArea>
      <TopNavigation
        alignment="center"
        //@ts-ignore
        accessoryLeft={() => renderBackAction()}
      />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <Header
            heading={i18n.t("request_change_heading")}
            subheading={i18n.t("request_change_subheading")}
          />
          <RequestChangeForm />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeArea>
  );
};

export default RequestChangeScreen;
