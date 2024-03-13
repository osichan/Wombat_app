import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from "react-native";

import BlockBackButton from "../../../components/navigation/BlockBackButton";
import PermissionCheck from "../../../components/app/PermissionCheck";

export default function HomeScreen({ navigation }: any) {
  const buttons = [
    {
      text: "Люди",
      source: require("@assets/images/workersImage.png"),
      whereToNavigate: "PersonStackNavigator",
      permissionId: [4],
    },
    {
      text: "Інструменти",
      source: require("@assets/images/toolsImage.png"),
      whereToNavigate: "ToolsStackNavigator",
      permissionId: [24],
    },
    {
      text: "Матеріали",
      source: require("@assets/images/materialsImage.png"),
      whereToNavigate: "ConsumablesStackNavigator",
      permissionId: [20],
    },
  ];
  BlockBackButton();
  return (
    <>
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          data={buttons}
          renderItem={({ item }) => {
            return (
              <PermissionCheck permissionsToBeVisible={item.permissionId}>
                <TouchableOpacity
                  style={styles.main}
                  onPress={() => {
                    navigation.navigate(item.whereToNavigate);
                  }}
                  activeOpacity={0.8}
                >
                  <Image source={item.source} style={styles.image} />
                  <Text style={styles.text}>{item.text}</Text>
                </TouchableOpacity>
              </PermissionCheck>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    paddingVertical: "10%",
    alignItems: "center",
  },
  main: {
    height: 205,
    width: 365,
    backgroundColor: "#D9D9D9",
    marginTop: 15,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 105,
    height: 105,
  },
  text: {
    fontSize: 22,
    marginTop: 10,
    fontFamily: "Montserrat-600",
  },
});
