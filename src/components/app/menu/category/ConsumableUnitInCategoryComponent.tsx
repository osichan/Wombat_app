import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ConsumableUnitProps } from "../../../../types/Types";
import PermissionCheck from "../../PermissionCheck";

type ConsumableUnitInCategoryComponentProps = {
  navigation: any;
  unit: ConsumableUnitProps;
};

export default function ConsumableUnitInCategoryComponent({
  navigation,
  unit,
}: ConsumableUnitInCategoryComponentProps) {
  return (
    <TouchableOpacity
      style={styles.main}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ConsumableInUnitScreen", { unit: unit })
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.nameText}>{unit.name}</Text>
        <Text style={styles.descriptionText}>{unit.description}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.articleText}></Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 375,
    height: 75,
    backgroundColor: "#313131",
    alignSelf: "center",
    marginTop: 4,
    borderRadius: 10,
    paddingHorizontal: 17,
    flexDirection: "row",
    paddingTop: 10,
  },
  nameText: {
    fontSize: 20,
    color: "#fff",
  },
  descriptionText: {
    fontSize: 14,
    color: "#FFFFFFCC",
    fontWeight: "500",
    marginTop: 17,
    maxHeight: 80,
  },
  articleText: {
    marginBottom: 10,
    marginTop: "auto",
    marginRight: 0,
    marginLeft: "auto",
    color: "#FFFFFFCC",
    fontSize: 15,
  },
});
