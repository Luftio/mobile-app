import React from "react";
import { View } from "react-native";

import { Text, TopNavigation } from "@ui-kitten/components";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import AccountEditForm from "../components/modules/forms/AccountEditForm";

import i18n from "../i18n";

const AccountEditScreen: React.FC = () => {
  return (
    <LayoutSafeArea main ignoreBottom>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("profile_account")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <AccountEditForm />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeArea>
  );
};

export default AccountEditScreen;
