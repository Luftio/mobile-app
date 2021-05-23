import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../screens/RootStackParams";

import { Text, Input, Icon, Button } from "@ui-kitten/components";

import i18n from "../../i18n";

type SignInFormProp = StackNavigationProp<RootStackParamList, "SignIn">;

const SignInForm: React.FC = () => {
  const navigation = useNavigation<SignInFormProp>();

  const [showPassword, setShowPassword] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  function signIn() {
    if (
      !email ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setError("msg_invalid_email");
      return;
    }
    if (!password) {
      setError("msg_password_required");
      return;
    }

    navigation.replace("Home");
  }

  return (
    <>
      <View style={{ marginBottom: 30 }}>
        <Input
          label={() => (
            <Text category="label" style={{ marginBottom: 5 }}>
              {i18n.t("email_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("email_input_placeholder")}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{ marginBottom: 15 }}
        />
        <Input
          label={() => (
            <Text category="label" style={{ marginBottom: 5 }}>
              {i18n.t("pass_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("pass_input_placeholder")}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={showPassword}
          accessoryRight={() => (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                style={{
                  width: 22,
                  height: 22,
                  color: "#E1E6EA",
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          )}
          caption={() => (
            <View style={{ marginTop: 5 }}>
              <Text
                category="c1"
                style={{ textDecorationLine: "underline" }}
                onPress={() => navigation.replace("RequestChange")}>
                {i18n.t("forgot_password")}
              </Text>
            </View>
          )}
        />
        {error != null && (
          <Text category="c2" status="danger" style={{ marginTop: 8 }}>
            {i18n.t(error)}
          </Text>
        )}
      </View>
      <Button size="large" onPress={() => signIn()}>
        {i18n.t("sign_in")}
      </Button>
    </>
  );
};

export default SignInForm;
