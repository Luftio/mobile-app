import React, { useState } from "react";

import { Text, Input } from "@ui-kitten/components";

import EmailChangedCard from "./EmailChangedCard";

import { useQuery } from "../../gqless";

import i18n from "../../i18n";

const AccountEditForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("Aleš");
  const [lastName, setLastName] = useState<string>("Zima");
  const [email, setEmail] = useState<string>("zima@gmail.com");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const query = useQuery();
  const user = query.user({ id: "1" });

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
        onChangeText={(text) => setRepeatNewPassword(text)}
        secureTextEntry
      />
    </>
  );
};

export default AccountEditForm;
