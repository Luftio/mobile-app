import React from "react";
import { Image, Linking } from "react-native";

import { Button } from "@ui-kitten/components";

import i18n from "../../i18n";

const EmailClients: React.FC = () => {
  return (
    <>
      <Button
        size="large"
        appearance="outline"
        style={{ marginBottom: 15 }}
        accessoryLeft={() => (
          <Image
            style={{ width: 24, height: 19 }}
            source={require("../../../assets/gmail.png")}
          />
        )}
        onPress={() => Linking.openURL("https://mail.google.com/")}>
        {i18n.t("open_gmail")}
      </Button>
      <Button
        size="large"
        appearance="outline"
        style={{ marginBottom: 15 }}
        accessoryLeft={() => (
          <Image
            style={{ width: 22, height: 24 }}
            source={require("../../../assets/outlook.png")}
          />
        )}
        onPress={() => Linking.openURL("https://outlook.live.com/mail")}>
        {i18n.t("open_outlook")}
      </Button>
      <Button
        size="large"
        appearance="outline"
        accessoryLeft={() => (
          <Image
            style={{ width: 23, height: 13 }}
            source={require("../../../assets/seznam.png")}
          />
        )}
        onPress={() => Linking.openURL("https://email.seznam.cz/")}>
        {i18n.t("open_seznam")}
      </Button>
    </>
  );
};

export default EmailClients;
