import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import SearchBar from "../../../../components/app/SearchBar";
import BrigadeComponent from "../../../../components/app/menu/brigades/BrigadeComponent";
import { requestToGetBrigadesBySearch } from "../../../../services/api/BrigadeApiService";
import { BrigadeProps } from "../../../../types/Types";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../redux/reducers/userInfoReducer";

export default function BrigadesScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState<string>("");
  const [shownBrigades, setShownBrigades] = useState<BrigadeProps[]>([]);
  const userInfo = useSelector(selectUserInfo);

  const { setConnectionStatus } = useConnectionAlert();

  const handleSearchDebounced = async () => {
    const result = await requestToGetBrigadesBySearch(searchText);
    if (result) {
      setShownBrigades(result);
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      true;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleSearchDebounced();
    }, [])
  );

  useEffect(() => {
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
        searchText={searchText}
        onSearchTextChange={(text) => setSearchText(text)}
        placeholder="Пошук"
        dropDownElements={
          userInfo.permissionIds.includes(7)
            ? [
                {
                  icon: require("@assets/images/addIconMini.png"),
                  text: "створити інструмент",
                  onPress: () => navigation.navigate("EditBrigadeScreen"),
                },
              ]
            : []
        }
      />
      <FlatList
        nestedScrollEnabled={true}
        data={shownBrigades}
        renderItem={({ item }) => (
          <View>
            <BrigadeComponent brigade={item} navigation={navigation} />
          </View>
        )}
      />
    </>
  );
}
