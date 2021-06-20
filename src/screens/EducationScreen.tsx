import React from "react";
import { View } from "react-native";

import { Text, TopNavigation, Spinner } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import CollapsibleCard from "../components/modules/CollapsibleCard";

import i18n from "../i18n";

import { useQuery } from "../gqless";

const EducationScreen: React.FC = () => {
  const query = useQuery();
  const educationCO2 = query.educationCO2({ id: "1" });

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
        {query.$state.isLoading ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Spinner size="large" />
          </View>
        ) : (
          educationCO2?.map((card) => (
            <CollapsibleCard title={card.title} content={card.content} useBezier contentHeight={140} />
          ))
        )}
      </View>
    </LayoutSafeArea>
  );
};

export default EducationScreen;
