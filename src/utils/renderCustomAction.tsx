import React from "react";

import { TopNavigationAction, Icon } from "@ui-kitten/components";
import { GestureResponderEvent } from "react-native";

const navigateAction = (iconName: string, onPress: (event: GestureResponderEvent) => void) => {
  return () => (
    <TopNavigationAction
      icon={(props) => <Icon {...props} name={iconName} style={{ color: "#838C97", width: 24, height: 24 }} />}
      onPress={onPress}
    />
  );
};

export default navigateAction;
