import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView } from "react-native";
import * as Notifications from "expo-notifications";
import { Subscription } from "@unimodules/core";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Text, Icon, Button, Spinner, useTheme } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Slider from "../components/modules/Slider";
import MeasureCard from "../components/modules/MeasureCard";

import { ReanimatedArcBase } from "@intractive/reanimated-arc";
import Reanimated from "react-native-reanimated";

import i18n from "../i18n";
import PushService from "../services/PushService";
import LevelsService from "../services/LevelsService";

import {
  DeviceData,
  SetBrightnessInput,
  useGetBrightnessQuery,
  useGetDeviceDataQuery,
  useSetBrightnessMutation,
} from "../graphql";

type HomeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const selectedDeviceId = "c1523d50-c614-11eb-9b93-c7c640bc4881";

  const arcSweepAngle = Reanimated.useValue<number>(0);
  const tmpLampBrightness = useRef(255);
  const [lampBrightness, setLampBrightness] = useState<number>();
  const [lamp, setLamp] = useState<string>();

  const { data: devicesData, loading: devicesLoading } = useGetDeviceDataQuery({ variables: { id: selectedDeviceId } });
  const { data: brightnessData } = useGetBrightnessQuery({ variables: { id: selectedDeviceId } });
  const [setBrightness] = useSetBrightnessMutation();

  const score = Math.round(devicesData?.device_data?.data?.find((it: any) => it.type == "score")?.value || 0);
  useEffect(() => {
    arcSweepAngle.setValue(Math.round((score / 100) * 240));
  }, [score]);
  useEffect(() => {
    console.log("loaded brightness");
    if (brightnessData?.brightness.brightness) {
      setLampBrightness(brightnessData?.brightness.brightness);
    }
    if (brightnessData?.brightness.light) {
      setLamp(brightnessData?.brightness.light);
    }
  }, [brightnessData?.brightness.brightness, brightnessData?.brightness.light]);
  useEffect(() => {
    if (
      brightnessData?.brightness &&
      lamp !== undefined &&
      lampBrightness !== undefined &&
      (lamp !== brightnessData?.brightness.light || lampBrightness !== brightnessData?.brightness.brightness)
    ) {
      console.log("Updated brightness");
      setBrightness({ variables: { input: { id: selectedDeviceId, light: lamp, brightness: lampBrightness } } }).then(
        (result) => {
          console.log("Saved brightness ");
          console.log(result.data?.setBrightness.brightness);
          console.log(result.data?.setBrightness.light);
          console.log("  ");
        }
      );
    }
  }, [lamp, lampBrightness]);

  function getColorValue(color?: string) {
    if (color == "green") return "#23A454";
    if (color == "yellow") return "#FFB951";
    if (color == "red") return "#ED3A49";
  }
  let color = getColorValue(devicesData?.device_data.color);

  // Notification registration
  const responseListener = useRef<Subscription>();
  useEffect(() => {
    PushService.registerForPushNotifications();
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
    return () => {
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const theme = useTheme();

  return (
    <>
      <LayoutSafeArea main ignoreBottom>
        <ScrollView>
          <View style={{ flex: 1, padding: 24, paddingTop: 40 }}>
            <View style={{ alignItems: "center" }}>
              <Text
                category="h1"
                style={{
                  textAlign: "center",
                }}>
                {i18n.t("home_heading")}
              </Text>
            </View>
            <View style={{ alignItems: "center", paddingTop: 40 }}>
              <View
                style={{
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                  height: 200,
                }}>
                <ReanimatedArcBase
                  color="#E1E6EA"
                  diameter={200}
                  width={10}
                  arcSweepAngle={240}
                  lineCap="round"
                  rotation={240}
                  style={{ position: "absolute" }}
                />
                <ReanimatedArcBase
                  color={score > 70 ? "#23A454" : score > 40 ? "#FFB951" : "#E55B5B"}
                  diameter={200}
                  width={10}
                  arcSweepAngle={arcSweepAngle}
                  lineCap="round"
                  rotation={240}
                  style={{ position: "absolute" }}
                />
                <Text
                  style={{
                    transform: [{ translateY: -15 }],
                    fontWeight: "600",
                    color: "#AFB8BF",
                  }}>
                  {i18n.t("score")}
                </Text>
                <Text
                  category="h1"
                  style={{
                    transform: [{ translateY: -10 }],
                    fontSize: 50,
                    fontWeight: "800",
                  }}>
                  {score}
                </Text>
                <Text
                  style={{
                    transform: [{ translateY: -5 }],
                    fontWeight: "600",
                    color: color,
                  }}>
                  {i18n.t(score > 70 ? "upper_level_good" : score > 40 ? "upper_level_not_bad" : "upper_level_bad")}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
                justifyContent: "space-between",
              }}>
              <Button
                onPress={() => setLamp("off")}
                appearance={lamp === "off" ? "filled" : "outline"}
                status="basic"
                size="large"
                style={{
                  borderBottomWidth: lamp === "off" ? 3 : 0,
                  borderBottomColor: theme["color-primary-500"],
                  marginRight: 20,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.04,
                  shadowRadius: 1.0,
                  elevation: 8,
                }}>
                {i18n.t("lights_off")}
              </Button>
              <Button
                onPress={() => setLamp("color")}
                appearance={lamp === "color" ? "filled" : "outline"}
                status="basic"
                size="large"
                style={{
                  borderBottomWidth: lamp === "color" ? 3 : 0,
                  borderBottomColor: theme["color-primary-500"],
                  marginRight: 20,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.04,
                  shadowRadius: 1.0,
                  elevation: 8,
                }}>
                {i18n.t("lights_colors")}
              </Button>
              <Button
                onPress={() => setLamp("lamp")}
                appearance={lamp === "lamp" ? "filled" : "outline"}
                status="basic"
                size="large"
                style={{
                  borderBottomWidth: lamp === "lamp" ? 3 : 0,
                  borderBottomColor: theme["color-primary-500"],
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.04,
                  shadowRadius: 1.0,
                  elevation: 8,
                }}>
                {i18n.t("lights_lamp")}
              </Button>
            </View>
            <View
              style={{
                marginTop: 10,
                marginBottom: 30,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Icon
                style={{
                  width: 28,
                  height: 28,
                  marginRight: 10,
                }}
                name="sun"
              />
              <Slider
                style={{ flex: 1 }}
                minimumValue={0}
                maximumValue={255}
                step={1}
                value={lampBrightness}
                onValueChange={(value: any) => (tmpLampBrightness.current = value)}
                onSlidingComplete={() => {
                  setLampBrightness(Math.floor(tmpLampBrightness.current));
                }}
              />
            </View>
            <Text category="h3" style={{ marginBottom: 25 }}>
              {i18n.t("home_detail")}
            </Text>
            {devicesLoading ? (
              <View style={{ marginTop: 40, alignItems: "center" }}>
                <Spinner size="large" />
              </View>
            ) : (
              devicesData?.device_data?.data
                ?.slice(1)
                .map((card: DeviceData) => (
                  <MeasureCard
                    key={card.type}
                    name={i18n.t(card.type)}
                    unit={card.unit}
                    value={card.value}
                    color={getColorValue(card.color)}
                    values={card.values}
                    minValue={card.minValue}
                    maxValue={card.maxValue}
                    procents={card.change}
                    onPress={() => navigation.navigate("MeasureDetail", { data: card })}
                  />
                ))
            )}
          </View>
        </ScrollView>
      </LayoutSafeArea>
    </>
  );
};

export default HomeScreen;
