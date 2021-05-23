import React from "react";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../screens/RootStackParams";

import { TopNavigationAction, Icon } from "@ui-kitten/components";

type renderBackActionProp = StackNavigationProp<RootStackParamList, "Signpost">;

interface renderBackActionProps {
  isProfile: boolean;
}

const renderBackAction: React.FC<renderBackActionProps> = ({ isProfile }) => {
  const navigation = useNavigation<renderBackActionProp>();

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <TopNavigationAction
      icon={(props) => (
        <Icon
          {...props}
          name="chevron-left"
          style={{ color: "#838C97", width: 24, height: 24 }}
        />
      )}
      onPress={() => navigation.goBack()}
    />
  );
};

export default renderBackAction;
