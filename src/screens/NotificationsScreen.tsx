import React, { useState } from "react";
import { View } from "react-native";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Notification from "../components/modules/Notification";
import EmptyState from "../components/modules/EmptyState";

import { Button, Spinner } from "@ui-kitten/components";

import i18n from "../i18n";

import { useQuery } from "../gqless";

const NotificationsScreen: React.FC = () => {
  const [active, setActive] = useState<string>("today");

  const query = useQuery();
  const notificationsToday = query.notificationsToday({ id: "1" });
  const notificationsYesterday = query.notificationsYesterday({ id: "1" });

  return (
    <>
      <LayoutSafeArea main>
        <View style={{ flex: 1, padding: 24, paddingTop: 40 }}>
          <View
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
          </View>
          {active === "today" ? (
            query.$state.isLoading ? (
              <View style={{ marginTop: 40, alignItems: "center" }}>
                <Spinner size="large" />
              </View>
            ) : notificationsToday == null || notificationsToday.length == 0 ? (
              <EmptyState />
            ) : (
              notificationsToday.map((notification) => (
                <Notification key={notification.id} name={notification.title} time={notification.date} />
              ))
            )
          ) : query.$state.isLoading ? (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <Spinner size="large" />
            </View>
          ) : notificationsYesterday == null || notificationsYesterday.length == 0 ? (
            <EmptyState />
          ) : (
            notificationsYesterday.map((notification) => (
              <Notification key={notification.id} name={notification.title} time={notification.date} />
            ))
          )}
        </View>
      </LayoutSafeArea>
    </>
  );
};

export default NotificationsScreen;
