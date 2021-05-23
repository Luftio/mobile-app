import React from "react";
import { View } from "react-native";

import { Text, TopNavigation } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import DeviceCard from "../components/modules/DeviceCard";

import i18n from "../i18n";

const MyDevicesScreen: React.FC = () => {
  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("profile_devices")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <View style={{ flex: 1, padding: 24 }}>
        <DeviceCard name="Zasedačka" code="L0135C1L" />
      </View>
    </LayoutSafeArea>
  );
};

export default MyDevicesScreen;
