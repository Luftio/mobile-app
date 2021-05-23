import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

interface NotificationProps {
  name: string;
  time: string;
}

const Notification: React.FC<NotificationProps> = ({ name, time }) => {
  return (
    <View
      style={{
        borderBottomColor: "#E1E6EA",
        marginBottom: 15,
        borderBottomWidth: 1,
      }}>
      <Text style={{ marginBottom: 5 }} category="h3">
        {name}
      </Text>
      <Text style={{ marginBottom: 12, fontSize: 16 }} category="s2">
        {time}
      </Text>
    </View>
  );
};

export default Notification;
