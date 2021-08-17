import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import { Text, TopNavigation, Spinner } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import DeviceCard from "../components/modules/DeviceCard";

import i18n from "../i18n";

import { useGetDevicesQuery } from "../graphql";
import { useNavigation } from "@react-navigation/native";

const MyDevicesScreen: React.FC = () => {
  const navigation = useNavigation();

  const query = useGetDevicesQuery();

  return (
    <LayoutSafeArea main ignoreBottom>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("profile_devices")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <ScrollView>
        <View style={{ flex: 1, padding: 24 }}>
          {query.loading ? (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <Spinner size="large" />
            </View>
          ) : (
            query.data?.devices?.map((device) => (
              <TouchableOpacity
                key={device.id}
                onPress={() => navigation.navigate("DeviceSettings", { device: { ...device } })}>
                <DeviceCard name={device.title} code={device.label} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </LayoutSafeArea>
  );
};

export default MyDevicesScreen;
