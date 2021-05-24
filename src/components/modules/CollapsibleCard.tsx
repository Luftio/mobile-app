import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { Text, Icon } from "@ui-kitten/components";

import { useSpring, animated } from "@react-spring/native";
import BezierEasing from "bezier-easing";

interface CollapsibleCardProps {
  title: string;
  content: string;
  contentHeight?: number;
  useBezier: boolean;
}

const defaultProps = {
  contentHeight: 300,
};

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  content,
  contentHeight,
  useBezier,
}) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(true);

  const animationConfig = {
    height: isCollapsed ? 0 : contentHeight,
    progress: isCollapsed ? 0 : 100,
    rotation: isCollapsed ? `0deg` : `-180deg`,
  };

  if (useBezier) {
    //@ts-ignore
    animationConfig.config = {
      duration: 600,
      easing: (t: number) => BezierEasing(0.25, 0, 0, 1)(t),
    };
  }

  const animation = useSpring<any>(animationConfig);
  const AnimatedView = animated<any>(View);

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 4,
        justifyContent: "center",
        marginBottom: 20,
        shadowColor: "#666666",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setCollapsed((c: any) => !c)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 15,
        }}>
        <Text style={{ fontWeight: "500" }}>{title}</Text>
        <AnimatedView style={{ transform: [{ rotate: animation.rotation }] }}>
          <Icon
            name="chevron-down"
            style={{ width: 24, height: 24, color: "#000000" }}
          />
        </AnimatedView>
      </TouchableOpacity>
      <AnimatedView
        style={[
          {
            height: animation.height,
            opacity: animation.progress.interpolate({
              range: [0, 85, 95, 100],
              output: [0, 0, 0.5, 1],
            }),
          },
        ]}>
        <AnimatedView
          style={{
            transform: [
              {
                translateY: animation.progress.interpolate({
                  range: [0, 85, 95, 100],
                  output: [7.5, 5, 2.5, 0],
                }),
              },
            ],
          }}>
          <Text style={{ padding: 15, paddingTop: 0 }}>{content}</Text>
        </AnimatedView>
      </AnimatedView>
    </View>
  );
};

CollapsibleCard.defaultProps = defaultProps;

export default CollapsibleCard;
