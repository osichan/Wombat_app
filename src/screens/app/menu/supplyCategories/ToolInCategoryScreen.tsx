import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import SupplyCategoryComponent from "../../../../components/app/menu/category/SupplyCategoryComponent";
import { requestToGetSupplyByCategoryId } from "../../../../services/api/SupplyApiServices";
import { SupplyCategoryProps, SupplyProps } from "../../../../types/Types";

type ToolInCategoryScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { category: SupplyCategoryProps }>, string>;
};

export default function ToolInCategoryScreen({
  navigation,
  route,
}: ToolInCategoryScreenProps) {
  const [supply, setSupply] = useState<SupplyProps[]>([]);
  const { setConnectionStatus } = useConnectionAlert();
  useFocusEffect(
    React.useCallback(() => {
      const getSupplyByCategory = async () => {
        const result = await requestToGetSupplyByCategoryId(
          route.params.category.id
        );
        if (result) {
          setSupply(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      };
      getSupplyByCategory();
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Інструменти в категорії</Text>
        <PermissionCheck permissionsToBeVisible={[25]}>
          <TouchableOpacity
            style={styles.addIconButton}
            onPress={() =>
              navigation.navigate("HomeStack", {
                screen: "ToolsStackNavigator",
                params: {
                  screen: "AddToolScreen",
                  params: {
                    category: route.params.category.name,
                  },
                },
              })
            }
          >
            <Image
              style={styles.addIcon}
              source={require("@assets/images/addIconBlack.png")}
            />
          </TouchableOpacity>
        </PermissionCheck>
      </View>
      <FlatList
        nestedScrollEnabled={true}
        data={supply}
        renderItem={({ item }) => {
          return (
            <SupplyCategoryComponent supply={item} navigation={navigation} />
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: 30,
    backgroundColor: "#5EC396",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 50,
    alignSelf: "center",
  },
  deleteButton: {
    width: 290,
    height: 50,
    backgroundColor: "#CC4E4E",
    alignSelf: "center",
    bottom: 15,
    position: "absolute",
  },
  addIconButton: {
    width: 30,
    height: 30,
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    width: 26,
    height: 26,
  },
});
