import React from "react";
import { View } from "react-native";

import { Text } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import FeedbackForm from "../components/modules/FeedbackForm";

import i18n from "../i18n";

const FeedbackScreen: React.FC = () => {
  return (
    <LayoutSafeArea main>
      <View style={{ flex: 1, padding: 24, paddingTop: 40 }}>
        <View
          style={{
            alignItems: "center",
          }}>
          <Text
            category="h1"
            style={{ textAlign: "center", marginLeft: 15, marginRight: 15 }}>
            {i18n.t("feedback_heading")}
          </Text>
        </View>
        <FeedbackForm />
      </View>
    </LayoutSafeArea>
  );
};

export default FeedbackScreen;
