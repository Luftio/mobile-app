import React from "react";
import { View } from "react-native";

import { Text, TopNavigation, Button } from "@ui-kitten/components";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import ReportProblemForm from "../components/modules/forms/ReportProblemForm";

import i18n from "../i18n";

const ReportProblemScreen: React.FC = () => {
  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("profile_problem")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <ReportProblemForm />
        </View>
      </KeyboardAwareScrollView>
    </LayoutSafeArea>
  );
};

export default ReportProblemScreen;
