import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LevelsService from "../../services/LevelsService";
import { useComponentSize } from "../../utils/useComponentSize";

interface LevelVizualizerProps {
  style: any;
  data: any;
  type: "CO2" | "temperature" | "humidity" | "pressure";
}

export const LevelVizualizer: React.FC<LevelVizualizerProps> = ({ style: styleProp, data, type }) => {
  const { size, onLayout } = useComponentSize();
  const { currentPosition, gradientPoints, labels } = useMemo(() => {
    const levels = LevelsService.levels[type];
    const currentPosition = Math.min(
      (data.value - levels.totalRange.from) / (levels.totalRange.to - levels.totalRange.from),
      1.03
    );
    const gradientPoints = [];
    for (let range of levels.ranges) {
      if (range.type != "good" && range.type != "bad" && range.type != "terrible") continue;
      let color = LevelsService.getRangeColor(range.type);
      let x1 = (range.from - levels.totalRange.from) / (levels.totalRange.to - levels.totalRange.from);
      let x2 = (range.to - levels.totalRange.from) / (levels.totalRange.to - levels.totalRange.from);
      gradientPoints.push({ color, pos: x1 });
      gradientPoints.push({ color, pos: x2 });
    }
    const labels = levels.labels.map((it) => {
      return {
        value: it,
        pos: (it - levels.totalRange.from) / (levels.totalRange.to - levels.totalRange.from),
      };
    });
    return { levels, currentPosition, gradientPoints, labels };
  }, [data]);

  return (
    <View style={{ ...styleProp }}>
      <LinearGradient
        onLayout={onLayout}
        style={{
          width: "100%",
          height: 26,
          borderRadius: 15,
          marginBottom: 20,
        }}
        colors={gradientPoints.map((it) => it.color)}
        locations={gradientPoints.map((it) => it.pos)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      {size && (
        <View
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            borderRadius: 12,
            backgroundColor: "white",
            top: 1,
            left: currentPosition * (size.width - 30) + 3,
          }}
        />
      )}
      {size &&
        labels.map((it) => (
          <Text
            key={it.value}
            style={{
              opacity: 0.7,
              position: "absolute",
              top: 35,
              left: Math.min(Math.max(it.pos * size.width - 10, 5), size.width - 30),
            }}>
            {it.value}
          </Text>
        ))}
    </View>
  );
};
