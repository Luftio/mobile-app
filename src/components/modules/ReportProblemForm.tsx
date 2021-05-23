import React, { useState } from "react";

import { Button, Input } from "@ui-kitten/components";

import i18n from "../../i18n";

const ReportProblemForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  function Report() {
    console.log(message);
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
      <Button size="large" onPress={() => Report()}>
        {i18n.t("report_problem_button_text")}
      </Button>
    </>
  );
};

export default ReportProblemForm;
