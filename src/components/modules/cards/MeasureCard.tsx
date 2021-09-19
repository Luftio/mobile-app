import React from "react";
import { TouchableNativeFeedback, View, Platform } from "react-native";

import { Icon, Text } from "@ui-kitten/components";

import { VictoryLine } from "victory-native";
import { DeviceDataValue } from "../../../graphql";

interface MeasureCardProps {
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  color?: string;
  procents: number;
  unit: string;
  values: DeviceDataValue[];
  onPress?: () => void;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  name,
  value,
  minValue,
  unit,
  maxValue,
  color,
  procents,
  onPress,
  values,
}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={{
          backgroundColor: "#fff",
          marginBottom: 20,
          padding: 15,
          borderRadius: 4,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.04,
          shadowRadius: 1.0,
          elevation: 1,
        }}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 4,
              backgroundColor: color,
              marginRight: 15,
            }}>
            <VictoryLine
              width={60}
              height={60}
              interpolation="natural"
              padding={0}
              domainPadding={5}
              style={{ data: { stroke: "#fff", strokeWidth: 3, strokeLinecap: "round" } }}
              animate={{
                duration: 500,
                onLoad: { duration: 1000 },
              }}
              data={values.slice(Math.max(0, values.length - 10))}
              x={(it) => new Date(it.ts)}
              y={(it) => Number(it.value)}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "600", fontFamily: "Montserrat_600SemiBold", fontSize: 18, marginBottom: 10 }}>
              {name}
            </Text>
            <Text style={{ color: color, fontWeight: "600", fontFamily: "Montserrat_600SemiBold", fontSize: 18 }}>
              {value}
              {unit}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="arrow-up"
              style={{
                color: "#838C97",
                width: 16,
                height: 16,
                marginRight: 5,
              }}
            />
            <Text category="s2" style={{ fontSize: 15 }}>
              {maxValue}
              {unit}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="arrow-down"
              style={{
                color: "#838C97",
                width: 16,
                height: 16,
                marginRight: 5,
              }}
            />
            <Text category="s2" style={{ fontSize: 15 }}>
              {minValue}
              {unit}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name={procents > 0 ? "trending-up" : "trending-down"}
              style={{
                color: "#838C97",
                width: 16,
                height: 16,
                marginRight: 5,
              }}
            />
            <Text category="s2" style={{ fontSize: 15 }}>
              {procents}
              {unit}
            </Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MeasureCard;
