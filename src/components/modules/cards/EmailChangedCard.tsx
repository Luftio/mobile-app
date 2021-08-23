import React from "react";
import { View } from "react-native";

import { Icon, Text } from "@ui-kitten/components";

import i18n from "../../../i18n";

const EmailChangedCard: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#FFE660",
        padding: 15,
        borderRadius: 4,
        marginBottom: 15,
        alignItems: "center",
      }}>
      <Icon name="alert-triangle" style={{ color: "#fff", width: 24, height: 24, marginRight: 10 }} />
      <Text style={{ color: "#fff", fontWeight: "500", fontFamily: "Montserrat_500Medium" }}>
        {i18n.t("account_edit_email_changed")}
      </Text>
    </View>
  );
};

export default EmailChangedCard;
