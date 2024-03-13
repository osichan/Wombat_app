import React, { useState } from "react";
import { ScrollView, View, StyleProp, ViewStyle } from "react-native";
import { phoneHeight } from "./ScreenInfo";

type ScrollViewEditingProps = {
  children: React.ReactNode;
  scrollStyle?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
};

export default function ScrollViewEditing({
  scrollStyle,
  children,
  viewStyle,
}: ScrollViewEditingProps) {
  return (
    <ScrollView
      nestedScrollEnabled
      style={scrollStyle ? scrollStyle : { flex: 1 }}
    >
      <View style={[{ height: phoneHeight - 120 }, viewStyle]}>{children}</View>
    </ScrollView>
  );
}
