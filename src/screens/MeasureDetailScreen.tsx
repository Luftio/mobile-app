import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";

import { Button, Icon, Text, TopNavigation, Modal, Calendar, Card } from "@ui-kitten/components";

import { useNavigation } from "@react-navigation/native";

import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";

import { ScrollView } from "react-native-gesture-handler";

import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import CollapsibleCard from "../components/modules/cards/CollapsibleCard";
import { LevelVizualizer } from "../components/modules/LevelVisualizer";

import i18n from "../i18n";

import { DeviceData, useGetDeviceDataLazyQuery } from "../graphql";

interface MeasureDetailScreenProps {
  route: any;
}

const MeasureDetailScreen: React.FC<MeasureDetailScreenProps> = ({ route }) => {
  const { data: originalData }: { data: DeviceData } = route.params;

  const [chartScale, setChartScale] = useState<string>("day");
  const [customOpen, setCustomOpen] = useState<boolean>(false);
  const [customRange, setCustomRange] = useState<Date>(new Date());
  const cachedData = useRef(originalData);

  const getChartProps = (type: string | undefined) => {
    if (type === "score") {
      return { minDomain: { y: 0 }, maxDomain: { y: 100 } };
    } else if (type === "CO2") {
      return { minDomain: { y: 0 }, maxDomain: { y: 2500 } };
    } else if (type === "temperature") {
      return { minDomain: { y: 5 }, maxDomain: { y: 35 } };
    } else if (type === "pressure") {
      return { minDomain: { y: 800 }, maxDomain: { y: 1200 } };
    } else if (type === "humidity") {
      return { minDomain: { y: 0 }, maxDomain: { y: 100 } };
    }
    return {};
  };
  function getColorValue(color?: string) {
    if (color == "green") return "#23A454";
    if (color == "yellow") return "#FFB951";
    if (color == "red") return "#ED3A49";
  }

  const [devicesDataQuery, { data: devicesDataQueryData }] = useGetDeviceDataLazyQuery({ fetchPolicy: "no-cache" });
  const data =
    devicesDataQueryData?.device_data?.data?.find((it) => it.type == originalData.type) || cachedData.current;
  useEffect(() => {
    if (devicesDataQueryData == null && chartScale == "day") return;
    const timeScales = {
      "6h": [+new Date() - 6 * 3600000, +new Date(), 600000, 6],
      day: [+new Date() - 24 * 3600000, +new Date(), 900000, 8],
      yesterday: [+new Date() - 48 * 3600000, +(+new Date() - 24 * 3600000), 900000, 6],
      week: [+new Date() - 7 * 24 * 3600000, +new Date(), 2 * 3600000, 7],
      month: [+new Date() - 30 * 24 * 3600000, +new Date(), 24 * 3600000, 10],
      custom: [+new Date(+customRange), +new Date(+customRange) + 24 * 3600000, 1800000, 8],
    };
    const timing = timeScales[chartScale];
    cachedData.current = data;
    devicesDataQuery({
      variables: {
        id: route.params.deviceId,
        startTs: new Date(timing[0]).toISOString(),
        endTs: new Date(timing[1]).toISOString(),
        interval: timing[2],
      },
    });
  }, [chartScale, customRange]);

  const CO2 = [
    { title: i18n.t("co2_eduaction_card_title_1"), content: i18n.t("co2_eduaction_card_text_1") },
    { title: i18n.t("co2_eduaction_card_title_2"), content: i18n.t("co2_eduaction_card_text_2") },
    { title: i18n.t("co2_eduaction_card_title_3"), content: i18n.t("co2_eduaction_card_text_3") },
    { title: i18n.t("co2_eduaction_card_title_4"), content: i18n.t("co2_eduaction_card_text_4") },
    { title: i18n.t("co2_eduaction_card_title_5"), content: i18n.t("co2_eduaction_card_text_5") },
  ];
  const temperature = [
    { title: i18n.t("temp_eduaction_card_title_1"), content: i18n.t("temp_eduaction_card_text_1") },
    { title: i18n.t("temp_eduaction_card_title_2"), content: i18n.t("temp_eduaction_card_text_2") },
    { title: i18n.t("temp_eduaction_card_title_3"), content: i18n.t("temp_eduaction_card_text_3") },
    { title: i18n.t("temp_eduaction_card_title_4"), content: i18n.t("temp_eduaction_card_text_4") },
  ];
  const humidity = [
    { title: i18n.t("humidity_eduaction_card_title_1"), content: i18n.t("humidity_eduaction_card_text_1") },
    { title: i18n.t("humidity_eduaction_card_title_2"), content: i18n.t("humidity_eduaction_card_text_2") },
    { title: i18n.t("humidity_eduaction_card_title_3"), content: i18n.t("humidity_eduaction_card_text_3") },
    { title: i18n.t("humidity_eduaction_card_title_4"), content: i18n.t("humidity_eduaction_card_text_4") },
    { title: i18n.t("humidity_eduaction_card_title_5"), content: i18n.t("humidity_eduaction_card_text_5") },
  ];
  const pressure = [
    { title: i18n.t("pressure_eduaction_card_title_1"), content: i18n.t("pressure_eduaction_card_text_1") },
    { title: i18n.t("pressure_eduaction_card_title_2"), content: i18n.t("pressure_eduaction_card_text_2") },
    { title: i18n.t("pressure_eduaction_card_title_3"), content: i18n.t("pressure_eduaction_card_text_3") },
  ];
  const voc = [
    { title: i18n.t("voc_eduaction_card_title_1"), content: i18n.t("voc_eduaction_card_text_1") },
    { title: i18n.t("voc_eduaction_card_title_2"), content: i18n.t("voc_eduaction_card_text_2") },
    { title: i18n.t("voc_eduaction_card_title_3"), content: i18n.t("voc_eduaction_card_text_3") },
    { title: i18n.t("voc_eduaction_card_title_4"), content: i18n.t("voc_eduaction_card_text_4") },
    { title: i18n.t("voc_eduaction_card_title_5"), content: i18n.t("voc_eduaction_card_text_5") },
  ];

  let cards: { title: string; content: string }[] = [];
  if (data.type === "CO2") {
    cards = CO2;
  } else if (data.type === "temperature") {
    cards = temperature;
  } else if (data.type === "pressure") {
    cards = pressure;
  } else if (data.type === "humidity") {
    cards = humidity;
  } else if (data.type === "siaq" || data.type === "iaq" || data.type === "tvoc") {
    cards = voc;
  }

  return (
    <LayoutSafeArea main ignoreBottom>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t(data.type)}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <Modal visible={customOpen} backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <Card>
          <Calendar
            date={customRange}
            onSelect={(date) => setCustomRange(date)}
            max={new Date()}
            style={{
              marginTop: -18,
              marginLeft: -26,
              marginRight: -26,
              marginBottom: 10,
            }}
          />
          <Button
            size="large"
            onPress={() => {
              setCustomOpen(false);
              setChartScale("custom");
            }}>
            OK
          </Button>
        </Card>
      </Modal>
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              marginBottom: 10,
            }}>
            <Text
              category="h1"
              style={{ fontSize: 50, fontWeight: "800", fontFamily: "Montserrat_700Bold", marginRight: 10 }}>
              {originalData.value}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: "500", fontFamily: "Montserrat_500Medium", paddingBottom: 6 }}>
              {originalData.unit}
            </Text>
          </View>
          <Text
            style={{
              marginBottom: 15,
              fontWeight: "500",
              fontFamily: "Montserrat_500Medium",
              fontSize: 18,
              textAlign: "center",
            }}>
            {i18n.t("detail_screen_is") + " "}
            <Text
              style={{
                marginBottom: 25,
                fontWeight: "500",
                fontFamily: "Montserrat_500Medium",
                fontSize: 18,
                color: getColorValue(originalData.color),
              }}>
              {originalData.color == "green"
                ? i18n.t("level_good")
                : originalData.color == "yellow"
                ? i18n.t("level_not_bad")
                : i18n.t("level_bad")}
            </Text>
          </Text>
          <LevelVizualizer
            data={originalData}
            style={{
              marginTop: 10,
              marginBottom: 30,
            }}
            type={originalData.type}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 35,
              justifyContent: "space-between",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 25,
              }}>
              <Icon
                name="arrow-up"
                style={{
                  color: "#838C97",
                  width: 16,
                  height: 16,
                  marginRight: 5,
                }}
              />
              <Text category="s2" style={{ fontSize: 14 }}>
                {originalData.maxValue}
                {originalData.unit}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 25,
              }}>
              <Icon
                name="arrow-down"
                style={{
                  color: "#838C97",
                  width: 16,
                  height: 16,
                  marginRight: 5,
                }}
              />
              <Text category="s2" style={{ fontSize: 14 }}>
                {originalData.minValue}
                {originalData.unit}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Icon
                name="trending-up"
                style={{
                  color: "#838C97",
                  width: 16,
                  height: 16,
                  marginRight: 5,
                }}
              />
              <Text category="s2" style={{ fontSize: 14 }}>
                {originalData.change}
                {originalData.unit}
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true}>
            <View
              style={{
                marginBottom: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              {["6h", "day", "yesterday", "week", "month"].map((it) => (
                <Button
                  key={it}
                  status="basic"
                  size="large"
                  onPress={() => {
                    setChartScale(it);
                    setCustomRange(null);
                  }}
                  appearance={chartScale == it ? "filled" : "outline"}
                  style={{
                    marginRight: 20,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.04,
                    shadowRadius: 1.0,
                    elevation: 1,
                  }}>
                  {i18n.t("time_" + it)}
                </Button>
              ))}
              {customRange && (
                <Button
                  status="basic"
                  size="large"
                  appearance={chartScale === "custom" ? "filled" : "outline"}
                  style={{
                    marginRight: 20,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.04,
                    shadowRadius: 1.0,
                    elevation: 1,
                  }}
                  onPress={() => chartScale}>
                  {customRange.getDate() + "/" + (customRange.getMonth() + 1)}
                </Button>
              )}
              <Button
                status="basic"
                size="large"
                appearance={"outline"}
                style={{
                  marginRight: 20,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.04,
                  shadowRadius: 1.0,
                  elevation: 1,
                }}
                onPress={() => setCustomOpen(true)}>
                {i18n.t("custom")}
              </Button>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 4,
              shadowColor: "#666666",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,
              elevation: 1,
            }}>
            <VictoryChart
              theme={VictoryTheme.material}
              height={320}
              width={320}
              padding={{ left: 45, top: 20, bottom: 50 }}>
              <VictoryAxis dependentAxis fixLabelOverlap={true} scale={{ x: "time" }} />
              <VictoryAxis fixLabelOverlap={true} scale={{ x: "time" }} />
              <VictoryLine
                {...getChartProps(data.type)}
                style={{
                  data: { stroke: "#031846" },
                }}
                data={data.values}
                animate={{
                  duration: 500,
                  onLoad: { duration: 1000 },
                }}
                interpolation="step"
                x={(it) => new Date(it.ts)}
                y="value"
              />
            </VictoryChart>
          </View>
          {data.type !== "score" && (
            <>
              <Text category="h3" style={{ marginBottom: 25, marginTop: 40 }}>
                {i18n.t("education")}
              </Text>
              <View style={{ flex: 1 }}>
                {cards.map((card: any) => (
                  <CollapsibleCard key={card.title} title={card.title} content={card.content} useBezier />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </LayoutSafeArea>
  );
};

export default MeasureDetailScreen;
