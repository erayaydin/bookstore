import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const KeyboardAvoid = (props: Props) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
                          behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={{ flexDirection: "column" }}>
          {props.children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoid;
