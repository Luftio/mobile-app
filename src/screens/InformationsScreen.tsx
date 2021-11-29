import React from "react";
import { View, Linking } from "react-native";

import { Text, TopNavigation } from "@ui-kitten/components";

import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import ProfileRow from "../components/modules/ProfileRow";

import i18n from "../i18n";

const InformationsScreen: React.FC = () => {
  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("profile_info")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <View style={{ flex: 1, padding: 24 }}>
        <ProfileRow iconName="file-text" text="GDPR" onPress={() => Linking.openURL(i18n.t("term_url"))} />
        <ProfileRow iconName="globe" text="Web" onPress={() => Linking.openURL(i18n.t("informations_item_web_url"))} />
        <ProfileRow
          iconName="activity"
          text="Status"
          onPress={() => Linking.openURL("https://stats.uptimerobot.com/4V7YjUJ4q3")}
        />
      </View>
    </LayoutSafeArea>
  );
};

export default InformationsScreen;
