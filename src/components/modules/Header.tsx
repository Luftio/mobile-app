import React from "react";
import { View } from "react-native";

import { Text } from "@ui-kitten/components";

interface HeaderProps {
  heading: string;
  subheading: string;
}

const Header: React.FC<HeaderProps> = ({ heading, subheading }) => {
  return (
    <View style={{ paddingBottom: 60 }}>
      <Text category="h2" appearance="default" style={{ paddingBottom: 10 }}>
        {heading}
      </Text>
      <Text category="s2">{subheading}</Text>
    </View>
  );
};

export default Header;
