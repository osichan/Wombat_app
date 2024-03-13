import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../../redux/reducers/userInfoReducer";
import { requestToGetToolsByQuery } from "../../../../../services/api/SupplyApiServices";
import { requestToGetAllTools } from "../../../../../services/api/ToolApiService";
import { ToolProps } from "../../../../../types/Types";
import { useConnectionAlert } from "../../../../ConnectionAlertProvider";
import focusEffectToGetData from "../../../../focusEffectToGetData";
import SearchBar from "../../../SearchBar";
import SupplyComponent from "../SupplyComponent";

type ToolsScreenComponentProps = {
  navigation: NavigationProp<any, any>;
  groupByField: "WH" | "OP" | "SS" | "category";
};

export default function ToolsScreenComponent({
  navigation,
  groupByField,
}: ToolsScreenComponentProps) {
  const { setConnectionStatus } = useConnectionAlert();
  const [allTools, setAllTools] = useState<ToolProps[] | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(false);

  const [filteredData, setFilteredData] = useState<{
    [key: string]: ToolProps[];
  }>({});

  const groupToolsByType = async (tools: ToolProps[]) => {
    const groupedTools: { [key: string]: ToolProps[] } = {};
    for (let i = 0; i < tools.length; i++) {
      const tool = tools[i];
      if (groupByField !== "category") {
        if (tool.currentlyAt.type === groupByField) {
          let field;
          if (tool.currentlyAt.type === "OP") {
            field = tool.currentlyAt.data.project.name;
          } else {
            field = tool.currentlyAt.data;
          }
          if (!groupedTools[field]) {
            groupedTools[field] = [];
          }
          groupedTools[field].push(tool);
          setTimeout(() => {
            setFilteredData(groupedTools);
          }, 1);
        }
      } else {
        const field = tool.category === null ? "без категорії" : tool.category;
        if (!groupedTools[field]) {
          groupedTools[field] = [];
        }
        groupedTools[field].push(tool);
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
        const result = await requestToGetToolsByQuery({
          byWhat: "search",
          queryValue: searchText,
        });
        if (result) {
          groupToolsByType(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      } else {
        groupToolsByType(allTools ? allTools : []);
      }
    };

    const searchTimer = setTimeout(() => {
      handleSearchDebounced();
    }, 800);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchText, allTools]);

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllTools,
        setData: setAllTools,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <>
      <SearchBar
        placeholder="Пошук інструментів"
        searchText={searchText}
        onSearchTextChange={(text: string) => setSearchText(text)}
        dropDownElements={
          useSelector(selectUserInfo)?.permissionIds.includes(25)
            ? [
                {
                  icon: require("@assets/images/addIconMini.png"),
                  text: "створити матеріал",
                  onPress: () => navigation.navigate("AddToolScreen"),
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
      {!isDataRequestProcessed && (
        <Image
          source={require("@assets/gif/buttonLoadingGif.gif")}
          style={{
            width: "100%",
            position: "absolute",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        />
      )}
    </>
  );
}
