import React from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const ChooseHistoryScreen = ({ navigation }: any) => {
  const buttons = [
    {
      text: "Інструментів",
      source: require("@assets/images/toolsImage.png"),
      type: "T",
    },
    {
      text: "Матеріалів",
      source: require("@assets/images/materialsImage.png"),
      type: "C",
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          data={buttons}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.main}
                onPress={() => {
                  navigation.navigate("ConsumableTabNavigator", {
                    screen: "AddedSupplyHistoryScreen",
                    type: item.type,
                    params: {
                      type: item.type,
                    },
                  });
                }}
                activeOpacity={0.8}
              >
                <Image source={item.source} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    paddingTop: "20%",
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

export default ChooseHistoryScreen;
