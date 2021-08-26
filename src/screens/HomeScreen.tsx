import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { Subscription } from "@unimodules/core";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Text, Icon, Button, Spinner, useTheme, Select, SelectItem, IndexPath } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Slider from "../components/modules/Slider";
import MeasureCard from "../components/modules/cards/MeasureCard";

import { ReanimatedArcBase } from "@intractive/reanimated-arc";
import Reanimated from "react-native-reanimated";

import i18n from "../i18n";
import PushService from "../services/PushService";

import {
  Device,
  DeviceData,
  SetBrightnessInput,
  useGetBrightnessLazyQuery,
  useGetDeviceDataLazyQuery,
  useGetDevicesQuery,
  useSetBrightnessMutation,
} from "../graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThingsboardService from "../services/ThingsboardService";

type HomeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProp>();

  const arcSweepAngle = Reanimated.useValue<number>(0);
  const tmpLampBrightness = useRef(255);
  const [lampBrightness, setLampBrightness] = useState<number>();
  const [lamp, setLamp] = useState<string>();
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>();

  const {
    data: devices,
    loading: devicesLoading,
    refetch: devicesRefetch,
  } = useGetDevicesQuery({
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      Alert.alert(i18n.t("error"), i18n.t("error_network_desc"), [
        {
          text: i18n.t("retry"),
          onPress: () => {
            if (ThingsboardService.getInstance().isLoggedIn()) {
              devicesRefetch();
            }
          },
        },
      ]);
    },
  });
  const [getDeviceData, { data: devicesData, loading: devicesDataLoading, refetch: dataRefetch }] =
    useGetDeviceDataLazyQuery();
  const [getBrightness, { data: brightnessData }] = useGetBrightnessLazyQuery();
  const [setBrightness] = useSetBrightnessMutation();

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

  const selectedDeviceIndex = devices?.devices.findIndex((it) => it.id === selectedDeviceId);
  const selectedDeviceValue = devices?.devices.find((it) => it.id === selectedDeviceId)?.title;
  const loadDevice = async () => {
    if (devices?.devices && devices?.devices.length > 0) {
      if (selectedDeviceIndex == -1) {
        // Load ID saved in storage, if it exists
        const savedId = await AsyncStorage.getItem("selectedDeviceId");
        if (savedId !== null && devices?.devices.some((it) => it.id == savedId)) {
          setSelectedDeviceId(savedId);
        } else {
          // Load first device by default
          setSelectedDeviceId(devices?.devices[0].id);
        }
      } else if (selectedDeviceId !== undefined) {
        // Refetch data for selected device
        AsyncStorage.setItem("selectedDeviceId", selectedDeviceId);
        getDeviceData({ variables: { id: selectedDeviceId } });
        getBrightness({ variables: { id: selectedDeviceId } });
      }
    }
  };
  useEffect(() => {
    loadDevice();
  }, [devices?.devices, selectedDeviceId]);

  const score = Math.round(devicesData?.device_data?.data?.find((it: any) => it.type == "score")?.value || 0);
  useEffect(() => {
    arcSweepAngle.setValue(Math.round((score / 100) * 240));
  }, [score]);
  useEffect(() => {
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
      selectedDeviceId !== undefined &&
      (lamp !== brightnessData?.brightness.light || lampBrightness !== brightnessData?.brightness.brightness)
    ) {
      setBrightness({ variables: { input: { id: selectedDeviceId, light: lamp, brightness: lampBrightness } } }).then(
        (result) => {
          console.log("Saved brightness ", result.data?.setBrightness.brightness, result.data?.setBrightness.light);
        }
      );
    }
  }, [lamp, lampBrightness]);
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (dataRefetch) {
        dataRefetch();
      }
    }, 60000);
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);
  function getColorValue(color?: string) {
    if (color == "green") return "#23A454";
    if (color == "yellow") return "#FFB951";
    if (color == "red") return "#ED3A49";
  }
  let color = getColorValue(devicesData?.device_data?.data ? devicesData?.device_data.color : "");

  return (
    <>
      <LayoutSafeArea main ignoreBottom>
        <ScrollView>
          <View style={{ flex: 1, padding: 24, paddingTop: 20 }}>
            {devices?.devices === undefined ? (
              <View />
            ) : devices?.devices.length > 1 ? (
              <Select
                size="large"
                status="control"
                value={() => <Text category="h1">{selectedDeviceValue}</Text>}
                accessoryRight={() => <Icon name="chevron-down" style={{ color: "#000", width: 28, height: 28 }} />}
                selectedIndex={new IndexPath(selectedDeviceIndex || -1)}
                onSelect={(index: any) => {
                  setSelectedDeviceId(devices?.devices[index.row].id);
                }}>
                {devices?.devices.map((device) => (
                  <SelectItem key={device.id} title={device.title} />
                ))}
              </Select>
            ) : (
              <>
                <View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
                  <Text
                    category="h1"
                    style={{
                      textAlign: "center",
                    }}>
                    {i18n.t("home_heading")}
                  </Text>
                </View>
              </>
            )}

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
                    fontFamily: "Montserrat_600SemiBold",
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
                    fontFamily: "Montserrat_700Bold",
                  }}>
                  {score}
                </Text>
                <Text
                  style={{
                    transform: [{ translateY: -5 }],
                    fontWeight: "600",
                    fontFamily: "Montserrat_600SemiBold",
                    color: color,
                  }}>
                  {i18n.t(
                    score > 75
                      ? "upper_level_good"
                      : score > 40
                      ? "upper_level_not_bad"
                      : devicesData?.device_data?.data
                      ? "upper_level_bad"
                      : "no_data"
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 20,
                justifyContent: "space-between",
              }}>
              <Button
                onPress={() => setLamp("off")}
                appearance={lamp === "off" ? "filled" : "outline"}
                status="basic"
                size="medium"
                style={{
                  borderBottomWidth: lamp === "off" ? 3 : 0,
                  borderBottomColor: theme["color-primary-500"],
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.04,
                  shadowRadius: 1.0,
                  elevation: 1,
                }}>
                {i18n.t("lights_off")}
              </Button>
              <Button
                onPress={() => setLamp("standard")}
                appearance={lamp === "standard" ? "filled" : "outline"}
                status="basic"
                size="medium"
                style={{
                  borderBottomWidth: lamp === "standard" ? 3 : 0,
                  borderBottomColor: theme["color-primary-500"],
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.04,
                  shadowRadius: 1.0,
                  elevation: 1,
                }}>
                {i18n.t("lights_colors")}
              </Button>
              <Button
                onPress={() => setLamp("lamp")}
                appearance={lamp === "lamp" ? "filled" : "outline"}
                status="basic"
                size="medium"
                style={{
                  borderBottomWidth: lamp === "lamp" ? 3 : 0,
                  borderBottomColor: theme["color-primary-500"],
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.04,
                  shadowRadius: 1.0,
                  elevation: 1,
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
            {devicesData?.device_data === undefined && (devicesLoading || devicesDataLoading) ? (
              <View style={{ marginTop: 40, alignItems: "center" }}>
                <Spinner size="large" />
              </View>
            ) : !devicesData?.device_data?.data || devicesData?.device_data?.data?.length <= 0 ? (
              <View style={{ justifyContent: "space-evenly", alignItems: "center", marginLeft: 20, marginRight: 20 }}>
                <Text category="h1" style={{ textAlign: "center" }}>
                  {i18n.t("no_data")}
                </Text>
                <Text category="s2" style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
                  {i18n.t("no_data_desc")}
                </Text>
                <Button onPress={() => loadDevice()}>{i18n.t("retry")}</Button>
              </View>
            ) : (
              <>
                <Text category="h3" style={{ marginBottom: 25 }}>
                  {i18n.t("home_detail")}
                </Text>
                {devicesData?.device_data?.data?.slice(1).map((card: DeviceData) => (
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
                    onPress={() => navigation.navigate("MeasureDetail", { data: card, deviceId: selectedDeviceId })}
                  />
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </LayoutSafeArea>
    </>
  );
};

export default HomeScreen;
