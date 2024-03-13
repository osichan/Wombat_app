import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import SearchBar from "../../../SearchBar";
import SupplyComponent from "../SupplyComponent";
import { useSelector } from "react-redux";
import { ConsumableProps } from "../../../../../types/Types";
import { selectUserInfo } from "../../../../../redux/reducers/userInfoReducer";
import {
  requestToGetAllConsumables,
  requestToGetAllConsumablesBySearch,
} from "../../../../../services/api/ConsumablesApiService";
import { useFocusEffect } from "@react-navigation/native";
import { useConnectionAlert } from "../../../../ConnectionAlertProvider";

type ConsumablesScreenComponentProps = {
  navigation: any;
  groupByField: "WH" | "OP" | "SS";
};

export default function ConsumablesScreenComponent({
  navigation,
  groupByField,
}: ConsumablesScreenComponentProps) {
  const { setConnectionStatus } = useConnectionAlert();
  const [allConsumables, setAllConsumables] = useState<ConsumableProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [filteredData, setFilteredData] = useState<{
    [key: string]: ConsumableProps[];
  }>({});

  const groupToolsByType = async (consumables: ConsumableProps[]) => {
    const groupedTools: { [key: string]: ConsumableProps[] } = {};
    for (let i = 0; i < consumables.length; i++) {
      const consumable = consumables[i];
      if (consumable.currentlyAt.type === groupByField) {
        let field;
        if (consumable.currentlyAt.type === "OP") {
          field = consumable.currentlyAt.data.project.name;
        } else {
          field = consumable.currentlyAt.data;
        }
        if (!groupedTools[field]) {
          groupedTools[field] = [];
        }
        groupedTools[field].push(consumable);
        setTimeout(() => {
          setFilteredData(groupedTools);
        }, 1);
      }
    }
    setTimeout(() => {
      setFilteredData(groupedTools);
    }, 1);
  };

  useEffect(() => {
    const handleSearchDebounced = async () => {
      if (searchText.trim() !== "") {
        const result = await requestToGetAllConsumablesBySearch(searchText);
        if (result && typeof result !== "boolean") {
          groupToolsByType(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      } else {
        groupToolsByType(allConsumables);
      }
    };

    const searchTimer = setTimeout(() => {
      handleSearchDebounced();
    }, 800);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchText, allConsumables]);

  useFocusEffect(
    React.useCallback(() => {
      const getAllConsumables = async () => {
        const result = await requestToGetAllConsumables();
        if (result && typeof result !== "boolean") {
          setAllConsumables(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      };
      getAllConsumables();
    }, [])
  );

  return (
    <>
      <SearchBar
        placeholder="Пошук"
        searchText={searchText}
        onSearchTextChange={(text: string) => setSearchText(text)}
        dropDownElements={
          useSelector(selectUserInfo)?.permissionIds.includes(21)
            ? [
                {
                  icon: require("@assets/images/addIconMini.png"),
                  text: "створити матеріал",
                  onPress: () => navigation.navigate("AddConsumableScreen"),
                },
              ]
            : []
        }
        style={{ marginTop: 34 }}
      />
      <FlatList
        nestedScrollEnabled={true}
        style={{ marginTop: -1 }}
        data={Object.keys(filteredData)}
        renderItem={({ item }) => {
          return (
            <SupplyComponent
              navigation={navigation}
              supply={filteredData[item]}
              category={item}
            />
          );
        }}
      />
    </>
  );
}
