import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useConnectionAlert } from "../../../components/ConnectionAlertProvider";
import SearchBar from "../../../components/app/SearchBar";
import ProjectComponent from "../../../components/app/project/ProjectComponent";
import focusEffectToGetData from "../../../components/focusEffectToGetData";
import { selectUserInfo } from "../../../redux/reducers/userInfoReducer";
import {
  requestToGetAllActiveUnActiveProjects,
  requestToGetProjectsBySearch,
} from "../../../services/api/ProjectService";
import { ProjectProps } from "../../../types/Types";

export default function ActiveProjectsScreen({ navigation }: any) {
  const [allProjects, setAllProjects] = useState<ProjectProps[] | null>(null);

  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const [searchText, setSearchText] = useState<string>("");
  const [shownProjects, setShownProjects] = useState<ProjectProps[] | null>(
    allProjects
  );

  const { setConnectionStatus } = useConnectionAlert();

  useEffect(() => {
    const handleSearchDebounced = async () => {
      if (searchText.trim() !== "") {
        const result = await requestToGetProjectsBySearch({
          search: searchText,
          isActive: true,
        });
        if (result) {
          setShownProjects(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      } else {
        setShownProjects(allProjects);
      }
    };

    const searchTimer = setTimeout(() => {
      handleSearchDebounced();
    }, 800);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchText, allProjects]);

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: () => requestToGetAllActiveUnActiveProjects(true),
        setData: setAllProjects,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(text) => setSearchText(text)}
        dropDownElements={
          useSelector(selectUserInfo)?.permissionIds.includes(9)
            ? [
                {
                  icon: require("@assets/images/checkboxIcon.png"),
                  text: "закриті обʼєкти",
                  onPress: () => navigation.navigate("NotActiveProjectsScreen"),
                },
                {
                  icon: require("@assets/images/addIconBlack.png"),
                  text: "створити обʼєкт",
                  onPress: () => navigation.navigate("AddProjectScreen"),
                },
              ]
            : [
                {
                  icon: require("@assets/images/checkboxIcon.png"),
                  text: "закриті обʼєкти",
                  onPress: () => navigation.navigate("NotActiveProjectsScreen"),
                },
              ]
        }
        placeholder="Пошук обʼєкту"
      />
      <FlatList
        nestedScrollEnabled={true}
        data={shownProjects}
        renderItem={({ item }) => (
          <View>
            <ProjectComponent project={item} navigation={navigation} />
          </View>
        )}
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
