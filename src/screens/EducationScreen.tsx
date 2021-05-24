import React from "react";
import { View } from "react-native";

import { Text, TopNavigation } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import CollapsibleCard from "../components/modules/CollapsibleCard";

import i18n from "../i18n";

const EducationScreen: React.FC = () => {
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
        <CollapsibleCard
          title={i18n.t("education_CO2_health_title")}
          content={i18n.t("education_CO2_health_content")}
          useBezier
          contentHeight={160}
        />
        <CollapsibleCard
          title={i18n.t("education_CO2_sources_title")}
          content={i18n.t("education_CO2_sources_content")}
          useBezier
          contentHeight={180}
        />
      </View>
    </LayoutSafeArea>
  );
};

export default EducationScreen;
