import { RouteProp, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import SearchBar from "../../../../components/app/SearchBar";
import CategoryComponent from "../../../../components/app/menu/category/CategoryComponent";
import { selectUserInfo } from "../../../../redux/reducers/userInfoReducer";
import {
  requestToGetAllConsumableCategories,
  requestToGetAllToolCategories,
} from "../../../../services/api/SupplyCategoryService";
import { SupplyCategoryProps } from "../../../../types/Types";

type CategoryScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { type: "C" | "T" }>, string>;
};

export default function SupplyCategoryScreen({
  route,
  navigation,
}: CategoryScreenProps) {
  const [categories, setCategories] = useState<SupplyCategoryProps[] | null>(
    null
  );
  const { setConnectionStatus } = useConnectionAlert();
  const [searchText, setSearchText] = useState<string>("");

  const [allCategories, setAllCategories] = useState<SupplyCategoryProps[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const getAllCategories = async () => {
        const result =
          route.params.type === "T"
            ? await requestToGetAllToolCategories()
            : await requestToGetAllConsumableCategories();
        if (result && typeof result !== "boolean") {
          setAllCategories(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      };
      getAllCategories();
    }, [])
  );

  useEffect(() => {
    const getCategories = async () => {
      const searchedCategories = allCategories.filter((category) =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setCategories(searchedCategories);
    };
    getCategories();
  }, [searchText, route.params.type, allCategories]);

  return (
    <View>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(text) => setSearchText(text)}
        dropDownElements={
          useSelector(selectUserInfo)?.permissionIds.includes(29)
            ? [
                {
                  icon: require("@assets/images/addIconMini.png"),
                  text: "створити інструмент",
                  onPress: () =>
                    navigation.navigate("EditSupplyCategoryScreen", {
                      type: route.params.type,
                    }),
                },
              ]
            : []
        }
        placeholder="Пошук категорії"
      />
      <FlatList
        nestedScrollEnabled={true}
        data={categories}
        renderItem={({ item }) => {
          return <CategoryComponent category={item} navigation={navigation} />;
        }}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
    </View>
  );
}
