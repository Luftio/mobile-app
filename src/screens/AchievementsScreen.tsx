import React from "react";
import { View, ScrollView } from "react-native";

import { Text, Spinner } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Achievement from "../components/modules/Achievement";

import i18n from "../i18n";

import { useQuery } from "../gqless";

const AchievementsScreen: React.FC = () => {
  const query = useQuery();
  const achievements = query.achievements;

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
            {query.$state.isLoading ? (
              <View style={{ marginTop: 40, alignItems: "center" }}>
                <Spinner size="large" />
              </View>
            ) : (
              <>
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
                    isUnlock={achievements?.some((it) => it.name == "achievements_air_beginner")}
                    badgeUrl="https://luftio.knaufizolace.cz/luftio/odznak-zacatecnik/"
                  />
                  <Achievement
                    name={i18n.t("achievements_air_advanced_title")}
                    iconName="zap"
                    color="#3F74F9"
                    description={i18n.t("achievements_air_advanced_subheading")}
                    isUnlock={achievements?.some((it) => it.name == "achievements_air_advanced")}
                    badgeUrl="https://luftio.knaufizolace.cz/luftio/odznak-pokrocily/"
                  />
                  <Achievement
                    name={i18n.t("achievements_air_ventilator_title")}
                    iconName="star"
                    color="#3F74F9"
                    description={i18n.t("achievements_air_ventilator_subheading")}
                    isUnlock={achievements?.some((it) => it.name == "achievements_air_ventilator")}
                    badgeUrl="https://luftio.knaufizolace.cz/luftio/odznak-master/"
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
                    isUnlock={achievements?.some((it) => it.name == "achievements_feedback_radio")}
                    badgeUrl="https://luftio.knaufizolace.cz/luftio/odznak-radista"
                  />
                  <Achievement
                    name={i18n.t("achievements_feedback_informant_title")}
                    iconName="tv"
                    color="#FFDB63"
                    description={i18n.t("achievements_feedback_informant_subheading")}
                    isUnlock={achievements?.some((it) => it.name == "achievements_feedback_informant")}
                    badgeUrl="https://luftio.knaufizolace.cz/luftio/odznak-informator/"
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
                    iconName="map"
                    color="#F65656"
                    description={i18n.t("achievements_special_forest_subheading")}
                    isUnlock={achievements?.some((it) => it.name == "achievements_special_forest")}
                    badgeUrl="https://luftio.knaufizolace.cz/luftio/odznak-den-lesu/"
                  />
                  <Achievement
                    name={i18n.t("achievements_special_earth_title")}
                    iconName="heart"
                    color="#F65656"
                    description={i18n.t("achievements_special_earth_subheading")}
                    isUnlock={achievements?.some((it) => it.name == "achievements_special_earth")}
                    badgeUrl="https://luftio.knaufizolace.cz/luftio/odznak-den-zeme/"
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </LayoutSafeArea>
  );
};

export default AchievementsScreen;
