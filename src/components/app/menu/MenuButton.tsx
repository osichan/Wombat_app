import React from "react";
import {
  Image,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface MenuButtonProps {
  source?: ImageSourcePropType;
  text: string;
  marginTop?: number;
  marginBottom?: number;
  onPress: () => void;
}

export default function MenuButton({
  source,
  text,
  marginTop = 38,
  onPress,
  marginBottom,
}: MenuButtonProps) {
  return (
    <TouchableOpacity
      style={[
        { marginTop: marginTop, marginBottom: marginBottom },
        styles.container,
      ]}
      onPress={onPress}
    >
      {source && <Image source={source} style={styles.image} />}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 80,
  },
  image: {
    width: 28,
    height: 28,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 24,
  },
});
