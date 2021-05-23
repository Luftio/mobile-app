import React, { useState } from "react";
import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../screens/RootStackParams";

import { Text, Input, Button } from "@ui-kitten/components";

import i18n from "../../i18n";

type RequestChangeFormProp = StackNavigationProp<
  RootStackParamList,
  "RequestChange"
>;

const RequestChangeForm: React.FC = () => {
  const navigation = useNavigation<RequestChangeFormProp>();

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  function requestChange() {
    if (
      !email ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setError("msg_invalid_email");
      return;
    }

    console.log(email);
    navigation.replace("SendInstructions");
  }

  return (
    <>
      <View style={{ marginBottom: 30 }}>
        <Input
          label={() => (
            <Text category="label" style={{ paddingBottom: 5 }}>
              {i18n.t("email_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("email_input_placeholder")}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {error != null && (
          <Text category="c2" status="danger" style={{ marginTop: 8 }}>
            {i18n.t(error)}
          </Text>
        )}
      </View>
      <Button size="large" onPress={() => requestChange()}>
        {i18n.t("send_instruction")}
      </Button>
    </>
  );
};

export default RequestChangeForm;
