import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";

import { Button, Icon, Text, TopNavigation, Modal, Calendar, Card } from "@ui-kitten/components";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";

import { ScrollView } from "react-native-gesture-handler";

import renderBackAction from "../utils/renderBackAction";
import renderCustomAction from "../utils/renderCustomAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";

import i18n from "../i18n";

import { DeviceData, useGetDeviceDataLazyQuery, useGetDeviceDataQuery } from "../graphql";

type HomeScreenProp = StackNavigationProp<RootStackParamList, "MeasureDetail">;

interface MeasureDetailScreenProps {
  route: any;
}

const MeasureDetailScreen: React.FC<MeasureDetailScreenProps> = ({ route }) => {
  const { data: originalData }: { data: DeviceData } = route.params;
  const navigation = useNavigation();

  const [chartScale, setChartScale] = useState<string>("day");
  const [customOpen, setCustomOpen] = useState<boolean>(false);
  const [customRange, setCustomRange] = useState<Date>(new Date());
  const cachedData = useRef(originalData);

  const getChartProps = (type: string | undefined) => {
    if (type === "score") {
      return { minDomain: { y: 0 }, maxDomain: { y: 100 } };
    } else if (type === "CO2") {
      return { minDomain: { y: 0 }, maxDomain: { y: 2000 } };
    } else if (type === "temperature") {
      return { minDomain: { y: 5 }, maxDomain: { y: 35 } };
    } else if (type === "pressure") {
      return { minDomain: { y: 800 }, maxDomain: { y: 1200 } };
    } else if (type === "humidity") {
      return { minDomain: { y: 0 }, maxDomain: { y: 100 } };
    }
    return {};
  };

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

  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t(data.type)}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        accessoryRight={renderCustomAction("info", () => navigation.navigate("Education", { data: data }))}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <View style={{ flex: 1, padding: 24 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: 25,
          }}>
          <Text category="h1" style={{ fontSize: 50, fontWeight: "800", marginRight: 10 }}>
            {data.value}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "500", paddingBottom: 6 }}>{data.unit}</Text>
        </View>
        <Text style={{ marginBottom: 25, fontWeight: "500", fontSize: 18 }}>
          {i18n.t("CO2_detail_screen")}
          <Text
            style={{
              marginBottom: 25,
              fontWeight: "500",
              fontSize: 18,
              color: "#23A454",
            }}>
            &nbsp;perfect
          </Text>
        </Text>
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
            <Text category="s2">
              {data.maxValue}
              {data.unit}
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
            <Text category="s2">
              {data.minValue}
              {data.unit}
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
            <Text category="s2">
              {data.change}
              {data.unit}
            </Text>
          </View>
        </View>
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
        <ScrollView horizontal={true}>
          <View
            style={{
              marginBottom: 40,
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
      </View>
    </LayoutSafeArea>
  );
};

export default MeasureDetailScreen;
