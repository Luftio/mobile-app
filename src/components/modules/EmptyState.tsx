import React from "react";
import { View, Image } from "react-native";

import { Text } from "@ui-kitten/components";

import i18n from "../../i18n";

const EmptyState = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image
        source={require("../../../assets/empty-state.png")}
        style={{ width: 298, height: 250 }}
      />
      <Text
        category="p1"
        style={{ color: "#838C97", transform: [{ translateY: -55 }] }}>
        {i18n.t("notifications_screen_empty_state")}
      </Text>
    </View>
  );
};

export default EmptyState;
