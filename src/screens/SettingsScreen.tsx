import React, { useRef } from "react";
import { View } from "react-native";

import { Text, TopNavigation, Button } from "@ui-kitten/components";

import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import ProfileRow from "../components/modules/ProfileRow";

import RBSheet from "react-native-raw-bottom-sheet";

import i18n from "../i18n";

const SettingsScreen: React.FC = () => {
  const refRBSheet = useRef<any>(null);

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
        <View>
          <ProfileRow
            iconName="user-x"
            text={i18n.t("settings_item_delete")}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        openDuration={250}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.3);",
            borderTopLeftRadius: 10,
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "#DADADA",
            width: 100,
          },
        }}>
        <View style={{ padding: 24 }}>
          <View style={{ marginTop: 20, marginBottom: 30 }}>
            <Text category="h3" style={{ marginBottom: 8 }}>
              {i18n.t("settings_delete_sheet_heading")}
            </Text>
            <Text category="p2" style={{ color: "#000", fontSize: 16 }}>
              {i18n.t("settings_delete_sheet_subheading")}
            </Text>
          </View>
          <Button size="large">
            {i18n.t("settings_delete_sheet_button_text")}
          </Button>
        </View>
      </RBSheet>
    </LayoutSafeArea>
  );
};

export default SettingsScreen;
