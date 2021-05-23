import React, { useState } from "react";
import { View } from "react-native";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import Notification from "../components/modules/Notification";
import EmptyState from "../components/modules/EmptyState";

import { Button } from "@ui-kitten/components";

import i18n from "../i18n";

const NotificationsScreen: React.FC = () => {
  const [active, setActive] = useState<string>("today");

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
              status="control"
              size="large"
              style={{ marginRight: 20 }}>
              {i18n.t("today")}
            </Button>
            <Button
              onPress={() => setActive("tommmorow")}
              appearance={active === "tommmorow" ? "filled" : "outline"}
              status="control"
              size="large"
              style={{ marginRight: 20 }}>
              {i18n.t("yesterday")}
            </Button>
          </View>
          {active === "today" ? (
            <>
              <Notification name="Stoupá hodnota CO2" time="Před 2 hodinami" />
              <Notification
                name="Teplota klesla na 19°C"
                time="Před 6 hodinami"
              />
            </>
          ) : (
            <EmptyState />
          )}
        </View>
      </LayoutSafeArea>
    </>
  );
};

export default NotificationsScreen;
