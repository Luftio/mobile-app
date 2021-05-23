import React, { useState, useRef } from "react";
import { View, ScrollView } from "react-native";

import { Text, Icon, Button } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Slider from "../components/modules/Slider";
import MeasureCard from "../components/modules/MeasureCard";

import { ReanimatedArcBase } from "@callstack/reanimated-arc";
import Reanimated from "react-native-reanimated";

import i18n from "../i18n";

const HomeScreen: React.FC = () => {
  const arcAngle = useRef(new Reanimated.Value(Math.random() * 240));
  const [score, setScore] = useState<any>(0);

  const [lampBrightness, setLampBrightness] = useState<number>(80);
  const [lamp, setLamp] = useState<string>("none");

  let color;

  if (score > 70) {
    color = "#23A454";
  } else if (score > 40) {
    color = "#FFB951";
  } else {
    color = "#ED3A49";
  }

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
                <Reanimated.Code
                  exec={Reanimated.call([arcAngle.current], ([value]) => {
                    setScore(`${Math.round((value / 240) * 100)}`);
                  })}
                />
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
                  color={
                    score > 70 ? "#23A454" : score > 40 ? "#FFB951" : "#E55B5B"
                  }
                  diameter={200}
                  width={10}
                  arcSweepAngle={arcAngle.current}
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
                  {i18n.t("home_score")}
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
                  {i18n.t(
                    score > 70
                      ? "upper_level_good"
                      : score > 40
                      ? "upper_level_not_bad"
                      : "upper_level_bad"
                  )}
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
                onPress={() => setLamp("none")}
                appearance={lamp === "none" ? "filled" : "outline"}
                status="control"
                size="large"
                style={{ marginRight: 20 }}>
                {i18n.t("lights_off")}
              </Button>
              <Button
                onPress={() => setLamp("color")}
                appearance={lamp === "color" ? "filled" : "outline"}
                status="control"
                size="large"
                style={{ marginRight: 20 }}>
                {i18n.t("lights_colors")}
              </Button>
              <Button
                onPress={() => setLamp("lamp")}
                appearance={lamp === "lamp" ? "filled" : "outline"}
                status="control"
                size="large">
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
                onValueChange={(value: any) => setLampBrightness(value)}
              />
            </View>
            <Text category="h3" style={{ marginBottom: 25 }}>
              {i18n.t("home_detail")}
            </Text>
            <MeasureCard
              name="CO2"
              value={`1037 ppm / ${i18n.t("level_good")}`}
              color="#23A454"
              minValue="1668 ppm"
              maxValue="328 ppm"
              procents="+3"
              isIncreased
            />
            <MeasureCard
              name={i18n.t("temperature")}
              value={`23.5°C / ${i18n.t("level_good")}`}
              color="#FFB951"
              minValue="27°C"
              maxValue="19°C"
              procents="+10"
              isIncreased
            />
            <MeasureCard
              name={i18n.t("humidity")}
              value={`43% / ${i18n.t("level_bad")}`}
              color="#ED3A49"
              minValue="41%"
              maxValue="67%"
              procents="-17"
            />
            <MeasureCard
              name={i18n.t("pressure")}
              value={`975 hPa / ${i18n.t("level_good")}`}
              color="#23A454"
              minValue="990 hPa"
              maxValue="976 hPa"
              procents="+9"
              isIncreased
            />
          </View>
        </ScrollView>
      </LayoutSafeArea>
    </>
  );
};

export default HomeScreen;
