import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import {
  ConsumableUnitProps,
  MeasurementUnitProps,
  SupplyCategoryProps,
} from "../../../../../types/Types";
import { requestToGetAllConsumableCategories } from "../../../../../services/api/SupplyCategoryService";
import GreenTextInputBlock from "../../../../../components/app/GreenTextInputBlock";
import GreenTextInputDropDown from "../../../../../components/app/GreenTextInputDropDown";
import LoadingButton from "../../../../../components/LoadingButton";
import { requestToGetAllMeasurementUnits } from "../../../../../services/api/MeasurmentUnitApiService";
import {
  requestToAddConsumableUnit,
  requestToUpdateConsumableUnit,
} from "../../../../../services/api/ConsumableUnitApiService";
import ScrollViewEditing from "../../../../../components/ScrollViewEditing";
import { useConnectionAlert } from "../../../../../components/ConnectionAlertProvider";

type EditConsumableUnitScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<
    Record<string, { unit?: ConsumableUnitProps; category?: string }>,
    string
  >;
};

export default function EditConsumableUnitScreen({
  navigation,
  route,
}: EditConsumableUnitScreenProps) {
  const unit = route.params?.unit;
  const [isCategoriesRequestProcessed, setIsCategoriesRequestProcessed] =
    useState(false);
  const [isRequestProcessed, setIsRequestProcessed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  const [allConsumableCategories, setAllConsumableCategories] = useState<
    SupplyCategoryProps[]
  >([]);

  const [allMeasurementUnits, setAllMeasurementUnits] = useState<
    MeasurementUnitProps[]
  >([]);

  const [name, setName] = useState(unit ? unit.name : "");
  const [isNameFilled, setIsNameFilled] = useState(true);
  const [measuredBy, setMeasuredBy] = useState<string>(
    unit ? unit.measuredBy : ""
  );
  const [description, setDescription] = useState<string>(
    unit ? unit.description : ""
  );
  const [category, setCategory] = useState<string>(
    unit === undefined
      ? route.params?.category
        ? route.params?.category
        : ""
      : unit.category
  );

  const viewRef = useRef<View | null>(null);
  const mainRef = useRef<View | null>(null);
  const [topValue, setTopValue] = useState(290);

  const onLayout = () => {
    let mainTopValue = 0;
    mainRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      mainTopValue = pageY;
    });
    viewRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      setTopValue(isNaN(pageY - mainTopValue) ? 290 : pageY - mainTopValue);
    });
  };

  const handleSave = async () => {
    setIsRequestProcessed(false);
    if (name === "") {
      setIsNameFilled(false);
    } else {
      setIsNameFilled(true);
      const result = unit
        ? await requestToUpdateConsumableUnit({
            id: unit.id,
            name,
            measured_by: measuredBy,
            category,
            description,
          })
        : await requestToAddConsumableUnit({
            name,
            measured_by: measuredBy,
            category,
            description,
          });
      if (result && typeof result !== "boolean") {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcessed(true);
  };

  const setAllData = async () => {
    setIsCategoriesRequestProcessed(false);
    const categories = await requestToGetAllConsumableCategories();
    const measurementUnits = await requestToGetAllMeasurementUnits();
    if (categories && typeof categories !== "boolean") {
      setAllConsumableCategories(
        categories.filter((category) => category.type === "C")
      );
      setCategory(categories[0] ? categories[0].name : "");
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      true;
    }
    if (measurementUnits && typeof measurementUnits !== "boolean") {
      setAllMeasurementUnits(measurementUnits);
      !unit && setMeasuredBy(measurementUnits[0]?.name);
    }
    setIsCategoriesRequestProcessed(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      setAllData();
    }, [])
  );
  if (!isCategoriesRequestProcessed) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.lodingGif}
          source={require("@assets/gif/buttonLoadingGif.gif")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main} ref={mainRef}>
          <GreenTextInputBlock
            value={name}
            onChangeText={(text) => setName(text)}
            header="Назва одиниці матеріалу"
            placeholder="Болгарка Т-1"
            valible={isNameFilled}
          />
          <View ref={viewRef} onLayout={onLayout}>
            <GreenTextInputBlock
              value={description}
              style={{ marginTop: 20 }}
              onChangeText={(text) => setDescription(text)}
              header="Опис"
            />
          </View>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: topValue + 75,
              zIndex: 3,
            }}
          >
            <GreenTextInputDropDown
              header="Категорія"
              style={{ marginTop: 30 }}
              items={allConsumableCategories}
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
              top: topValue + 160,
              zIndex: 2,
            }}
          >
            <GreenTextInputDropDown
              placeholder={measuredBy}
              header="Одиниця вимірювання"
              items={allMeasurementUnits}
              style={{ marginTop: 30 }}
              onPressToElement={(element) => setMeasuredBy(element.name)}
              onPressToLastElement={() =>
                navigation.navigate("MeasurementUnitsStackNavigator", {
                  screen: "MeasurementUnitsScreen",
                })
              }
              lastElementPermission={17}
            />
          </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  lodingGif: {
    width: "100%",
  },
  main: {
    width: 366,
    height: 430,
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
