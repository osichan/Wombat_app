import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import WarehouseTextInput from "../../../../components/app/GreenTextInputBlock";
import ExceptionAlert from "../../../../components/ExceptionsAlert";
import LoadingButton from "../../../../components/LoadingButton";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import { requestToAddSpecialStatus } from "../../../../services/api/SpecialStatusService";

export default function AddNewWarehouseScreen({ navigation }: any) {
  const [information, setInformation] = useState("");
  const [isInformationAlertVisible, setIsInformationAlertVisible] =
    useState(false);
  const { setConnectionStatus } = useConnectionAlert();

  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const handleToCreateSpecialStatus = async () => {
    setIsRequestProcesed(false);
    if (information === "") {
      setIsInformationAlertVisible(true);
    } else {
      setIsRequestProcesed(false);
      const result = await requestToAddSpecialStatus(information);
      if (result) {
        navigation.goBack();
      } else {
        setConnectionStatus(false);
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
          <View style={{ marginTop: "auto", marginBottom: "auto" }}>
            <WarehouseTextInput
              header="Інформація про статус"
              value={information}
              onChangeText={(text) => setInformation(text)}
            />
            <ExceptionAlert
              textInAlert={["Заповніть поле"]}
              visible={isInformationAlertVisible}
              textType="big"
              style={{ width: 290, marginTop: -3 }}
            />
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.textInButton}>скасувати зміни</Text>
            </TouchableOpacity>
            <LoadingButton
              style={[styles.bottomButton, styles.saveButton]}
              onPress={() => {
                handleToCreateSpecialStatus();
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
    height: 260,
    width: 370,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: "auto",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 16,
  },
  bottomView: {
    width: 370,
    top: 300,
    position: "absolute",
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
