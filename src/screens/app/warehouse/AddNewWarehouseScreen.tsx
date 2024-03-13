import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import WarehouseTextInput from "../../../components/app/GreenTextInputBlock";
import { requestToAddWarehouse } from "../../../services/api/WarehouseApiService";
import ExceptionAlert from "../../../components/ExceptionsAlert";
import LoadingButton from "../../../components/LoadingButton";
import { useDispatch } from "react-redux";
import { useConnectionAlert } from "../../../components/ConnectionAlertProvider";
import ScrollViewEditing from "../../../components/ScrollViewEditing";

export default function AddNewWarehouseScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [isNameAlertVisible, setIsNameAlertVisible] = useState(false);
  const [isAddressAlertVisible, setIsAddressAlertVisible] = useState(false);
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const dispatch = useDispatch();

  const handleToCreateWarehouse = async () => {
    let everythingGood = true;
    if (name === "") {
      setIsNameAlertVisible(true);
      everythingGood = false;
    } else {
      setIsNameAlertVisible(false);
    }

    if (address === "") {
      setIsAddressAlertVisible(true);
      everythingGood = false;
    } else {
      setIsAddressAlertVisible(false);
    }
    setIsRequestProcesed(false);

    if (everythingGood) {
      const result = await requestToAddWarehouse({
        name,
        address,
        description,
      });
      if (result) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcesed(true);
  };
  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <LinearGradient
          style={styles.mainView}
          colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.95, y: 1 }}
        >
          <Text style={styles.headerText}>* - обовʼязкове поле</Text>

          <WarehouseTextInput
            header={"Назва складу *"}
            value={name}
            style={{ marginTop: 40 }}
            onChangeText={(text) => setName(text)}
          />
          <ExceptionAlert
            textInAlert={["Заповніть поле"]}
            visible={isNameAlertVisible}
            textType="big"
            style={{ width: 290, alignSelf: "center", marginTop: -3 }}
          />
          <WarehouseTextInput
            header="Адреса *"
            style={{ marginTop: 14 }}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <ExceptionAlert
            textInAlert={["Заповніть поле"]}
            visible={isAddressAlertVisible}
            textType="big"
            style={{ width: 290, alignSelf: "center", marginTop: -3 }}
          />
          <WarehouseTextInput
            header="Опис"
            style={{ marginTop: 14 }}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                navigation.navigate("WarehouseScreen");
              }}
            >
              <Text style={styles.textInButton}>скасувати зміни</Text>
            </TouchableOpacity>
            <LoadingButton
              style={[styles.bottomButton, styles.saveButton]}
              onPress={() => {
                handleToCreateWarehouse();
              }}
              isProcessed={isRequestProcesed}
            >
              <Text style={styles.textInButton}>зберегти</Text>
            </LoadingButton>
          </View>
        </LinearGradient>
      </ScrollViewEditing>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  mainView: {
    height: 460,
    width: 370,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: "auto",
    alignSelf: "center",
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 16,
  },
  bottomView: {
    width: 370,
    marginTop: "auto",
    marginBottom: -100,
    flexDirection: "row",
  },
  bottomButton: {
    width: 165,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(78, 78, 78, 0.7)",
  },
  saveButton: {
    marginRight: 0,
    marginLeft: "auto",
    backgroundColor: "#5EC396",
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  specialStatusView: {
    flexDirection: "row",
    marginLeft: 42,
    marginTop: 24,
    zIndex: 2,
  },
  textInSpecialStatusView: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  specialStatusCheckBox: {
    height: 20,
    width: 20,
    borderColor: "#fff",
    borderWidth: 2.2,
    borderRadius: 3,
  },
  questionMarkButton: {
    marginLeft: 10,
  },
  questionMark: {
    width: 16,
    height: 16,
  },
});
