import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

interface NotificationProps {
  name: string;
  text: string;
  date: string;
}

const Notification: React.FC<NotificationProps> = ({ name, text, date }) => {
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
      <Text style={{ marginBottom: 5, fontSize: 16 }} category="p1">
        {text}
      </Text>
      <Text style={{ marginBottom: 12, fontSize: 16 }} category="s2">
        {date}
      </Text>
    </View>
  );
};

export default Notification;
