import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../screens/RootStackParams";

import { Text, Input, Icon, Button } from "@ui-kitten/components";

import i18n from "../../../i18n";

type SetNewPasswordFormProp = StackNavigationProp<RootStackParamList, "SetNewPassword">;

const SetNewPasswordForm: React.FC = () => {
  const navigation = useNavigation<SetNewPasswordFormProp>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  function makeNewPassword() {
    if (!newPassword || !/(?=.*[a-z])(?=.*[A-Z]).{12,}/.test(newPassword)) {
      setError("msg_invalid_password");
      return;
    }
    if (newPassword !== repeatNewPassword) {
      setError("msg_passwords_not_match");
      return;
    }

    navigation.replace("SignIn");
  }

  return (
    <>
      <View style={{ marginBottom: 30 }}>
        <Input
          label={() => (
            <Text category="label" style={{ paddingBottom: 5 }}>
              {i18n.t("new_pass_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("new_pass_input_placeholder")}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry={showPassword}
          accessoryRight={() => (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                style={{
                  width: 22,
                  height: 22,
                  color: "#E1E6EA",
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
          style={{ marginBottom: 15 }}
        />
        <Input
          label={() => (
            <Text category="label" style={{ paddingBottom: 5 }}>
              {i18n.t("repeat_new_pass_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("repeat_new_pass_input_placeholder")}
          value={repeatNewPassword}
          onChangeText={(text) => setRepeatNewPassword(text)}
          secureTextEntry={showConfirm}
          accessoryRight={() => (
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Icon
                name={showConfirm ? "eye-off" : "eye"}
                style={{
                  width: 22,
                  height: 22,
                  color: "#E1E6EA",
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
        />
        {error != null && (
          <Text category="c2" status="danger" style={{ marginTop: 8 }}>
            {i18n.t(error)}
          </Text>
        )}
      </View>
      <Button size="large" onPress={() => makeNewPassword()}>
        {i18n.t("change_password")}
      </Button>
    </>
  );
};

export default SetNewPasswordForm;
