import React, { useState } from "react";
import { View } from "react-native";

import { Icon, Input, Radio, RadioGroup, Text, TopNavigation } from "@ui-kitten/components";

import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";

import i18n from "../i18n";

import { useQuery } from "../gqless";

const DeviceSettingsScreen: React.FC = ({ route }) => {
  const [startTime, setStartTime] = useState("23:00");
  const [endTime, setEndTime] = useState("7:00");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const { device } = route.params;

  function validateTime(time: any) {
    if (time == null) return true;
    return time.match(/^\d{1,2}:\d{2}$/);
  }

  const query = useQuery();
  const nightmode = query.nightmode;

  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">{device.title}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <View style={{ flex: 1, padding: 24 }}>
        <Text category="h4">{i18n.t("profile_night_mode")}</Text>
        <RadioGroup selectedIndex={selectedIndex} onChange={(index) => setSelectedIndex(index)}>
          <Radio>{i18n.t("night_mode_status_off")}</Radio>
          <Radio>{i18n.t("night_mode_status_no_lights")}</Radio>
          <Radio>{i18n.t("night_mode_status_low_lights")}</Radio>
        </RadioGroup>
        <View style={{ flexDirection: "row", marginTop: 25 }}>
          <Input
            label={() => (
              <Text category="label" style={{ marginBottom: 5 }}>
                {i18n.t("night_mode_start")}
              </Text>
            )}
            size="large"
            value={startTime}
            status={validateTime(startTime) ? "basic" : "danger"}
            accessoryLeft={() => <Icon style={{ color: "#E1E6EA", width: 22, height: 22 }} name="sunset" />}
            onChangeText={(text) => setStartTime(text)}
            style={{ flex: 1, marginRight: 10 }}
          />
          <Input
            label={() => (
              <Text category="label" style={{ marginBottom: 5 }}>
                {i18n.t("night_mode_end")}
              </Text>
            )}
            size="large"
            value={endTime}
            status={validateTime(endTime) ? "basic" : "danger"}
            accessoryLeft={() => <Icon style={{ color: "#E1E6EA", width: 22, height: 22 }} name="sunrise" />}
            onChangeText={(text) => setEndTime(text)}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </LayoutSafeArea>
  );
};

export default DeviceSettingsScreen;
