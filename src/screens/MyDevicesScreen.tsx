import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Text, TopNavigation, Spinner } from "@ui-kitten/components";
import renderBackAction from "../utils/renderBackAction";

import LayoutSafeArea from "../components/layouts/LayoutSafeArea";
import DeviceCard from "../components/modules/DeviceCard";

import i18n from "../i18n";

import { useQuery } from "../gqless";
import { useNavigation } from "@react-navigation/native";

const MyDevicesScreen: React.FC = () => {
  const navigation = useNavigation();

  const query = useQuery();
  const manageDevices = query.devices;

  return (
    <LayoutSafeArea main>
      <TopNavigation
        title={() => <Text category="h4">{i18n.t("profile_devices")}</Text>}
        alignment="center"
        //@ts-ignore
        accessoryLeft={renderBackAction}
        style={{ backgroundColor: "#FAFAFA" }}
      />
      <View style={{ flex: 1, padding: 24 }}>
        {query.$state.isLoading ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Spinner size="large" />
          </View>
        ) : (
          manageDevices?.map((device) => (
            <TouchableOpacity onPress={() => navigation.navigate("DeviceSettings", { device })}>
              <DeviceCard key={device.id} name={device.title} code={device.label} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </LayoutSafeArea>
  );
};

export default MyDevicesScreen;
