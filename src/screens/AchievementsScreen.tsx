import React from "react";
import { View, ScrollView } from "react-native";

import { Text } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Achievement from "../components/modules/Achievement";

import i18n from "../i18n";

const AchievementsScreen: React.FC = () => {
  return (
    <LayoutSafeArea main ignoreBottom>
      <ScrollView>
        <View style={{ flex: 1, padding: 24, paddingTop: 40 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              category="h1"
              style={{
                textAlign: "center",
                paddingLeft: 15,
                paddingRight: 15,
              }}>
              {i18n.t("achievements_heading")}
            </Text>
          </View>
          <View style={{ marginTop: 40 }}>
            <Text category="h3">{i18n.t("achievements_air")}</Text>
            <View
              style={{
                marginTop: 20,
                marginBottom: 25,
                flexDirection: "row",
              }}>
              <Achievement
                name={i18n.t("achievements_air_beginner_title")}
                iconName="cloud"
                color="#3F74F9"
                description={i18n.t("achievements_air_beginner_subheading")}
                isUnlock={true}
              />
              <Achievement
                name={i18n.t("achievements_air_advanced_title")}
                iconName=""
                color="#3F74F9"
                description={i18n.t("achievements_air_advanced_subheading")}
                isUnlock={false}
              />
              <Achievement
                name={i18n.t("achievements_air_ventilator_title")}
                iconName=""
                color="#3F74F9"
                description={i18n.t("achievements_air_ventilator_subheading")}
                isUnlock={false}
              />
            </View>
            <Text category="h3">{i18n.t("achievements_feedback")}</Text>
            <View
              style={{
                marginTop: 20,
                marginBottom: 25,
                flexDirection: "row",
              }}>
              <Achievement
                name={i18n.t("achievements_feedback_radio_title")}
                iconName="thumbs-up"
                color="#FFDB63"
                description={i18n.t("achievements_feedback_radio_subheading")}
                isUnlock={true}
              />
              <Achievement
                name={i18n.t("achievements_feedback_informant_title")}
                iconName="cofee"
                color="#FFDB63"
                description={i18n.t(
                  "achievements_feedback_informant_subheading"
                )}
                isUnlock={false}
              />
            </View>
            <Text category="h3">{i18n.t("achievements_special")}</Text>
            <View
              style={{
                marginTop: 20,
                marginBottom: 25,
                flexDirection: "row",
              }}>
              <Achievement
                name={i18n.t("achievements_special_forest_title")}
                iconName=""
                color="#F65656"
                description={i18n.t("achievements_special_forest_subheading")}
                isUnlock={false}
              />
              <Achievement
                name={i18n.t("achievements_special_earth_title")}
                iconName="heart"
                color="#F65656"
                description={i18n.t("achievements_special_earth_subheading")}
                isUnlock={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </LayoutSafeArea>
  );
};

export default AchievementsScreen;
