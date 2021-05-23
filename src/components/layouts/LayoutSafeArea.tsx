import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Layout } from "@ui-kitten/components";

export default function LayoutSafeArea(props: any) {
  var insets = useSafeAreaInsets();

  return (
    <Layout
      {...props}
      style={{
        ...props.style,
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: props.ignoreBottom ? 0 : insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: props.main ? "#FAFAFA" : "#FFF",
      }}>
      {props.children}
    </Layout>
  );
}
