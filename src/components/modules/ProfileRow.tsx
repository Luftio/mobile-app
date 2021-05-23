import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Icon, Text } from "@ui-kitten/components";

interface ProfileRowProps {
  iconName: string;
  text: string;
  onPress?: () => void;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ iconName, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 25,
        }}>
        <View style={{ flex: 0.2 }}>
          <Icon
            name={iconName}
            style={{ color: "#000", width: 24, height: 24 }}
          />
        </View>
        <Text category="p1" style={{ flex: 0.8, fontSize: 18 }}>
          {text}
        </Text>
        <Icon
          name="chevron-right"
          style={{ color: "#838C97", width: 22, height: 22 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileRow;
