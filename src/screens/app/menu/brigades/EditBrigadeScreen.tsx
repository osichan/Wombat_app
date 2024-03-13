import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import { phoneHeight } from "../../../../components/ScreenInfo";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import GreenTextInputBlock from "../../../../components/app/GreenTextInputBlock";
import GreenTextInputDropDown from "../../../../components/app/GreenTextInputDropDown";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import {
  requestToAddBrigade,
  requestToUpdateBrigade,
} from "../../../../services/api/BrigadeApiService";
import { requestToGetAllStaffPersons } from "../../../../services/api/PersonApiService";
import { BrigadeProps, PersonProps } from "../../../../types/Types";

type EditBrigadeScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { brigade?: BrigadeProps }>, string>;
};

type foremanProps = {
  id: number;
  fullName: string;
};

const EditBrigadeScreen = ({ navigation, route }: EditBrigadeScreenProps) => {
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  const [allPersons, setAllPersons] = useState<PersonProps[] | null>(null);

  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const [name, setName] = useState<string>(
    route.params?.brigade ? route.params.brigade.name : ""
  );
  const [isNameFilled, setIsNameFilled] = useState<boolean>(true);

  const [description, setDescription] = useState<string>(
    route.params?.brigade ? route.params.brigade.description : ""
  );

  const [foreman, setForeman] = useState<foremanProps | null>(
    allPersons !== null && allPersons[0]
      ? {
          id: allPersons[0].id,
          fullName: `${allPersons[0].firstName} ${allPersons[0].lastName}`,
        }
      : null
  );
  const [isForemanValible, setIsForemanValible] = useState<boolean>(true);

  const [staff, setStaff] = useState(
    route.params?.brigade ? route.params.brigade.staff : []
  );

  const handleSave = async () => {
    setIsRequestProcesed(false);
    let isEverethingGood = true;
    if (name === "") {
      setIsNameFilled(false);
      isEverethingGood = false;
    } else {
      setIsNameFilled(true);
    }
    if (foreman === null) {
      setIsForemanValible(false);
    } else {
      setIsForemanValible(true);
    }
    if (isEverethingGood && foreman !== null) {
      if (
        route.params?.brigade
          ? await requestToUpdateBrigade({
              id: route.params.brigade.id,
              name,
              description,
              foreman: foreman.id,
            })
          : await requestToAddBrigade({
              name,
              description,
              foreman: foreman.id,
              staff: staff.map((staffPerson) => staffPerson.id),
            })
      ) {
        navigation.navigate("BrigadesScreen");
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
        true;
      }
    }
    setIsRequestProcesed(true);
  };

  useEffect(() => {
    if (route.params) {
      const foundedPerson = allPersons?.find(
        (person) => person.id === route.params?.brigade?.id
      );
      if (foundedPerson) {
        setForeman({
          id: foundedPerson.id,
          fullName: `${foundedPerson.firstName} ${foundedPerson.lastName}`,
        });
      }
    }
  }, [route.params]);
  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllStaffPersons,
        setData: setAllPersons,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollViewEditing viewStyle={{ height: phoneHeight - 200 }}>
        <View style={styles.main}>
          <GreenTextInputBlock
            value={name}
            onChangeText={(text) => setName(text)}
            header="Назва бригади"
            placeholder="№56"
            valible={isNameFilled}
            style={{ marginTop: 30 }}
          />
          <GreenTextInputBlock
            value={description}
            onChangeText={(text) => setDescription(text)}
            header="Опис"
            placeholder="бригада штукатурів, електриків"
            style={{ marginTop: 30 }}
          />

          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              marginTop: 205,
              zIndex: 3,
            }}
          >
            <GreenTextInputDropDown
              placeholder={
                foreman !== null ? foreman.fullName : "поле обовязкове"
              }
              header="Головний бригади"
              valible={isForemanValible}
              items={allPersons}
              whatToShow={["firstName", "lastName"]}
              onPressToElement={(element) =>
                setForeman({
                  id: element.id,
                  fullName: `${element.firstName} ${element.lastName}`,
                })
              }
              onPressToLastElement={() =>
                navigation.navigate("PersonStackNavigator", {
                  screen: "AddPersonNameScreen",
                })
              }
              lastElementPermission={1}
            />
          </View>

          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              marginTop: 285,
              zIndex: 2,
            }}
          >
            <GreenTextInputDropDown
              header="Склад бригади"
              items={allPersons}
              placeholder={
                staff.length !== 0 ? staff[0].fullName : "поле не обовязкове"
              }
              onPressToElement={(element) =>
                setStaff([
                  ...staff,
                  {
                    id: element.id,
                    fullName: `${element.firstName} ${element.lastName}`,
                  },
                ])
              }
              onPressSecondTime={(element) =>
                setStaff(
                  staff.filter(
                    (filterElement) => filterElement.id !== element.id
                  )
                )
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
              whatToShow={["firstName", "lastName"]}
              choosen={staff.map((staffPerson) => ({
                id: staffPerson.id,
                firstName: staffPerson.fullName.split(" ")[0],
                lastName: staffPerson.fullName.split(" ")[1],
              }))}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  main: {
    width: 366,
    height: 450,
    backgroundColor: "#313131",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  bottomView: {
    width: 370,
    marginTop: "auto",
    marginBottom: -23,
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

export default EditBrigadeScreen;
