import { RouteProp, useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useConnectionAlert } from "../../../components/ConnectionAlertProvider";
import ExceptionAlert from "../../../components/ExceptionsAlert";
import LoadingButton from "../../../components/LoadingButton";
import WarehouseTextInput from "../../../components/app/GreenTextInputBlock";
import { requestToUpdateWarehouse } from "../../../services/api/WarehouseApiService";
import { WarehouseProps } from "../../../types/Types";

type EditWarehouseScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { warehouse: WarehouseProps }>, string>;
};

export default function EditWarehouseScreen({
  navigation,
  route,
}: EditWarehouseScreenProps) {
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const [isNameALertVisible, setIsNameALertVisible] = useState(false);
  const [isAddressALertVisible, setIsAddressALertVisible] = useState(false);

  const handleSave = async () => {
    let everythingGood = true;
    if (newName === "") {
      setIsNameALertVisible(true);
      everythingGood = false;
    } else {
      setIsNameALertVisible(false);
    }
    if (newAddress === "") {
      setIsAddressALertVisible(true);
      everythingGood = false;
    } else {
      setIsAddressALertVisible(false);
    }
    if (everythingGood) {
      setIsRequestProcesed(false);
      route.params.warehouse.name = newName;
      route.params.warehouse.address = newAddress;
      route.params.warehouse.description = newDescription;
      const result = await requestToUpdateWarehouse(route.params.warehouse);

      if (result) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
      setIsRequestProcesed(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setNewName(route.params.warehouse.name);
      setNewAddress(route.params.warehouse.address);
      setNewDescription(route.params.warehouse.description);
    }, [])
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        style={styles.mainView}
      >
        <WarehouseTextInput
          value={newName}
          onChangeText={(text) => {
            setNewName(text);
          }}
          header="Назва складу"
        />
        <ExceptionAlert
          textInAlert={["Заповніть поле"]}
          visible={isNameALertVisible}
          textType="small"
          style={{ marginTop: -3 }}
        />
        <WarehouseTextInput
          value={newAddress}
          onChangeText={(text) => {
            setNewAddress(text);
          }}
          header="Адрес"
          style={{ marginTop: 10 }}
        />
        <ExceptionAlert
          textInAlert={["Заповніть поле"]}
          visible={isAddressALertVisible}
          textType="small"
          style={{ marginTop: -3 }}
        />
        <WarehouseTextInput
          value={newDescription}
          onChangeText={(text) => {
            setNewDescription(text);
          }}
          header="Опис"
          style={{ marginTop: 10 }}
        />
      </LinearGradient>
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
          onPress={() => handleSave()}
          isProcessed={isRequestProcesed}
        >
          <Text style={styles.textInButton}>зберегти</Text>
        </LoadingButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313131",
  },
  mainView: {
    backgroundColor: "#313131",
    width: 360,
    height: 390,
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  bottomView: {
    width: 370,
    marginTop: 35,
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
  textName: {
    color: "#5EC396",
    fontSize: 28,
    fontWeight: "600",
  },
  textAddress: {
    marginTop: 46,
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
});
