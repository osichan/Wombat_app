import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { ConsumableProps, ToolProps } from "../../../types/Types";

type SupplyInWarheouseListComponentProps = {
  navigation: any;
  supply: ToolProps[] | ConsumableProps[];
  category: string;
};

export default function SupplyInWarheouseListComponent({
  navigation,
  supply,
  category,
}: SupplyInWarheouseListComponentProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View style={{ marginBottom: 1 }}>
      <TouchableOpacity
        style={styles.typeHeader}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
      >
        <Text style={styles.typeHeaderText}>{category}</Text>
        <Image
          source={
            isOpen
              ? require("@assets/images/openRectangleIcon.png")
              : require("@assets/images/closedRectangleIcon.png")
          }
          style={styles.typeHeaderImage}
        />
      </TouchableOpacity>
      {isOpen && (
        <>
          {"article" in supply[0] ? (
            <FlatList
              nestedScrollEnabled={true}
              style={styles.mainContainer}
              data={supply as ToolProps[]}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.main}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("ToolsStackNavigator", {
                        screen: "ToolScreen",
                        params: { tool: item },
                      })
                    }
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.nameText}>{item.name}</Text>
                      <Text style={styles.descriptionText}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.articleText}>{item.article}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <FlatList
              nestedScrollEnabled={true}
              style={styles.mainContainer}
              data={supply as ConsumableProps[]}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.main}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("ToolsStackNavigator", {
                        screen: "ToolScreen",
                        params: { tool: item },
                      })
                    }
                  >
                    <View style={{ flex: 1, marginRight: 20 }}>
                      <Text style={styles.nameText}>{item.name}</Text>
                      <Text style={styles.descriptionText}>
                        {item.unitQuantity}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.articleText}>{item.measuredBy}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  typeHeader: {
    height: 30,
    backgroundColor: "#5EC396",
    flexDirection: "row",
    alignItems: "center",
  },
  typeHeaderText: {
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 50,
    marginRight: 16,
  },
  typeHeaderImage: {
    width: 14,
    height: 14,
  },
  mainContainer: {
    paddingHorizontal: 26,
    zIndex: 1,
  },
  toolComponent: {
    backgroundColor: "#313131",
    marginTop: 5,
    height: 75,
    borderRadius: 10,
  },
  toolComponentText: {
    color: "#fff",
  },
  main: {
    width: 375,
    backgroundColor: "#313131",
    alignSelf: "center",
    marginTop: 4,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 8,
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
    marginRight: 0,
    marginLeft: "auto",
    color: "#FFFFFFCC",
    fontSize: 15,
  },
});
