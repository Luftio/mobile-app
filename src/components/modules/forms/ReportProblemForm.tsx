import React, { useState } from "react";
import * as Sentry from "sentry-expo";

import { Alert, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";

import i18n from "../../../i18n";
import ThingsboardService from "../../../services/ThingsboardService";
import { useNavigation } from "@react-navigation/native";

const ReportProblemForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  const navigation = useNavigation();

  async function report() {
    if (!message) {
      setError("msg_report_required");
      return;
    }

    setError(null);

    Alert.alert(i18n.t("report_success_heading"), i18n.t("report_success_subheading"), [
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
      <View style={{ marginBottom: 30 }}>
        <Input
          size="large"
          placeholder={i18n.t("report_problem_placeholder")}
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline={true}
          textStyle={{ minHeight: 150 }}
        />
        {error != null && (
          <Text category="c2" status="danger" style={{ marginTop: 8 }}>
            {i18n.t(error)}
          </Text>
        )}
      </View>
      <Button size="large" onPress={() => report()}>
        {i18n.t("report_problem_button_text")}
      </Button>
    </>
  );
};

export default ReportProblemForm;
