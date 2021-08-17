import React from "react";
import { View } from "react-native";

import { Text, TopNavigation } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import { DeviceData } from "../graphql";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import CollapsibleCard from "../components/modules/CollapsibleCard";

import i18n from "../i18n";

interface EducationScreenProps {
  route: any;
}

const EducationScreen: React.FC<EducationScreenProps> = ({ route }) => {
  const { data }: { data: DeviceData } = route.params;

  const CO2 = [
    { title: i18n.t("co2_eduaction_card_title_1"), content: i18n.t("co2_eduaction_card_text_1") },
    { title: i18n.t("co2_eduaction_card_title_2"), content: i18n.t("co2_eduaction_card_text_2") },
    { title: i18n.t("co2_eduaction_card_title_3"), content: i18n.t("co2_eduaction_card_text_3") },
  ];
  const temperature = [
    { title: i18n.t("temp_eduaction_card_title_1"), content: i18n.t("temp_eduaction_card_text_1") },
    { title: i18n.t("temp_eduaction_card_title_2"), content: i18n.t("temp_eduaction_card_text_2") },
    { title: i18n.t("temp_eduaction_card_title_3"), content: i18n.t("temp_eduaction_card_text_3") },
  ];
  const humidity = [
    { title: i18n.t("humidity_eduaction_card_title_1"), content: i18n.t("humidity_eduaction_card_text_1") },
    { title: i18n.t("humidity_eduaction_card_title_2"), content: i18n.t("humidity_eduaction_card_text_2") },
    { title: i18n.t("humidity_eduaction_card_title_3"), content: i18n.t("humidity_eduaction_card_text_3") },
  ];
  const pressure = [
    { title: i18n.t("pressure_eduaction_card_title_1"), content: i18n.t("pressure_eduaction_card_text_1") },
    { title: i18n.t("pressure_eduaction_card_title_2"), content: i18n.t("pressure_eduaction_card_text_2") },
    { title: i18n.t("pressure_eduaction_card_title_3"), content: i18n.t("pressure_eduaction_card_text_3") },
  ];

  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("education")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <View style={{ flex: 1, padding: 24 }}>
        {data.type === "CO2"
          ? CO2.map((card: any) => <CollapsibleCard title={card.title} content={card.content} useBezier />)
          : data.type === "pressure"
          ? pressure.map((card: any) => <CollapsibleCard title={card.title} content={card.content} useBezier />)
          : data.type === "humidity"
          ? humidity.map((card: any) => <CollapsibleCard title={card.title} content={card.content} useBezier />)
          : temperature.map((card: any) => <CollapsibleCard title={card.title} content={card.content} useBezier />)}
      </View>
    </LayoutSafeArea>
  );
};

export default EducationScreen;
