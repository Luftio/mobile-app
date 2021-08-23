import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Text, Icon, Button } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import ProfileRow from "../components/modules/ProfileRow";

import i18n from "../i18n";
import ThingsboardService from "../services/ThingsboardService";
import { useGetAccountQuery } from "../graphql";

type ProfileScreenProp = StackNavigationProp<RootStackParamList, "Profile">;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenProp>();

  function logout() {
    ThingsboardService.getInstance().logout();
    navigation.navigate("SignIn");
  }

  const { data } = useGetAccountQuery();

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
                {(data?.account.first_name || "") + " " + (data?.account.last_name || "")}
              </Text>
              <Text category="p1" style={{ color: "#000", fontSize: 16 }}>
                {data?.account.email}
              </Text>
            </View>
            <TouchableOpacity onPress={() => logout()}>
              <Icon name="log-out" style={{ color: "#F36A66", width: 26, height: 26 }} />
            </TouchableOpacity>
          </View>
          <ProfileRow
            iconName="user-check"
            text={i18n.t("profile_account")}
            onPress={() => navigation.navigate("AccountEdit")}
          />
          <ProfileRow
            iconName="cpu"
            text={i18n.t("profile_devices")}
            onPress={() => navigation.navigate("MyDevices")}
          />
          {/*<ProfileRow
            iconName="settings"
            text={i18n.t("profile_settings")}
            onPress={() => navigation.navigate("Settings")}
          />*/}
          <ProfileRow
            iconName="info"
            text={i18n.t("profile_info")}
            onPress={() => navigation.navigate("Informations")}
          />
          <ProfileRow
            iconName="alert-triangle"
            text={i18n.t("profile_problem")}
            onPress={() => navigation.navigate("ReportProblem")}
          />
        </View>
      </LayoutSafeArea>
    </>
  );
};

export default ProfileScreen;
