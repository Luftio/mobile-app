import React from "react";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../screens/RootStackParams";

import { TopNavigationAction, Icon } from "@ui-kitten/components";

type navigateActionProp = StackNavigationProp<RootStackParamList, "MeasureDetail">;

const navigateAction = (data: any) => {
  const navigation = useNavigation<navigateActionProp>();

  return (
    <TopNavigationAction
      icon={(props) => <Icon {...props} name="info" style={{ color: "#838C97", width: 24, height: 24 }} />}
      onPress={() => navigation.navigate("Education", { data: data }}
    />
  );
};

export default navigateAction;
