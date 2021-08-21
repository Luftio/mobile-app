import React, { useState } from "react";
import { View, TouchableOpacity, Linking } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../screens/RootStackParams";

import { Text, Input, Icon, Button, CheckBox } from "@ui-kitten/components";

import i18n from "../../../i18n";

type SignUpFormProp = StackNavigationProp<RootStackParamList, "SignIn">;

const SignUpForm: React.FC = () => {
  const navigation = useNavigation<SignUpFormProp>();

  const [showPassword, setShowPassword] = useState<boolean>(true);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pairingCode, setPairingCode] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  const [error, setError] = useState<null | string>(null);

  function signUp() {
    if (!firstName) {
      setError("msg_name_required");
      return;
    }
    if (!lastName) {
      setError("msg_surname_required");
      return;
    }
    if (!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setError("msg_invalid_email");
      return;
    }
    if (!password || !/(?=.*[a-z])(?=.*[A-Z]).{12,}/.test(password)) {
      setError("msg_invalid_password");
      return;
    }
    if (!pairingCode) {
      setError("msg_pairing_code_required");
      return;
    }
    if (!agreed) {
      setError("msg_terms_required");
      return;
    }
    navigation.replace("VerifyEmail");
  }

  return (
    <>
      <View style={{ marginBottom: 30 }}>
        <Input
          label={() => (
            <Text category="label" style={{ paddingBottom: 5 }}>
              {i18n.t("name_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("name_input_placeholder")}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={{ marginBottom: 15 }}
        />
        <Input
          label={() => (
            <Text category="label" style={{ marginBottom: 5 }}>
              {i18n.t("surname_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("surname_input_placeholder")}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={{ marginBottom: 15 }}
        />
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
          style={{ marginBottom: 15 }}
        />
        <Input
          label={() => (
            <Text category="label" style={{ marginBottom: 5 }}>
              {i18n.t("pairing_code_input_label")}
            </Text>
          )}
          size="large"
          placeholder={i18n.t("pairing_code_input_placeholder")}
          value={pairingCode}
          onChangeText={(text) => setPairingCode(text)}
          style={{ marginBottom: 15 }}
        />
        <CheckBox checked={agreed} onChange={(nextChecked) => setAgreed(nextChecked)} style={{ marginBottom: 16 }}>
          {() => (
            <Text category="c1" style={{ marginLeft: 15 }}>
              {i18n.t("agree_with")}&nbsp;
              <Text
                category="c1"
                style={{ textDecorationLine: "underline" }}
                onPress={() => Linking.openURL(i18n.t("term_url"))}>
                {i18n.t("terms_link")}
              </Text>
            </Text>
          )}
        </CheckBox>
        {error != null && (
          <Text category="c2" status="danger" style={{ marginTop: 8 }}>
            {i18n.t(error)}
          </Text>
        )}
      </View>
      <Button size="large" onPress={() => signUp()}>
        {i18n.t("sign_up")}
      </Button>
    </>
  );
};

export default SignUpForm;
