import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../redux/reducers/userInfoReducer";
import { requestToGetAllConsumablesByQuery } from "../../../services/api/ConsumablesApiService";
import { requestToGetAllToolsByQuery } from "../../../services/api/ToolApiService";
import { ConsumableProps, ToolProps } from "../../../types/Types";
import { useConnectionAlert } from "../../ConnectionAlertProvider";
import SearchBar from "../SearchBar";
import SupplyInWarheouseListComponent from "./SupplyInWarheouseListComponent";

type SupplyInWarehouseComponentProps = {
  navigation: NavigationProp<any, any>;
  warehouseName?: string;
  type: "T" | "C";
};

export default function SupplyInWarehouseComponent({
  navigation,
  warehouseName,
  type,
}: SupplyInWarehouseComponentProps) {
  if (!warehouseName) [navigation.goBack()];
  const { setConnectionStatus } = useConnectionAlert();
  const [allTools, setAllTools] = useState<ToolProps[]>([]);
  const [allConsumables, setAllConsumables] = useState<ConsumableProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isRequestProcesed, setIsRequestProcesed] = useState(false);
  const userInfo = useSelector(selectUserInfo);

  const [filteredData, setFilteredData] = useState<{
    [key: string]: ToolProps[] | ConsumableProps[];
  }>({});

  const groupToolsByType = async (tools: ToolProps[]) => {
    const groupedTools: { [key: string]: ToolProps[] } = {};
    for (let i = 0; i < tools.length; i++) {
      const tool = tools[i];
      const field = tool.category === null ? "без категорії" : tool.category;
      if (!groupedTools[field]) {
        groupedTools[field] = [];
      }
      groupedTools[field].push(tool);
      setTimeout(() => {
        setFilteredData(groupedTools);
      }, 1);
    }
    setTimeout(() => {
      setFilteredData(groupedTools);
    }, 1);
  };

  const groupConsumablesByType = async (consumables: ConsumableProps[]) => {
    const groupedTools: { [key: string]: ConsumableProps[] } = {};
    for (let i = 0; i < consumables.length; i++) {
      const consumable = consumables[i];
      const field =
        consumable.category === null ? "без категорії" : consumable.category;
      if (!groupedTools[field]) {
        groupedTools[field] = [];
      }
      groupedTools[field].push(consumable);
      setTimeout(() => {
        setFilteredData(groupedTools);
      }, 1);
    }
    setTimeout(() => {
      setFilteredData(groupedTools);
    }, 1);
  };

  useEffect(() => {
    setIsRequestProcesed(false);
    const handleSearchDebounced = async () => {
      if (searchText.trim() !== "") {
        const result =
          type === "T"
            ? await requestToGetAllToolsByQuery({
                byWhat: "search",
                queryValue: searchText,
              })
            : await requestToGetAllConsumablesByQuery({
                byWhat: "search",
                queryValue: searchText,
              });
        if (result && typeof result !== "boolean") {
          type === "T"
            ? await groupToolsByType(result)
            : await groupConsumablesByType(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      } else {
        type === "T"
          ? await groupToolsByType(allTools)
          : await groupConsumablesByType(allConsumables);
      }
      setIsRequestProcesed(true);
    };

    const searchTimer = setTimeout(() => {
      handleSearchDebounced();
    }, 800);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchText, allConsumables, allTools]);

  const getData = async () => {
    if (!warehouseName) {
      return 0;
    }
    const result =
      type === "T"
        ? await requestToGetAllToolsByQuery({
            byWhat: "warehouse",
            queryValue: warehouseName,
          })
        : await requestToGetAllConsumablesByQuery({
            byWhat: "warehouse",
            queryValue: warehouseName,
          });
    if (result && typeof result !== "boolean") {
      type === "T" ? setAllTools(result) : setAllConsumables(result);
    } else {
      setConnectionStatus(false, "Не вдалося загрузити дані");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  if (!isRequestProcesed) {
    return (
      <Image
        source={require("@assets/gif/buttonLoadingGif.gif")}
        style={{ width: "100%" }}
      />
    );
  }
  return (
    <>
      <SearchBar
        placeholder="Пошук"
        searchText={searchText}
        onSearchTextChange={(text: string) => setSearchText(text)}
        dropDownElements={
          userInfo?.permissionIds.includes(type === "T" ? 25 : 21)
            ? [
                {
                  icon: require("@assets/images/addIconMini.png"),
                  text: "створити матеріал",
                  onPress: () =>
                    navigation.navigate(
                      "HomeStack",
                      type === "C"
                        ? {
                            screen: "ConsumablesStackNavigator",
                            params: {
                              screen: "AddConsumableScreen",
                              params: {
                                warehouse: warehouseName,
                              },
                            },
                          }
                        : {
                            screen: "ToolsStackNavigator",
                            params: {
                              screen: "AddToolScreen",
                            },
                          }
                    ),
                },
              ]
            : []
        }
      />
      <FlatList
        nestedScrollEnabled={true}
        data={Object.keys(filteredData)}
        renderItem={({ item }) => {
          return (
            <SupplyInWarheouseListComponent
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
