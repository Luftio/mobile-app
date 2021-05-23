import React from "react";
import { View } from "react-native";

import { Text, Icon } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import ProfileRow from "../components/modules/ProfileRow";

import i18n from "../i18n";

const ProfileScreen: React.FC = () => {
  return (
    <>
      <LayoutSafeArea main>
        <View style={{ flex: 1, padding: 24, paddingTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 80,
            }}>
            <View>
              <Text category="h1" style={{ paddingBottom: 3 }}>
                Aleš Zima
              </Text>
              <Text category="p1" style={{ color: "#000", fontSize: 16 }}>
                zima@gmail.com
              </Text>
            </View>
            <Icon
              name="log-out"
              style={{ color: "#F36A66", width: 26, height: 26 }}
            />
          </View>
          <ProfileRow iconName="user-check" text={i18n.t("profile_account")} />
          <ProfileRow iconName="cpu" text={i18n.t("profile_devices")} />
          <ProfileRow iconName="moon" text={i18n.t("profile_night_mode")} />
          <ProfileRow iconName="settings" text={i18n.t("profile_settings")} />
          <ProfileRow iconName="info" text={i18n.t("profile_info")} />
          <ProfileRow
            iconName="alert-triangle"
            text={i18n.t("profile_problem")}
          />
        </View>
      </LayoutSafeArea>
    </>
  );
};

export default ProfileScreen;
