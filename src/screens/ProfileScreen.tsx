import React from "react";
import { View, TouchableOpacity } from "react-native";

import * as Analytics from "expo-firebase-analytics";

import { LinearGradient } from "expo-linear-gradient";

// @ts-ignore
import UserAvatar from "react-native-user-avatar";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";

import { Text, Icon } from "@ui-kitten/components";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import ProfileRow from "../components/modules/ProfileRow";

import i18n from "../i18n";

import ThingsboardService from "../services/ThingsboardService";
import { useGetAccountQuery } from "../graphql";

import ShimmerPlaceholder from "react-native-shimmer-placeholder";

type ProfileScreenProp = StackNavigationProp<RootStackParamList, "Profile">;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenProp>();

  function logout() {
    ThingsboardService.getInstance().logout();
    navigation.navigate("SignIn");
  }

  const { data, loading } = useGetAccountQuery();

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
              {loading ? (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    width={50}
                    height={50}
                    style={{ borderRadius: 100, marginRight: 15 }}
                  />
                  <ShimmerPlaceholder visible={true}></ShimmerPlaceholder>
                  <View>
                    <ShimmerPlaceholder
                      LinearGradient={LinearGradient}
                      width={150}
                      height={23}
                      style={{ borderRadius: 4, marginBottom: 8 }}
                    />
                    <ShimmerPlaceholder visible={true}></ShimmerPlaceholder>
                    <ShimmerPlaceholder
                      LinearGradient={LinearGradient}
                      width={190}
                      height={18}
                      style={{ borderRadius: 4 }}
                    />
                    <ShimmerPlaceholder visible={true}></ShimmerPlaceholder>
                  </View>
                </View>
              ) : (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <UserAvatar
                    size={50}
                    name={data?.account.first_name + " " + data?.account.last_name}
                    bgColor="#AFB8BF"
                    style={{ marginRight: 15 }}
                    borderRadius={100}
                  />
                  <View>
                    <Text category="h1" style={{ paddingBottom: 3 }}>
                      {data?.account.first_name + " " + data?.account.last_name}
                    </Text>
                    <Text category="p1" style={{ color: "#000", fontSize: 16 }}>
                      {data?.account.email}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                logout();
                Analytics.logEvent("Log out", {
                  screen: "Profile",
                  purpose: "User loged out from account",
                });
              }}>
              <Icon name="log-out" style={{ color: "#F36A66", width: 26, height: 26 }} />
            </TouchableOpacity>
          </View>
          <ProfileRow
            iconName="user-check"
            text={i18n.t("profile_account")}
            onPress={() => {
              navigation.navigate("AccountEdit");
              Analytics.logEvent("Visited account screen", {
                screen: "Profile",
                purpose: "User clicked on account row",
              });
            }}
          />
          <ProfileRow
            iconName="cpu"
            text={i18n.t("profile_devices")}
            onPress={() => {
              navigation.navigate("MyDevices");
              Analytics.logEvent("Visited my devices screen", {
                screen: "Profile",
                purpose: "User clicked on devices row",
              });
            }}
          />
          {/*<ProfileRow
            iconName="settings"
            text={i18n.t("profile_settings")}
            onPress={() => navigation.navigate("Settings")}
          />*/}
          <ProfileRow
            iconName="info"
            text={i18n.t("profile_info")}
            onPress={() => {
              navigation.navigate("Informations");
              Analytics.logEvent("Visited informations screen", {
                screen: "Profile",
                purpose: "User clicked on informations row",
              });
            }}
          />
          <ProfileRow
            iconName="alert-triangle"
            text={i18n.t("profile_problem")}
            onPress={() => {
              navigation.navigate("ReportProblem");
              Analytics.logEvent("Visited report problem", {
                screen: "Profile",
                purpose: "User clicked on report problem row",
              });
            }}
          />
        </View>
      </LayoutSafeArea>
    </>
  );
};

export default ProfileScreen;
