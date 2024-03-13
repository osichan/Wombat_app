import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import GreenTextInputBlock from "../../../../components/app/GreenTextInputBlock";
import GreenTextInputDropDown from "../../../../components/app/GreenTextInputDropDown";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import { requestToGetAllToolCategories } from "../../../../services/api/SupplyCategoryService";
import { requestToUpdateTool } from "../../../../services/api/ToolApiService";
import { SupplyCategoryProps, ToolProps } from "../../../../types/Types";

type EditToolScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { tool: ToolProps }>, string>;
};

export default function EditToolScreen({
  navigation,
  route,
}: EditToolScreenProps) {
  const [allCategories, setAllCategories] = useState<
    SupplyCategoryProps[] | null
  >(null);

  const [name, setName] = useState(route.params.tool.name);
  const [isNameFilled, setIsNameFilled] = useState(true);
  const [article, setArticle] = useState(route.params.tool.article);
  const [isArticleFilled, setIsArticleFilled] = useState(true);
  const [description, setDescription] = useState(route.params.tool.description);
  const [category, setCategory] = useState(route.params.tool.category);

  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const { setConnectionStatus } = useConnectionAlert();

  const handleSave = async () => {
    setIsRequestProcesed(false);
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

    if (isEverythingGood) {
      const result = await requestToUpdateTool({
        id: route.params.tool.id,
        name,
        article,
        description,
        category,
        currentlyAt: route.params.tool.currentlyAt,
      });
      if (typeof result !== "boolean" && result !== null) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
        true;
      }
    }
    setIsRequestProcesed(true);
  };

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllToolCategories,
        setData: setAllCategories,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main}>
          <View
            style={{
              position: "absolute",
              width: 366,
              height: 430,
              backgroundColor: "#313131",
              borderRadius: 10,
            }}
          />
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
          <GreenTextInputBlock
            value={description}
            onChangeText={(text) => setDescription(text)}
            header="Опис"
            placeholder="орендована"
            style={{ marginTop: 30 }}
            valible={isArticleFilled}
          />
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 290,
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
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 380,
              zIndex: 2,
            }}
          ></View>

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
              isProcessed={isRequestProcesed}
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
    height: 500,
    paddingTop: 50,
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
    marginTop: 120,
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
