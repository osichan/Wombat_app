import React from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

interface LoadingButtonProps {
  style?: StyleProp<ViewStyle>;
  isProcessed: boolean;
  children: React.ReactNode;
  onPress: () => void;
  activeOpacity?: number;
}

export default function LoadingButton({
  style,
  isProcessed,
  children,
  onPress,
  activeOpacity = 0.8,
}: LoadingButtonProps) {
  if (isProcessed) {
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={[style, styles.loadingButton]}>
      <Image
        source={require("@assets/gif/buttonLoadingGif.gif")}
        style={styles.loadingGif}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingGif: {
    width: 151,
    height: 113,
  },
});
