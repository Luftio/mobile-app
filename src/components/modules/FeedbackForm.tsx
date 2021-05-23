import React, { useState } from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../screens/RootStackParams";

import {
  IndexPath,
  Button,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";

import i18n from "../../i18n";

type FeedbackFormProp = StackNavigationProp<RootStackParamList, "Feedback">;

const FeedbackForm: React.FC = () => {
  const navigation = useNavigation<FeedbackFormProp>();

  const data = [
    i18n.t("how_i_feel__asswer_good"),
    i18n.t("how_i_feel__asswer_bad"),
  ];

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );

  const renderOption = (title: string) => (
    <SelectItem key={title} title={title} />
  );

  const displayValue = data[selectedIndex.row];

  return (
    <View style={{ paddingTop: 40 }}>
      <Text category="h3">{i18n.t("questionnaire")}</Text>
      <View style={{ marginTop: 20, marginBottom: 30 }}>
        <Select
          label={() => (
            <Text category="label" style={{ paddingBottom: 5 }}>
              {i18n.t("how_i_feel_label")}
            </Text>
          )}
          placeholder={i18n.t("how_i_feel_placeholder")}
          size="large"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index: any) => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
      </View>
      <Button
        size="large"
        onPress={() => navigation.replace("FeedbackSuccess")}>
        {i18n.t("send")}
      </Button>
    </View>
  );
};

export default FeedbackForm;
