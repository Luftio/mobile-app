import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { client } from "../config/ApolloClient";
import { UpdateTokenDocument, UpdateTokenMutation, UpdateTokenMutationVariables } from "../graphql";

export const registerForPushNotifications = async () => {
  if (Constants.isDevice && Platform.OS !== "web") {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    client.mutate<UpdateTokenMutation, UpdateTokenMutationVariables>({
      mutation: UpdateTokenDocument,
      variables: { token },
    });
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export default {
  registerForPushNotifications,
};
