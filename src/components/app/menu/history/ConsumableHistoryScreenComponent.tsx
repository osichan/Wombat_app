import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { requestToGetAllHistoryByTypeAndAction } from "../../../../services/api/SupplyHistoryService";
import {
  ConsumableHistoryProps,
  ToolHistoryProps,
} from "../../../../types/Types";
import { useConnectionAlert } from "../../../ConnectionAlertProvider";
import SearchBar from "../../SearchBar";
import SupplyHistoryComponent from "./SupplyHistoryComponent";

type ConsumableHistoryScreenComponentProps =
  | {
      filterByAction: "C" | "D" | "A";
      type: "T" | "C";
      updateType?: null;
    }
  | { filterByAction: "U"; type: "T" | "C"; updateType: "Взято" | "Повернено" };

export default function ConsumableHistoryScreenComponent({
  filterByAction,
  type,
  updateType,
}: ConsumableHistoryScreenComponentProps) {
  const { setConnectionStatus } = useConnectionAlert();
  const [history, setHistory] = useState();
  const [searchText, setSearchText] = useState<string>("");

  const getHistory = async (isSearch: boolean) => {
    const name = isSearch ? searchText : "";

    const result = await requestToGetAllHistoryByTypeAndAction({
      type,
      action: filterByAction,
      name,
    });
    if (result) {
      if (filterByAction === "U") {
        setHistory(
          result.filter(
            (element: ToolHistoryProps | ConsumableHistoryProps) =>
              element.status === updateType
          )
        );
      } else {
        setHistory(result);
      }
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getHistory(false);
    }, [])
  );

  useEffect(() => {
    const handleSearchDebounced = async () => {
      if (searchText.trim() !== "") {
        getHistory(true);
      } else {
        getHistory(false);
      }
    };

    const searchTimer = setTimeout(() => {
      handleSearchDebounced();
    }, 800);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchText]);

  return (
    <>
      <SearchBar
        placeholder={
          type === "T"
            ? "Пошук історії інструментів"
            : "Пошук історії матеріалів"
        }
        searchText={searchText}
        onSearchTextChange={(text: string) => setSearchText(text)}
        style={{ marginTop: 34 }}
      />
      <FlatList
        nestedScrollEnabled={true}
        data={history}
        renderItem={({ item }) => {
          return <SupplyHistoryComponent history={item} type={type} />;
        }}
      />
    </>
  );
}
