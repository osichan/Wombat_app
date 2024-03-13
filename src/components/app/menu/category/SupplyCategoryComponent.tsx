import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SupplyProps } from "../../../../types/Types";
import PermissionCheck from "../../PermissionCheck";

type SupplyComponentProps = {
  navigation: any;
  supply: SupplyProps;
};

export default function SupplyCategoryComponent({
  navigation,
  supply,
}: SupplyComponentProps) {
  return (
    <PermissionCheck
      permissionsToBeVisible={supply.measuredBy ? [19] : [29]}
      elseChildren={
        <View style={styles.main}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nameText}>
              {supply.measuredBy
                ? supply.currentlyAt.type === "OP"
                  ? supply.currentlyAt.data.project.name
                  : supply.currentlyAt.data
                : supply.name}
            </Text>
            <Text style={styles.descriptionText}>{supply.description}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.articleText}>{supply.article}</Text>
            <Text style={styles.measuredByText}>
              {supply.unitQuantity} {supply.measuredBy}
            </Text>
          </View>
        </View>
      }
    >
      <TouchableOpacity
        style={styles.main}
        activeOpacity={0.8}
        onPress={() => {
          supply.measuredBy
            ? navigation.navigate("HomeStack", {
                screen: "ConsumablesStackNavigator",
                params: {
                  screen: "ConsumableScreen",
                  params: {
                    consumable: supply,
                  },
                },
              })
            : navigation.navigate("HomeStack", {
                screen: "ToolsStackNavigator",
                params: {
                  screen: "ToolScreen",
                  params: {
                    tool: supply,
                  },
                },
              });
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.nameText}>
            {supply.measuredBy
              ? supply.currentlyAt.type === "OP"
                ? supply.currentlyAt.data.project.name
                : supply.currentlyAt.data
              : supply.name}
          </Text>
          <Text style={styles.descriptionText}>{supply.description}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.articleText}>{supply.article}</Text>
          <Text style={styles.measuredByText}>
            {supply.unitQuantity} {supply.measuredBy}
          </Text>
        </View>
      </TouchableOpacity>
    </PermissionCheck>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 375,
    backgroundColor: "#313131",
    alignSelf: "center",
    marginTop: 4,
    borderRadius: 10,
    paddingHorizontal: 17,
    flexDirection: "row",
    paddingTop: 10,
    paddingVertical: 10,
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
  measuredByText: {
    marginRight: 0,
    marginLeft: "auto",
    color: "#5EC396",
    marginTop: "auto",
    marginBottom: 12,
  },
});
