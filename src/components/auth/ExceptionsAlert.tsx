import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

interface ExceptionAlertProps {
  textInAlert: Array<string>;
  visible: boolean;
  textType: "big" | "small";
}

const ExceptionAlert = ({
  textInAlert,
  visible,
  textType,
}: ExceptionAlertProps) => {
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(204, 78, 78, 0.1)"
  );
  const [fontSize, setFontSize] = useState(15);
  const [padding, setPadding] = useState(7);
  const [textColor, setTextColor] = useState("#fff");

  useEffect(() => {
    if (visible) {
      setBackgroundColor("rgba(204, 78, 78, 0.8)");
      setTextColor("#fff");
    } else {
      setBackgroundColor("rgba(0, 0, 0, 0)");
      setTextColor("rgba(0,0,0,0)");
    }
    if (textType === "big") {
      setFontSize(18);
      setPadding(9);
    }
  }, [visible, textType]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor, padding: padding },
      ]}
    >
      <FlatList
        nestedScrollEnabled={true}
        data={textInAlert}
        renderItem={({ item }) => (
          <View style={[styles.listItem]}>
            <Text style={[styles.bulletPoint, { color: textColor }]}>
              &bull;
            </Text>
            <Text
              style={[
                styles.textInList,
                { fontSize: fontSize, color: textColor },
              ]}
            >
              {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    top: -5,
    zIndex: 1,
  },
  listItem: {
    flexDirection: "row",
  },
  textInList: {
    color: "#fff",
    fontFamily: "Jost-400",
  },
  bulletPoint: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 8,
    top: 6,
  },
});

export default ExceptionAlert;
