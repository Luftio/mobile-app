import React, { useState, useRef } from "react";
import { View, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Text, Icon, Button, Spinner } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Slider from "../components/modules/Slider";
import MeasureCard from "../components/modules/MeasureCard";

import { ReanimatedArcBase } from "@callstack/reanimated-arc";
import Reanimated from "react-native-reanimated";

import i18n from "../i18n";

import { useQuery } from "../gqless";

type HomeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenProp>();

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

  const query = useQuery();
  const substancesCard = query.substancesCard({ id: "1" });
  const brithness = query.brithness;
  const score_total = query.score;

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
                  color={score > 70 ? "#23A454" : score > 40 ? "#FFB951" : "#E55B5B"}
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
                onPress={() => setLamp("none")}
                appearance={lamp === "none" ? "filled" : "outline"}
                status="basic"
                size="large"
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
                {i18n.t("lights_off")}
              </Button>
              <Button
                onPress={() => setLamp("color")}
                appearance={lamp === "color" ? "filled" : "outline"}
                status="basic"
                size="large"
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
                {i18n.t("lights_colors")}
              </Button>
              <Button
                onPress={() => setLamp("lamp")}
                appearance={lamp === "lamp" ? "filled" : "outline"}
                status="basic"
                size="large"
                style={{
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
                onValueChange={(value: any) => setLampBrightness(value)}
              />
            </View>
            <Text category="h3" style={{ marginBottom: 25 }}>
              {i18n.t("home_detail")}
            </Text>
            {query.$state.isLoading ? (
              <View style={{ marginTop: 40, alignItems: "center" }}>
                <Spinner size="large" />
              </View>
            ) : (
              substancesCard?.map((card) => (
                <MeasureCard
                  name={card.title}
                  value={card.actual_value}
                  color={card.color}
                  minValue={card.min_value}
                  maxValue={card.max_value}
                  procents={card.difference}
                  onPress={() => navigation.navigate("MeasureDetail")}
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
