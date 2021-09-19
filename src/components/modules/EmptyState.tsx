import React from "react";
import { View, Image } from "react-native";

import { Text } from "@ui-kitten/components";

interface EmptyStateProps {
  text: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image source={require("../../../assets/empty-state.png")} style={{ width: 298, height: 250 }} />
      <Text category="p1" style={{ color: "#838C97", transform: [{ translateY: -55 }], textAlign: "center" }}>
        {text}
      </Text>
    </View>
  );
};

export default EmptyState;
