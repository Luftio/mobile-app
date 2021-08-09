import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Share } from "react-native";

import { Icon, Text, Button } from "@ui-kitten/components";

import RBSheet from "react-native-raw-bottom-sheet";

import i18n from "../../i18n";

interface AchievementProps {
  name: string;
  description?: string;
  iconName: string;
  color: string;
  isUnlock?: boolean;
  badgeUrl: string;
}

const Achievement: React.FC<AchievementProps> = ({
  name,
  description,
  iconName,
  color,
  isUnlock,
  badgeUrl,
}) => {
  const [error, setError] = useState<null | string>(null);
  const [result, setResult] = useState<null | string>(null);

  const refRBSheet = useRef<any>(null);

  let iconColor;
  let backgroundColor;
  let border;
  let borderColor;

  if (isUnlock) {
    backgroundColor = color;
  } else {
    backgroundColor = "transparent";
  }

  if (isUnlock) {
    iconColor = "#fff";
  } else {
    iconColor = "#AFB8BF";
  }

  if (isUnlock) {
    border = "solid";
  } else {
    border = "dashed";
  }

  if (isUnlock) {
    borderColor = "transparent";
  } else {
    borderColor = "#E1E6EA";
  }

  const shareBadge = () => {
    Share.share(
      {
        message: i18n.t("socials_msg"),
        url: i18n.t(badgeUrl),
        title: "Luftio",
      },
      {
        dialogTitle: i18n.t("socials_dialog_title"),
      }
    )
      .then(showResult)
      .catch((error) => setError("error: " + error.message));
  };

  const showResult = (result: any) => {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        setResult("shared with an activityType: " + result.activityType);
      } else {
        setResult("shared");
      }
    } else if (result.action === Share.dismissedAction) {
      setResult("dismissed");
    }
  };

  return (
    <>
      <View style={{ width: "33%", marginBottom: 20 }}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: borderColor,
                borderRadius: 100,
                borderStyle: "dashed",
                marginBottom: 8,
                backgroundColor: backgroundColor,
              }}>
              <Icon
                name={isUnlock ? iconName : "lock"}
                style={{ color: iconColor, width: 28, height: 28 }}
              />
            </View>
            <Text
              category="p2"
              style={{ fontSize: 14, fontWeight: "400", textAlign: "center" }}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        openDuration={250}
        height={350}
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
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 80,
                height: 80,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: borderColor,
                borderRadius: 100,
                borderStyle: "dashed",
                marginBottom: 8,
                backgroundColor: backgroundColor,
              }}>
              <Icon
                name={isUnlock ? iconName : "lock"}
                style={{ color: iconColor, width: 28, height: 28 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20, marginBottom: 30 }}>
            <Text category="h3" style={{ marginBottom: 8 }}>
              {name}
            </Text>
            <Text category="p2" style={{ color: "#000", fontSize: 16 }}>
              {description}
            </Text>
          </View>
          {isUnlock ? (
            <Button onPress={() => shareBadge()} size="large">
              {i18n.t("achievements_share")}
            </Button>
          ) : (
            <Button
              size="large"
              appearance="outline"
              onPress={() => refRBSheet.current.close()}>
              {i18n.t("achievements_close")}
            </Button>
          )}
        </View>
      </RBSheet>
    </>
  );
};

export default Achievement;
