import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useConnectionAlert } from "../../../../../components/ConnectionAlertProvider";
import PermissionCheck from "../../../../../components/app/PermissionCheck";
import ConsumableUnitInCategoryComponent from "../../../../../components/app/menu/category/ConsumableUnitInCategoryComponent";
import { requestToGetConsumableUnitByCategoryName } from "../../../../../services/api/SupplyApiServices";
import {
  ConsumableUnitProps,
  SupplyCategoryProps,
} from "../../../../../types/Types";

type ConsumableUnitInCategoryScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { category: SupplyCategoryProps }>, string>;
};

export default function ConsumableUnitInCategoryScreen({
  navigation,
  route,
}: ConsumableUnitInCategoryScreenProps) {
  const [units, setUnits] = useState<ConsumableUnitProps[]>([]);

  const { setConnectionStatus } = useConnectionAlert();

  useFocusEffect(
    React.useCallback(() => {
      const getSupplyByCategory = async () => {
        const result = await requestToGetConsumableUnitByCategoryName(
          route.params.category.name
        );
        if (result && typeof result !== "boolean") {
          setUnits(
            result.filter(
              (unit: ConsumableUnitProps) =>
                unit.category === route.params.category.name
            )
          );
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
          true;
        }
      };
      getSupplyByCategory();
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Одиниці матеріалів в категорії</Text>
        <PermissionCheck permissionsToBeVisible={[19]}>
          <TouchableOpacity
            style={styles.addIconButton}
            onPress={() =>
              navigation.navigate("EditConsumableUnitScreen", {
                category: route.params.category.name,
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
      <PermissionCheck permissionsToBeVisible={[24]}>
        <FlatList
          nestedScrollEnabled={true}
          data={units}
          renderItem={({ item }) => {
            return (
              <ConsumableUnitInCategoryComponent
                unit={item}
                navigation={navigation}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </PermissionCheck>
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
