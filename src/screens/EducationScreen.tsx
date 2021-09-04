import React from "react";
import { View, ScrollView } from "react-native";

import { Text, TopNavigation } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import { DeviceData } from "../graphql";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import CollapsibleCard from "../components/modules/cards/CollapsibleCard";

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
  const voc = [
    { title: i18n.t("voc_eduaction_card_title_1"), content: i18n.t("voc_eduaction_card_text_1") },
    { title: i18n.t("voc_eduaction_card_title_2"), content: i18n.t("voc_eduaction_card_text_2") },
    { title: i18n.t("voc_eduaction_card_title_3"), content: i18n.t("voc_eduaction_card_text_3") },
  ];

  let cards: { title: string; content: string }[] = [];
  if (data.type === "CO2") {
    cards = CO2;
  } else if (data.type === "temperature") {
    cards = temperature;
  } else if (data.type === "pressure") {
    cards = pressure;
  } else if (data.type === "humidity") {
    cards = humidity;
  } else if (data.type === "siaq" || data.type === "iaq" || data.type === "tvoc") {
    cards = voc;
  }

  return (
    <LayoutSafeArea main ignoreBottom>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("education")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          {cards.map((card: any) => (
            <CollapsibleCard key={card.title} title={card.title} content={card.content} useBezier />
          ))}
        </View>
      </ScrollView>
    </LayoutSafeArea>
  );
};

export default EducationScreen;
