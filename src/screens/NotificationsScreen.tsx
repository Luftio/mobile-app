import React, { useState } from "react";
import { View, RefreshControl } from "react-native";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Notification from "../components/modules/Notification";
import EmptyState from "../components/modules/EmptyState";

import { Text, Spinner } from "@ui-kitten/components";

import i18n from "../i18n";

import { useGetNotificationsQuery } from "../graphql";
import { ScrollView } from "react-native-gesture-handler";

import moment from "moment";

const NotificationsScreen: React.FC = () => {
  const { data, loading, refetch } = useGetNotificationsQuery();

  const formatDate = (date: any) => {
    const dateJs = new Date(date);
    return moment(dateJs).format("dd D. M.");
  };

  return (
    <>
      <LayoutSafeArea main>
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => refetch()} />}>
          <View style={{ flex: 1, padding: 24, paddingTop: 40 }}>
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <Text
                category="h1"
                style={{
                  textAlign: "center",
                  paddingLeft: 15,
                  paddingRight: 15,
                }}>
                {i18n.t("notifications")}
              </Text>
            </View>
            {/* TODO filter <View
            style={{
              flexDirection: "row",
              marginBottom: 40,
            }}>
            <Button
              onPress={() => setActive("today")}
              appearance={active === "today" ? "filled" : "outline"}
              status="basic"
              size="large"
              style={{
                marginRight: 20,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.04,
                shadowRadius: 1.0,
                elevation: 1,
              }}>
              {i18n.t("today")}
            </Button>
            <Button
              onPress={() => setActive("yesterday")}
              appearance={active === "yesterday" ? "filled" : "outline"}
              status="basic"
              size="large"
              style={{
                marginRight: 20,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.04,
                shadowRadius: 1.0,
                elevation: 1,
              }}>
              {i18n.t("yesterday")}
            </Button>
            </View>*/}
            {loading ? (
              <View style={{ marginTop: 40, alignItems: "center" }}>
                <Spinner size="large" />
              </View>
            ) : data?.notifications == null || data?.notifications.length == 0 ? (
              <EmptyState text={i18n.t("notifications_screen_empty_state")} />
            ) : (
              data?.notifications.map((notification) => {
                if (notification.__typename == "GenericNotification") {
                  return (
                    <Notification
                      isGeneral={true}
                      key={notification.id}
                      name={notification.title}
                      text={notification.text}
                      date={formatDate(notification.date)}
                    />
                  );
                } else if (notification.__typename == "EventFromMeasure") {
                  return (
                    <Notification
                      isGeneral={false}
                      key={notification.id}
                      name={notification.title}
                      text={notification.justification}
                      date={formatDate(notification.date)}
                    />
                  );
                }
              })
            )}
          </View>
        </ScrollView>
      </LayoutSafeArea>
    </>
  );
};

export default NotificationsScreen;
