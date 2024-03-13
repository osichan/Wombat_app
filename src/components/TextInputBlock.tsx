import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
} from "react-native";

interface TextInputBlockProps {
  value?: string;
  style?: StyleProp<ViewStyle>;
  headText: string;
  descriptionText?: string;
  placeholder?: string;
  beforeText?: string;
  afterText?: string;
  onChangeText?: (value: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  maxLength?: number;
  secureTextEntry?: boolean;
}

const TextInputBlock = ({
  value,
  style,
  headText,
  descriptionText,
  placeholder,
  beforeText,
  afterText,
  onChangeText,
  keyboardType = "default",
  maxLength = 25,
  secureTextEntry,
}: TextInputBlockProps) => {
  return (
    <View style={[style]}>
      <Text style={styles.headText}>{headText}</Text>
      {descriptionText && (
        <Text style={styles.descriptionText}>{descriptionText}</Text>
      )}
      <View style={{ flexDirection: "row", marginTop: 14 }}>
        <Text style={styles.textInput}>{beforeText}</Text>
        <TextInput
          value={value}
          placeholder={placeholder}
          style={[styles.textInput, { flex: 1 }]}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {afterText && <Text style={styles.textInput}>{afterText}</Text>}
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  headText: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "Jost-600",
  },
  descriptionText: {
    fontFamily: "Jost-400",
    fontSize: 14,
    color: "#fff",
  },
  textInput: {
    fontFamily: "Jost-400",
    color: "#fff",
    fontSize: 18,
    alignSelf: "center",
  },
  line: {
    top: -5,
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default TextInputBlock;
