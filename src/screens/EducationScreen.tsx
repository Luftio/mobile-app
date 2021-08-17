import React from "react";
import { View } from "react-native";

import { Text, TopNavigation, Spinner } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import CollapsibleCard from "../components/modules/CollapsibleCard";

import i18n from "../i18n";

const EducationScreen: React.FC = () => {
  const content = [{ title: "Lorem ipsum", content: "..." }];

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
        {false ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Spinner size="large" />
          </View>
        ) : (
          content?.map((card, i) => <CollapsibleCard key={i} title={card.title} content={card.content} useBezier />)
        )}
      </View>
    </LayoutSafeArea>
  );
};

export default EducationScreen;
