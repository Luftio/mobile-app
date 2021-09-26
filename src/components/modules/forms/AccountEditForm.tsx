import React, { useState, useEffect } from "react";

import { Text, Input, Button, Spinner, Icon } from "@ui-kitten/components";

import { showMessage } from "react-native-flash-message";

import { useGetAccountQuery, useChangePasswordMutation } from "../../../graphql";

import i18n from "../../../i18n";

const AccountEditForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const query = useGetAccountQuery();
  const [changePassword, { loading: passwordLoading }] = useChangePasswordMutation({
    onCompleted: (result) => {
      if (result)
        showMessage({
          message: i18n.t("done"),
          description: i18n.t("password_change_complete"),
          type: "success",
          icon: { icon: "success", position: "left" },
          duration: 2500,
          renderFlashMessageIcon: () => (
            <Icon name="check-circle" style={{ color: "#fff", width: 24, height: 24, marginRight: 8 }} />
          ),
          style: { paddingBottom: 20 },
        });
      else setPasswordError(i18n.t("msg_password_invalid"));
    },
    onError: () => {
      setPasswordError(i18n.t("error_network_desc"));
    },
  });
  useEffect(() => {
    setFirstName(query.data?.account.first_name || "");
    setLastName(query.data?.account.last_name || "");
    setEmail(query.data?.account.email || "");
  }, [query.data?.account.first_name, query.data?.account.last_name, query.data?.account.email]);

  return (
    <>
      <Text category="h3" style={{ marginBottom: 15 }}>
        {i18n.t("account_edit_subheading_info")}
      </Text>
      {/* <EmailChangedCard /> */}
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
        editable={false}
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
        editable={false}
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
        editable={false}
        style={{ marginBottom: 15 }}
      />
      {/*<Button size="large" onPress={() => {}} disabled={false}>
        {i18n.t("save")}
        </Button>*/}
      <Text category="h3" style={{ marginBottom: 15, marginTop: 30 }}>
        {i18n.t("account_edit_subheading_password")}
      </Text>
      <Input
        label={() => (
          <Text category="label" style={{ marginBottom: 5 }}>
            {i18n.t("account_edit_password_current")}
          </Text>
        )}
        size="large"
        placeholder={i18n.t("account_edit_password_current_placeholder")}
        value={password}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{ marginBottom: 15 }}
      />
      <Input
        label={() => (
          <Text category="label" style={{ marginBottom: 5 }}>
            {i18n.t("account_edit_password_new")}
          </Text>
        )}
        size="large"
        placeholder={i18n.t("account_edit_password_new_placeholder")}
        value={newPassword}
        textContentType="newPassword"
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry
        style={{ marginBottom: 15 }}
      />
      <Input
        label={() => (
          <Text category="label" style={{ marginBottom: 5 }}>
            {i18n.t("account_edit_password_repeat_new")}
          </Text>
        )}
        size="large"
        placeholder={i18n.t("account_edit_password_repeat_new_placeholder")}
        value={repeatNewPassword}
        textContentType="newPassword"
        onChangeText={(text) => setRepeatNewPassword(text)}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />
      {passwordError != null && (
        <Text category="c2" status="danger">
          {passwordError}
        </Text>
      )}
      {passwordLoading && <Spinner size="large" />}
      <Button
        size="large"
        onPress={() => changePassword({ variables: { currentPassword: password, newPassword } })}
        disabled={
          passwordLoading ||
          !password ||
          !repeatNewPassword ||
          newPassword.length < 12 ||
          repeatNewPassword != newPassword
        }
        style={{ marginTop: 10 }}>
        {i18n.t("change_password")}
      </Button>
    </>
  );
};

export default AccountEditForm;
