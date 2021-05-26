import React from "react";
import { View } from "react-native";

import { Text } from "@ui-kitten/components";

interface DeviceCardProps {
  name: string;
  code: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ name, code }) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 4,
        marginBottom: 20,
        padding: 20,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 1.0,
        elevation: 1,
      }}>
      <Text style={{ marginBottom: 5, fontWeight: "500" }}>{name}</Text>
      <Text>{code}</Text>
    </View>
  );
};

export default DeviceCard;
