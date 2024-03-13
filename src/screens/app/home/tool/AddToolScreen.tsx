import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import GreenTextInputBlock from "../../../../components/app/GreenTextInputBlock";
import GreenTextInputDropDown from "../../../../components/app/GreenTextInputDropDown";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import { requestToGetAllCategories } from "../../../../services/api/SupplyCategoryService";
import { requestToAddTool } from "../../../../services/api/ToolApiService";
import { requestToGetAllWareHouses } from "../../../../services/api/WarehouseApiService";
import { SupplyCategoryProps, WarehouseProps } from "../../../../types/Types";

type AddToolScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<
    Record<string, { category?: string; warehouse?: string }>,
    string
  >;
};

export default function AddToolScreen({
  navigation,
  route,
}: AddToolScreenProps) {
  const [allCategories, setAllCategories] = useState<
    SupplyCategoryProps[] | null
  >(null);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseProps[] | null>(
    null
  );

  const [name, setName] = useState("");
  const [isNameFilled, setIsNameFilled] = useState<boolean>(true);
  const [article, setArticle] = useState("");
  const [isArticleFilled, setIsArticleFilled] = useState<boolean>(true);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(
    route.params?.category ? route.params.category : ""
  );
  const [isCateoryValid, setIsCategoryValid] = useState<boolean>(true);
  const [warehouse, setWarehouse] = useState<string>(
    route.params?.warehouse ? route.params.warehouse : ""
  );
  const [isWarehouseValid, setIsWarehouseValid] = useState<boolean>(true);

  const viewRef = useRef<View | null>(null);
  const mainRef = useRef<View | null>(null);
  const [topValue, setTopValue] = useState(180);

  const onLayout = () => {
    let mainTopValue = 0;
    mainRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      mainTopValue = pageY;
    });
    viewRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      setTopValue(pageY - mainTopValue);
    });
  };

  const [isRequestProcessed, setIsRequestProcessed] = useState(true);
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const { setConnectionStatus } = useConnectionAlert();

  const handleSave = async () => {
    setIsRequestProcessed(false);
    let isEverythingGood = true;
    if (name === "") {
      setIsNameFilled(false);
      isEverythingGood = false;
    } else {
      setIsNameFilled(true);
    }

    if (article === "") {
      setIsArticleFilled(false);
      isEverythingGood = false;
    } else {
      setIsArticleFilled(true);
    }

    if (category === "") {
      setIsCategoryValid(false);
      isEverythingGood = false;
    } else {
      setIsCategoryValid(true);
    }

    if (warehouse === "") {
      setIsWarehouseValid(false);
      isEverythingGood = false;
    } else {
      setIsWarehouseValid(true);
    }

    if (isEverythingGood) {
      const result = await requestToAddTool({
        name,
        article,
        category,
        warehouse,
        description,
      });

      if (typeof result !== "boolean" && result !== null) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }

    setIsRequestProcessed(true);
  };
  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllCategories,
        setData: setAllCategories,
        setIsDataRequestProcessed,
      });
      focusEffectToGetData({
        request: requestToGetAllWareHouses,
        setData: setAllWarehouses,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main} ref={mainRef}>
          <GreenTextInputBlock
            value={name}
            onChangeText={(text) => setName(text)}
            header="Назва інструменту"
            placeholder="Болгарка Т-1"
            valible={isNameFilled}
          />
          <GreenTextInputBlock
            value={article}
            onChangeText={(text) => setArticle(text)}
            header="ID"
            placeholder="БО122"
            style={{ marginTop: 30 }}
            valible={isArticleFilled}
          />
          <View ref={viewRef} onLayout={onLayout}>
            <GreenTextInputBlock
              value={description}
              onChangeText={(text) => setDescription(text)}
              header="Опис"
              placeholder="орендована"
              style={{ marginTop: 30 }}
            />
          </View>
          {route.params?.category === undefined ? (
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                top: topValue + 90,
                zIndex: 3,
              }}
            >
              <GreenTextInputDropDown
                header="Категорія"
                style={{ marginTop: 30 }}
                items={
                  allCategories
                    ? allCategories.filter((category) => category.type === "T")
                    : []
                }
                placeholder={category}
                valible={isCateoryValid}
                onPressToElement={(element) => setCategory(element.name)}
                onPressToLastElement={() =>
                  navigation.navigate("MenuStack", {
                    screen: "SupplyCategoriyStack",
                    params: {
                      screen: "EditSupplyCategoryScreen",
                    },
                  })
                }
                lastElementPermission={29}
              />
            </View>
          ) : (
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                top: topValue + 90,
                zIndex: 2,
              }}
            >
              <GreenTextInputDropDown
                placeholder={warehouse}
                header="Місцезнаходження"
                valible={isWarehouseValid}
                items={allWarehouses}
                style={{ marginTop: 30 }}
                onPressToElement={(element) => setWarehouse(element.name)}
                onPressToLastElement={() =>
                  navigation.navigate("WarehouseStack", {
                    screen: "AddNewWarehouseScreen",
                  })
                }
                lastElementPermission={13}
              />
            </View>
          )}
          {route.params?.category === undefined && (
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                top: topValue + 180,
                zIndex: 2,
              }}
            >
              <GreenTextInputDropDown
                placeholder={warehouse}
                header="Місцезнаходження"
                items={allWarehouses}
                style={{ marginTop: 30 }}
                onPressToElement={(element) => setWarehouse(element.name)}
                onPressToLastElement={() =>
                  navigation.navigate("WarehouseStack", {
                    screen: "AddNewWarehouseScreen",
                  })
                }
                lastElementPermission={13}
              />
            </View>
          )}

          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[styles.bottomButton, { left: -10 }]}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.textInButton}>скасувати зміни</Text>
            </TouchableOpacity>
            <LoadingButton
              style={[styles.bottomButton, styles.saveButton]}
              onPress={() => handleSave()}
              isProcessed={isRequestProcessed}
            >
              <Text style={styles.textInButton}>зберегти</Text>
            </LoadingButton>
          </View>
        </View>
      </ScrollViewEditing>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: 366,
    height: 534,
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingTop: 30,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  typeView: {
    paddingHorizontal: 35,
    marginTop: 30,
  },
  typeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5EC396",
  },
  radioButtonView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  radioButtonTouchable: {
    flexDirection: "row",
  },
  radioButton: {
    width: 21,
    height: 21,
    borderRadius: 3,
    borderWidth: 2.2,
    borderColor: "#fff",
  },
  radioButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  bottomView: {
    width: 370,
    marginTop: "auto",
    marginBottom: -10,
    flexDirection: "row",
  },
  bottomButton: {
    width: 165,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A5A5A",
  },
  saveButton: {
    marginRight: -10,
    marginLeft: "auto",
    backgroundColor: "#5EC396",
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
