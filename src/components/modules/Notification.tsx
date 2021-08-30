import React from "react";
import { View } from "react-native";
import { Text, Icon } from "@ui-kitten/components";

interface NotificationProps {
  name: string;
  text: string;
  sub?: string;
  date: string;
  isGeneral?: boolean;
  showDate: boolean;
}

const Notification: React.FC<NotificationProps> = ({ name, text, sub, date, isGeneral, showDate }) => {
  return (
    <>
      {showDate && (
        <Text style={{ marginTop: 15, marginBottom: 12, fontSize: 16 }} category="s2">
          {date}
        </Text>
      )}
      <View
        style={{
          backgroundColor: "#fff",
          marginBottom: 5,
          padding: 15,
          borderRadius: 4,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.04,
          shadowRadius: 1.0,
          elevation: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        {isGeneral ? (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: "#3F74F9",
              marginRight: 12,
              marginLeft: 30,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Icon
              style={{
                width: 22,
                height: 22,
                color: "#fff",
              }}
              name="message-circle"
            />
          </View>
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              backgroundColor: "#F65656",
              marginRight: 12,
              marginLeft: 30,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Icon
              style={{
                width: 22,
                height: 22,
                color: "#fff",
              }}
              name="alert-triangle"
            />
          </View>
        )}
        <View>
          <Text style={{ marginBottom: 5, fontSize: 16 }} category="h3">
            {name}
          </Text>
          <Text style={{ marginBottom: 5, fontSize: 14, paddingRight: 30 }} category="p1">
            {text}
          </Text>
          {sub && (
            <Text style={{ marginBottom: 5, fontSize: 14, paddingRight: 30 }} category="s2">
              {sub}
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Notification;
