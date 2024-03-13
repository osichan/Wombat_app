import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

export default function ChooseCategoryScreen({ navigation }: any) {
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
                  navigation.navigate("SupplyCategoryScreen", {
                    type: item.type,
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
}

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
