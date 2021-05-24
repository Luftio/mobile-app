import React, { useState } from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Button, Icon, Text, TopNavigation } from "@ui-kitten/components";

import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

import renderBackAction from "../utils/renderBackAction";
import navigateAction from "../utils/renderEducationAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";

import i18n from "../i18n";

type MeasureDetailScreenProp = StackNavigationProp<
  RootStackParamList,
  "MeasureDetail"
>;

const MeasureDetailScreen: React.FC = () => {
  const navigation = useNavigation<MeasureDetailScreenProp>();

  const [active, setActive] = useState<string>("today");

  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">CO2</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        accessoryRight={navigateAction}
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
          <Text
            category="h1"
            style={{ fontSize: 50, fontWeight: "800", marginRight: 10 }}>
            1037
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "500", paddingBottom: 6 }}>
            ppm
          </Text>
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
            &nbsp;{i18n.t("level_good")}
          </Text>
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 35,
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
            <Text category="s2">1668</Text>
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
            <Text category="s2">328</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 25,
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
            <Text category="s2">+3%</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 40,
          }}>
          <Button
            onPress={() => setActive("today")}
            appearance={active === "today" ? "filled" : "outline"}
            status="control"
            size="large"
            style={{ marginRight: 20 }}>
            {i18n.t("today")}
          </Button>
          <Button
            onPress={() => setActive("yesterday")}
            appearance={active === "yesterday" ? "filled" : "outline"}
            status="control"
            size="large"
            style={{ marginRight: 20 }}>
            {i18n.t("yesterday")}
          </Button>
        </View>
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
          <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
            <VictoryBar
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              cornerRadius={{
                topLeft: 5,
                topRight: 5,
                bottomLeft: 5,
                bottomRight: 5,
              }}
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.y < 1100
                      ? "#23A454"
                      : datum.y < 2000
                      ? "#FFB951"
                      : "#E55B5B",
                  width: 10,
                },
              }}
              data={[
                { x: 2, y: 1037 },
                { x: 2.5, y: 1080 },
                { x: 3, y: 1400 },
                { x: 3.5, y: 1300 },
                { x: 4, y: 900 },
                { x: 4.5, y: 1500 },
                { x: 5, y: 1600 },
                { x: 5.5, y: 2010 },
                { x: 6, y: 2200 },
                { x: 6.5, y: 1700 },
              ]}
            />
          </VictoryChart>
        </View>
      </View>
    </LayoutSafeArea>
  );
};

export default MeasureDetailScreen;
