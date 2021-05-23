import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Icon, Text } from "@ui-kitten/components";

interface MeasureCardProps {
  name: string;
  value: string;
  minValue: string;
  maxValue: string;
  color: string;
  procents: string;
  isIncreased?: boolean;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  name,
  value,
  minValue,
  maxValue,
  color,
  procents,
  isIncreased,
}) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: "#fff",
          marginBottom: 20,
          padding: 15,
          borderRadius: 4,
        }}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 4,
              backgroundColor: color,
              marginRight: 15,
            }}></View>
          <View>
            <Text style={{ fontWeight: "600", fontSize: 18, marginBottom: 10 }}>
              {name}
            </Text>
            <Text style={{ color: color, fontWeight: "600", fontSize: 18 }}>
              {value}
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
            <Text category="s2">{minValue}</Text>
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
            <Text category="s2">{maxValue}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name={isIncreased ? "trending-up" : "trending-down"}
              style={{
                color: "#838C97",
                width: 16,
                height: 16,
                marginRight: 5,
              }}
            />
            <Text category="s2">{procents}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MeasureCard;
