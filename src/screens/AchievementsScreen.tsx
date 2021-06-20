import React from "react";
import { View, ScrollView } from "react-native";

import { Text, Spinner } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Achievement from "../components/modules/Achievement";

import i18n from "../i18n";

import { useQuery } from "../gqless";

const AchievementsScreen: React.FC = () => {
  const query = useQuery();
  const badgesFromGoodAir = query.badgesFromGoodAir({ id: "1" });
  const badgesFromFeedback = query.badgesFromFeedback({ id: "1" });
  const badgesSpecial = query.badgesSpecial({ id: "1" });

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
                  {badgesFromGoodAir?.map((badge) => (
                    <Achievement
                      key={badge.id}
                      name={badge.title}
                      iconName={badge.icon}
                      color={badge.color}
                      description={badge.description}
                      isUnlock={badge.isUnlock}
                    />
                  ))}
                </View>
                <Text category="h3">{i18n.t("achievements_feedback")}</Text>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 25,
                    flexDirection: "row",
                  }}>
                  {badgesFromFeedback?.map((badge) => (
                    <Achievement
                      key={badge.id}
                      name={badge.title}
                      iconName={badge.icon}
                      color={badge.color}
                      description={badge.description}
                      isUnlock={badge.isUnlock}
                    />
                  ))}
                </View>
                <Text category="h3">{i18n.t("achievements_special")}</Text>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 25,
                    flexDirection: "row",
                  }}>
                  {badgesSpecial?.map((badge) => (
                    <Achievement
                      key={badge.id}
                      name={badge.title}
                      iconName={badge.icon}
                      color={badge.color}
                      description={badge.description}
                      isUnlock={badge.isUnlock}
                    />
                  ))}
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
