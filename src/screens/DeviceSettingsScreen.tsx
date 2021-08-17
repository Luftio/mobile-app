import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";

import { Icon, Input, Radio, RadioGroup, Text, TopNavigation } from "@ui-kitten/components";

import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";

import i18n from "../i18n";

import { useGetDeviceAttributesQuery, useSaveDeviceAttributesMutation } from "../graphql";

interface DeviceSettingsScreenProps {
  route: {
    params: {
      device: {
        id: string;
        label: string;
      };
    };
  };
}

const DeviceSettingsScreen: React.FC<DeviceSettingsScreenProps> = ({ route }) => {
  const NIGHT_MODES = ["inactive", "off", "low"];
  const [nightMode, setNightMode] = useState<string | undefined>();
  const [startTime, setStartTime] = useState<string | undefined>();
  const [endTime, setEndTime] = useState<string | undefined>();
  const { device } = route.params;

  const getDeviceAttributesQuery = useGetDeviceAttributesQuery({ skip: true });
  const [saveDeviceAttributesMutation] = useSaveDeviceAttributesMutation();

  function validateTime(time: any) {
    if (time == null) return true;
    return time.match(/^\d{1,2}:\d{2}$/);
  }

  function toUTCTime(time: string) {
    const date = new Date();
    date.setHours(+time.split(":")[0]);
    date.setMinutes(+time.split(":")[1]);
    return date.getUTCHours() + ":" + (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();
  }
  function toLocalTime(time: string) {
    const date = new Date();
    date.setUTCHours(+time.split(":")[0]);
    date.setUTCMinutes(+time.split(":")[1]);
    return date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  }
  async function loadSettings() {
    const result = await getDeviceAttributesQuery.refetch({ id: device.id });
    const settings = JSON.parse(result.data.deviceAttributes.attributes).find(
      (it: { key: string; value: string }) => it.key == "nightmode_settings"
    );
    if (settings) {
      return JSON.parse(settings.value);
    }
    return null;
  }
  async function loadData() {
    try {
      const settingsValue = await loadSettings();
      if (settingsValue) {
        setNightMode(settingsValue.mode);
        setStartTime(toLocalTime(settingsValue.start));
        setEndTime(toLocalTime(settingsValue.end));
        return;
      }
    } catch (error) {
      console.error(error);
    }
    setNightMode("inactive");
    setStartTime("21:00");
    setEndTime("7:00");
  }

  const saveNightMode = async (nightMode?: string) => {
    if (nightMode == null || startTime == null || endTime == null) return;
    const settingsValue = await loadSettings();
    const newSettings = {
      ...settingsValue,
      mode: nightMode,
      start: toUTCTime(startTime),
      end: toUTCTime(endTime),
    };
    const data = JSON.stringify({
      nightmode_settings: JSON.stringify(newSettings),
    });
    saveDeviceAttributesMutation({ variables: { id: device.id, data } });
  };

  useEffect(() => {
    loadData();
  }, [device.id]);

  const handleSetNightMode = (mode: string) => {
    setNightMode(mode);
    saveNightMode(mode);
  };

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
        <Text category="h3" style={{ marginBottom: 4 }}>
          {i18n.t("profile_night_mode")}
        </Text>
        <Text category="s1" style={{ marginBottom: 8 }}>
          {i18n.t("profile_night_mode_desc")}
        </Text>
        <RadioGroup
          selectedIndex={NIGHT_MODES.indexOf(nightMode || "")}
          onChange={(index) => handleSetNightMode(NIGHT_MODES[index])}>
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
            value={startTime || ""}
            status={validateTime(startTime) ? "basic" : "danger"}
            accessoryLeft={() => <Icon style={{ color: "#E1E6EA", width: 22, height: 22 }} name="sunset" />}
            onChangeText={(text) => setStartTime(text)}
            onBlur={() => saveNightMode(nightMode)}
            style={{ flex: 1, marginRight: 10 }}
          />
          <Input
            label={() => (
              <Text category="label" style={{ marginBottom: 5 }}>
                {i18n.t("night_mode_end")}
              </Text>
            )}
            size="large"
            value={endTime || ""}
            status={validateTime(endTime) ? "basic" : "danger"}
            accessoryLeft={() => <Icon style={{ color: "#E1E6EA", width: 22, height: 22 }} name="sunrise" />}
            onChangeText={(text) => setEndTime(text)}
            onBlur={() => saveNightMode(nightMode)}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </LayoutSafeArea>
  );
};

export default DeviceSettingsScreen;
