import React, { useState } from "react";
import * as Sentry from "sentry-expo";

import { Alert } from "react-native";
import { Button, Input } from "@ui-kitten/components";

import i18n from "../../i18n";
import ThingsboardService from "../../services/ThingsboardService";
import { useNavigation } from "@react-navigation/native";

const ReportProblemForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const navigation = useNavigation();

  async function report() {
    Alert.alert("", i18n.t("feedback_success_heading"), [
      {
        text: "OK",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
    const userData = await ThingsboardService.getInstance().getUserData();
    Sentry.Browser.captureMessage("User report " + userData?.email + " - " + message);
  }

  return (
    <>
      <Input
        size="large"
        placeholder={i18n.t("report_problem_placeholder")}
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={{ marginBottom: 30 }}
        multiline={true}
        textStyle={{ minHeight: 150 }}
      />
      <Button size="large" onPress={() => report()}>
        {i18n.t("report_problem_button_text")}
      </Button>
    </>
  );
};

export default ReportProblemForm;
