import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import GreenTextInputBlock from "../../../../components/app/GreenTextInputBlock";
import GreenTextInputDropDown from "../../../../components/app/GreenTextInputDropDown";
import AddConsumableTypeChoose from "../../../../components/app/home/supply/consumables/AddConsumableTypeChoose";
import { requestToGetAllConsumableUnits } from "../../../../services/api/ConsumableUnitApiService";
import { requestToAddConsumable } from "../../../../services/api/ConsumablesApiService";
import { requestToGetAllStaffPersons } from "../../../../services/api/PersonApiService";
import { requestToGetAllActiveUnActiveProjects } from "../../../../services/api/ProjectService";
import { requestToGetAllStatuses } from "../../../../services/api/SpecialStatusService";
import { requestToGetAllWareHouses } from "../../../../services/api/WarehouseApiService";
import {
  ConsumableProps,
  ConsumableUnitProps,
  PersonProps,
  ProjectProps,
  SpecialStatusProps,
  WarehouseProps,
} from "../../../../types/Types";

type AddToCreatedConsumableProps = {
  consumable?: ConsumableProps;
  unit?: string;
  warehouse?: string;
  specialStatus?: string;
  project?: number;
  owner?: number;
};

type AddConsumableScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, AddToCreatedConsumableProps>, string>;
};

const AddConsumableScreen = ({
  navigation,
  route: { params },
}: AddConsumableScreenProps) => {
  const [isRequestProcesed, setIsRequestProcesed] = useState<boolean>(true);
  const [isDataRequestProcesed, setIsDataRequestProcesed] =
    useState<boolean>(true);
  const { setConnectionStatus } = useConnectionAlert();

  const [allUnits, setAllUnits] = useState<ConsumableUnitProps[]>([]);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseProps[]>([]);
  const [allProjects, setAllProjects] = useState<ProjectProps[]>([]);
  const [allPersons, setAllPersons] = useState<PersonProps[]>([]);
  const [allSpecialStatuses, setAllSpecialStatuses] = useState<
    SpecialStatusProps[]
  >([]);

  const [choosenUnit, setChoosenUnit] = useState<ConsumableUnitProps | null>(
    null
  );
  const [choosenWarehouse, setChoosenWarehouse] =
    useState<WarehouseProps | null>(null);
  const [choosenProject, setChoosenProject] = useState<ProjectProps | null>(
    null
  );
  const [choosenPerson, setChoosenPerson] = useState<PersonProps | null>(null);
  const [choosenSpecialStatus, setChoosenSpecialStatus] =
    useState<SpecialStatusProps | null>(null);

  const [isUnitValid, setIsUnitValid] = useState<boolean>(true);
  const [isWarehouseValid, setIsWarehouseValid] = useState<boolean>(true);
  const [isProjectValid, setIsProjectValid] = useState<boolean>(true);
  const [isPersonValid, setIsPersonValid] = useState<boolean>(true);
  const [isSpecialStatusValid, setIsSpecialStatusValid] =
    useState<boolean>(true);

  const [choosenType, setChoosenType] = useState<"WH" | "SS" | "OP">("WH");

  const [quantityToAdd, setQuantityToAdd] = useState<string>("");

  const onSetup = async () => {
    setIsRequestProcesed(false);

    setIsUnitValid(true);
    setIsProjectValid(true);
    setIsUnitValid(true);
    setIsPersonValid(true);
    setIsSpecialStatusValid(true);

    if (params.consumable) {
      if (params.consumable.currentlyAt.type === "WH") {
        if (
          await requestToAddConsumable({
            consumable: params.consumable.id,
            unit_quantity: parseFloat(quantityToAdd),
            warehouse: params.consumable.currentlyAt.data,
          })
        ) {
          navigation.goBack();
          return;
        } else {
          setConnectionStatus(false, "Не вдалося додати матеріал");
        }
      } else if (params.consumable.currentlyAt.type === "OP") {
        if (
          await requestToAddConsumable({
            consumable: params.consumable.id,
            unit_quantity: parseFloat(quantityToAdd),
            project: params.consumable.currentlyAt.data.owner.id,
            owner: params.consumable.currentlyAt.data.project.id,
          })
        ) {
          navigation.goBack();
          return;
        } else {
          setConnectionStatus(false, "Не вдалося додати матеріал");
        }
      } else {
        if (
          await requestToAddConsumable({
            consumable: params.consumable.id,
            unit_quantity: parseFloat(quantityToAdd),
            special_status: params.consumable.currentlyAt.data,
          })
        ) {
          navigation.goBack();
          return;
        } else {
          setConnectionStatus(false, "Не вдалося додати матеріал");
        }
      }
      return;
    }

    if (choosenUnit === null) {
      setIsUnitValid(false);
      setIsRequestProcesed(true);
      return;
    }

    if (choosenType === "WH") {
      if (choosenWarehouse === null) {
        setIsWarehouseValid(false);
      } else {
        if (
          await requestToAddConsumable({
            consumable: choosenUnit.id,
            unit_quantity: parseFloat(quantityToAdd),
            warehouse: choosenWarehouse.name,
          })
        ) {
          navigation.goBack();
          return;
        } else {
          setConnectionStatus(false, "Не вдалося додати матеріал");
        }
      }
    } else if (choosenType === "OP") {
      if (choosenProject === null) {
        setIsProjectValid(false);
        setIsRequestProcesed(true);
        return;
      }
      if (choosenPerson === null) {
        setIsPersonValid(false);
        setIsRequestProcesed(true);
        return;
      }
      if (
        await requestToAddConsumable({
          consumable: choosenUnit.id,
          unit_quantity: parseFloat(quantityToAdd),
          project: choosenProject.id,
          owner: choosenPerson.id,
        })
      ) {
        navigation.goBack();
        return;
      } else {
        setConnectionStatus(false, "Не вдалося додати матеріал");
      }
    } else {
      if (choosenSpecialStatus === null) {
        setIsSpecialStatusValid(false);
        setIsRequestProcesed(true);
        return;
      }
      if (
        await requestToAddConsumable({
          consumable: choosenUnit.id,
          unit_quantity: parseFloat(quantityToAdd),
          special_status: choosenSpecialStatus.information,
        })
      ) {
        navigation.goBack();
        return;
      } else {
        setConnectionStatus(false, "Не вдалося додати матеріал");
      }
    }
    setIsRequestProcesed(true);
  };

  const onChangeQuantity = (newNumber: string) => {
    setQuantityToAdd(newNumber.replace(/[^0-9.]/g, ""));
  };

  const getData = async () => {
    setIsDataRequestProcesed(false);
    const unitsResult = await requestToGetAllConsumableUnits();
    const warehouseResult = await requestToGetAllWareHouses();
    const projectResult = await requestToGetAllActiveUnActiveProjects(true);
    const personResult = await requestToGetAllStaffPersons();
    const specialStatusResult = await requestToGetAllStatuses();

    if (
      unitsResult === null ||
      typeof unitsResult === "boolean" ||
      warehouseResult === null ||
      typeof warehouseResult === "boolean" ||
      projectResult === null ||
      typeof projectResult === "boolean" ||
      personResult === null ||
      typeof personResult === "boolean" ||
      specialStatusResult === null ||
      typeof specialStatusResult === "boolean"
    ) {
      setConnectionStatus(false, "Не вдалося отримати інформацію");
    } else {
      setAllUnits(unitsResult);
      setAllWarehouses(warehouseResult);
      setAllProjects(projectResult);
      setAllPersons(personResult);
      setAllSpecialStatuses(specialStatusResult);

      if (params?.consumable) {
        const currentlyAt = params?.consumable.currentlyAt;

        if (currentlyAt.type === "OP") {
          const project = allProjects.find(
            (element) => element.id === currentlyAt.data.project.id
          );
          setChoosenProject(project ? project : null);

          const person = allPersons.find(
            (element) => element.id === currentlyAt.data.owner.id
          );
          setChoosenPerson(person ? person : null);
        } else if (currentlyAt.type === "SS") {
          const specialStatus = allSpecialStatuses.find(
            (element) => element.information === currentlyAt.data
          );
          setChoosenSpecialStatus(specialStatus ? specialStatus : null);
        } else {
          const warehouse = allWarehouses.find(
            (element) => element.name === currentlyAt.data
          );
          setChoosenWarehouse(warehouse ? warehouse : null);
        }

        const unit = allUnits.find(
          (element) => element.name === params.consumable?.name
        );
        setChoosenUnit(unit ? unit : null);
        return;
      }

      if (params?.owner) {
        const person = allPersons.find(
          (element) => element.id === params.owner
        );
        setChoosenPerson(person ? person : null);
      }

      if (params?.project) {
        const project = allProjects.find(
          (element) => element.id === params.project
        );
        setChoosenProject(project ? project : null);
      }

      if (params?.specialStatus) {
        const specialStatus = allSpecialStatuses.find(
          (element) => element.information === params.specialStatus
        );
        setChoosenSpecialStatus(specialStatus ? specialStatus : null);
      }

      if (params?.unit) {
        const unit = allUnits.find((element) => element.name === params.unit);
        setChoosenUnit(unit ? unit : null);
      }

      if (params?.warehouse) {
        const warehouse = allWarehouses.find(
          (element) => element.name === params.warehouse
        );
        setChoosenWarehouse(warehouse ? warehouse : null);
      }
    }

    setIsDataRequestProcesed(true);
  };
  useFocusEffect(
    useCallback(() => {
      getData();
      setIsRequestProcesed(true);
    }, [])
  );
  if (!isDataRequestProcesed) {
    <Image
      source={require("@assets/gif/buttonLoadingGif.gif")}
      style={{ width: "100%" }}
    />;
  }
  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main}>
          {!(params?.consumable || params?.unit) && (
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                top: 40,
                zIndex: 3,
              }}
            >
              <GreenTextInputDropDown
                header="Назва одиниці матеріалу"
                items={allUnits}
                placeholder={choosenUnit ? choosenUnit.name : "поле обовязкове"}
                onPressToElement={(element: ConsumableUnitProps) =>
                  setChoosenUnit(element)
                }
                onPressToLastElement={() =>
                  navigation.navigate("MenuStack", {
                    screen: "SupplyCategoriyStack",
                    params: {
                      screen: "EditConsumableUnitScreen",
                    },
                  })
                }
                lastElementPermission={19}
                valible={isUnitValid}
              />
            </View>
          )}

          <GreenTextInputBlock
            value={quantityToAdd}
            onChangeText={(text) => onChangeQuantity(text)}
            header="Кількість"
            style={{ marginTop: 120 }}
            keyboardType="numeric"
          />

          {!(
            params?.consumable ||
            params?.warehouse ||
            params?.project ||
            params?.specialStatus
          ) && (
            <>
              <AddConsumableTypeChoose
                choosenType={choosenType}
                setChoosenType={setChoosenType}
              />
              {choosenType === "WH" ? (
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: 260,
                    zIndex: 4,
                  }}
                >
                  <GreenTextInputDropDown
                    header="На який склад"
                    items={allWarehouses}
                    placeholder={
                      choosenWarehouse
                        ? choosenWarehouse.name
                        : "поле обовязкове"
                    }
                    onPressToElement={(element: WarehouseProps) =>
                      setChoosenWarehouse(element)
                    }
                    onPressToLastElement={() =>
                      navigation.navigate("WarehouseStack", {
                        screen: "AddNewWarehouseScreen",
                      })
                    }
                    lastElementPermission={13}
                    valible={isWarehouseValid}
                  />
                </View>
              ) : choosenType === "OP" ? (
                <>
                  <View
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      top: 260,
                      zIndex: 4,
                    }}
                  >
                    <GreenTextInputDropDown
                      header="На який обʼєкт"
                      items={allProjects}
                      placeholder={
                        choosenProject ? choosenProject.name : "поле обовязкове"
                      }
                      onPressToElement={(element: ProjectProps) =>
                        setChoosenProject(element)
                      }
                      onPressToLastElement={() =>
                        navigation.navigate("ProjectStack", {
                          screen: "AddProjectScreen",
                        })
                      }
                      lastElementPermission={9}
                      valible={isProjectValid}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      top: 350,
                      zIndex: 3,
                    }}
                  >
                    <GreenTextInputDropDown
                      header="На кого"
                      items={allPersons}
                      placeholder={
                        choosenPerson
                          ? `${choosenPerson.lastName} ${choosenPerson.firstName}`
                          : "поле обовязкове"
                      }
                      onPressToElement={(element: PersonProps) =>
                        setChoosenPerson(element)
                      }
                      onPressToLastElement={() =>
                        navigation.navigate("HomeStack", {
                          screen: "PersonStackNavigator",
                          params: {
                            screen: "AddPersonNameScreen",
                          },
                        })
                      }
                      lastElementPermission={1}
                      valible={isPersonValid}
                      whatToShow={["firstName", "lastName"]}
                    />
                  </View>
                </>
              ) : (
                <View
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: 260,
                    zIndex: 4,
                  }}
                >
                  <GreenTextInputDropDown
                    header="На який особливий статус"
                    items={allSpecialStatuses}
                    placeholder={
                      choosenSpecialStatus
                        ? choosenSpecialStatus.information
                        : "поле обовязкове"
                    }
                    onPressToElement={(element: SpecialStatusProps) =>
                      setChoosenSpecialStatus(element)
                    }
                    onPressToLastElement={() =>
                      navigation.navigate("MenuStack", {
                        screen: "SpecialStatusStackNavigator",
                        params: {
                          screen: "AddSpecialStatusScreen",
                        },
                      })
                    }
                    lastElementPermission={15}
                    valible={isSpecialStatusValid}
                    whatToShow={["information"]}
                  />
                </View>
              )}
            </>
          )}

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.cancleButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textInButton}>Скасувати зміни</Text>
            </TouchableOpacity>
            <LoadingButton
              style={styles.addButton}
              isProcessed={isRequestProcesed}
              onPress={async () => await onSetup()}
            >
              <Text style={styles.textInButton}>Додати</Text>
            </LoadingButton>
          </View>
        </View>
      </ScrollViewEditing>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  main: {
    width: 370,
    height: 511,
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  buttonView: {
    marginTop: "auto",
    marginBottom: -20,
    width: "120%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cancleButton: {
    backgroundColor: "#5A5A5A",
    width: "40%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#5EC396",
    width: "40%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AddConsumableScreen;
