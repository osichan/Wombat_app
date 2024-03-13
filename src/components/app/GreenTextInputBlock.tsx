import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface WarehouseTextInputProps {
  header: string;
  style?: StyleProp<ViewStyle>;
  onChangeText: (value: string) => void;
  value: string;
  valible?: boolean;
  placeholder?: string;
  maxLength?: number;
  keyboardType?: "numeric";
}

export default function GreenTextInputBlock({
  header,
  style,
  onChangeText,
  value,
  valible,
  placeholder,
  maxLength,
  keyboardType,
}: WarehouseTextInputProps) {
  return (
    <View style={[styles.mainView, style]}>
      <Text style={styles.headerText}>{header}</Text>
      <TextInput
        style={[
          styles.textInput,
          valible === false && { borderColor: "#CC4E4E" },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={valible !== false ? "#CCC" : "#CC4E4E"}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: 290,
    height: 60,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5EC396",
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: "#fff",
    fontSize: 16,
    color: "#fff",
    paddingLeft: 12,
  },
});
