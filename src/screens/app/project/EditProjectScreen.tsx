import { RouteProp, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../components/LoadingButton";
import ScrollViewEditing from "../../../components/ScrollViewEditing";
import GreenTextInputBlock from "../../../components/app/GreenTextInputBlock";
import GreenTextInputDropDown from "../../../components/app/GreenTextInputDropDown";
import focusEffectToGetData from "../../../components/focusEffectToGetData";
import {
  requestToGetAllStaffPersons,
  requestToGetAllСustomerPersons,
} from "../../../services/api/PersonApiService";
import { requestToUpdateProject } from "../../../services/api/ProjectService";
import { PersonProps, ProjectProps } from "../../../types/Types";

type EditProjectScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { project: ProjectProps }>, string>;
};

const EditProjectScreen = ({ navigation, route }: EditProjectScreenProps) => {
  const [allStaff, setAllStaff] = useState<PersonProps[] | null>(null);
  const [allСustomers, setAllСustomers] = useState<PersonProps[] | null>(null);

  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);
  const { setConnectionStatus } = useConnectionAlert();
  const project = route.params.project;

  const [name, setName] = useState<string>(project ? project.name : "");
  const [isNameFilled, setIsNameFilled] = useState<boolean>(true);
  const [address, setAddress] = useState<string>(
    project ? project.address : ""
  );
  const [isAdressFilled, setIsAdressFilled] = useState<boolean>(true);

  const [client, setClient] = useState<{
    id: number;
    firstName: string;
    lastName: string;
  } | null>(
    project?.client
      ? {
          id: project.client.id,
          firstName: project.client.fullName.split(" ")[0],
          lastName: project.client.fullName.split(" ")[1],
        }
      : null
  );

  const [manager, setManager] = useState<{
    id: number;
    firstName: string;
    lastName: string;
  } | null>(
    project && {
      id: project.manager.id,
      firstName: project.manager.fullName.split(" ")[0],
      lastName: project.manager.fullName.split(" ")[1],
    }
  );
  const [isManagerValible, setIsManagerValible] = useState<boolean>(true);

  const handleSave = async () => {
    let isEverythingFilled = true;
    setIsRequestProcesed(false);
    if (name === "") {
      setIsNameFilled(false);
      isEverythingFilled = false;
    } else {
      setIsNameFilled(true);
    }
    if (address === "") {
      setIsAdressFilled(false);
      isEverythingFilled = false;
    } else {
      setIsAdressFilled(true);
    }
    if (manager === null) {
      isEverythingFilled = false;
      setIsManagerValible(false);
    } else {
      setIsManagerValible(true);
    }
    if (isEverythingFilled && manager !== null) {
      const result = await requestToUpdateProject({
        ...route.params.project,
        name,
        address,
        manager: manager.id,
        client: client ? client.id : null,
      });

      if (typeof result !== "boolean" && result !== null) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcesed(true);
  };

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllСustomerPersons,
        setData: setAllСustomers,
        setIsDataRequestProcessed,
      });
      focusEffectToGetData({
        request: requestToGetAllStaffPersons,
        setData: setAllStaff,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main}>
          <GreenTextInputBlock
            value={name}
            onChangeText={(text) => setName(text)}
            header="Назва обʼєкту"
            placeholder="Пасічна"
            valible={isNameFilled}
          />
          <GreenTextInputBlock
            value={address}
            onChangeText={(text) => setAddress(text)}
            header="Адреса"
            placeholder="Пасічна 29А"
            style={{ marginTop: 30 }}
            valible={isAdressFilled}
          />
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 200,
              zIndex: 3,
            }}
          >
            <GreenTextInputDropDown
              header="Замовник"
              style={{ marginTop: 30 }}
              items={allСustomers}
              placeholder={
                client
                  ? `${client.lastName} ${client.firstName}`
                  : "поле не обовязкове"
              }
              onPressToElement={(pressedClient) => setClient(pressedClient)}
              onPressToLastElement={() =>
                navigation.navigate("HomeStack", {
                  screen: "PersonStackNavigator",
                  params: {
                    screen: "AddPersonNameScreen",
                  },
                })
              }
              lastElementPermission={1}
              whatToShow={["lastName", "firstName"]}
            />
          </View>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: 290,
              zIndex: 2,
            }}
          >
            <GreenTextInputDropDown
              header="Відповідальні за обʼєкт"
              style={{ marginTop: 30 }}
              items={allStaff}
              valible={isManagerValible}
              placeholder={
                manager !== null
                  ? `${manager.lastName} ${manager.firstName}`
                  : "обов'язкове поле"
              }
              onPressToElement={(pressedManager) => setManager(pressedManager)}
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
export default EditProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  main: {
    width: 366,
    height: 500,
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingTop: 50,
    marginTop: "auto",
    marginBottom: "auto",
    alignSelf: "center",
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
    marginTop: 275,
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
