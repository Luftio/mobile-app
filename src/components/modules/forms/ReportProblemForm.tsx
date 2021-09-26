import React, { useState } from "react";
import * as Sentry from "sentry-expo";

import { View } from "react-native";
import { Button, Input, Text, Icon } from "@ui-kitten/components";

import i18n from "../../../i18n";
import ThingsboardService from "../../../services/ThingsboardService";
import { useNavigation } from "@react-navigation/native";

import { showMessage } from "react-native-flash-message";

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

    const userData = await ThingsboardService.getInstance().getUserData();
    Sentry.Browser.captureMessage("User report " + userData?.email + " - " + message);

    navigation.goBack();

    showMessage({
      message: i18n.t("report_success_heading"),
      description: i18n.t("report_success_subheading"),
      type: "success",
      icon: { icon: "success", position: "left" },
      duration: 2500,
      renderFlashMessageIcon: () => (
        <Icon name="check-circle" style={{ color: "#fff", width: 24, height: 24, marginRight: 8 }} />
      ),
      style: { paddingBottom: 20 },
    });
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
