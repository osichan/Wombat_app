import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import {
  selectUserInfo,
  setUserInfo,
} from "../../../../redux/reducers/userInfoReducer";
import { requestToUpdatePerson } from "../../../../services/api/PersonApiService";

const ProfilePhoneChangeScreen = ({ navigation }: any) => {
  const profileData = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [isPhoneAlertVisible, setIsPhoneAlertVisible] = useState(false);

  const onChangeNumber = (newNumber: string) => {
    const numericValue = newNumber.replace(/[^0-9]/g, "");
    setNewPhoneNumber(numericValue);
  };

  const handleChangePhoneNumber = async () => {
    setIsRequestProcesed(false);
    if (newPhoneNumber.length !== 9) {
      setIsPhoneAlertVisible(true);
    } else {
      setIsPhoneAlertVisible(false);
      if (
        await requestToUpdatePerson({
          id: profileData.id,
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          role: profileData.role,
          phoneNumber: newPhoneNumber,
          isLoaned: profileData.isLoaned,
        })
      ) {
        dispatch(
          setUserInfo({ ...profileData, phoneNumber: `+380${newPhoneNumber}` })
        );
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcesed(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.nameText}>
          {profileData.firstName} {profileData.lastName}
        </Text>
        <Text style={styles.roleText}>{profileData.role}</Text>
        <View style={{ marginTop: 15, flexDirection: "row" }}>
          <Text style={styles.emailPhoneText}>E-mail:</Text>
          <Text style={styles.emailPhoneDataText}> {profileData.email}</Text>
        </View>
        <View style={{ marginTop: 8, flexDirection: "row" }}>
          <Text style={styles.emailPhoneText}>Номер: +380 </Text>
          <TextInput
            style={[
              styles.phoneTextInput,
              isPhoneAlertVisible && { borderColor: "red" },
            ]}
            value={newPhoneNumber}
            keyboardType="phone-pad"
            maxLength={9}
            onChangeText={(text) => onChangeNumber(text)}
          />
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.phoneChangeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textInButtons}>скасувати</Text>
          </TouchableOpacity>
          <LoadingButton
            isProcessed={isRequestProcesed}
            style={styles.passwordChangeButton}
            onPress={() => handleChangePhoneNumber()}
          >
            <Text style={styles.textInButtons}>зберегти</Text>
          </LoadingButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  main: {
    height: 215,
    width: 370,
    backgroundColor: "#FFFFFF17",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  buttonsView: {
    height: 60,
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 0,
  },
  phoneChangeButton: {
    flex: 1,
    width: 185,
    backgroundColor: "#6D6B6B",
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordChangeButton: {
    flex: 1,
    width: 185,
    backgroundColor: "#5EC396",
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInButtons: {
    color: "#fff",
    fontSize: 20,
  },
  nameText: {
    fontSize: 22,
    color: "#fff",
    alignSelf: "center",
    marginTop: 20,
  },
  roleText: {
    fontSize: 15,
    color: "#5EC396",
    alignSelf: "center",
    marginTop: 3,
  },
  emailPhoneText: {
    marginLeft: 18,
    color: "#FFFFFF99",
  },
  emailPhoneDataText: {
    color: "#FFFFFF",
  },
  phoneTextInput: {
    height: 17,
    width: 150,
    color: "#fff",
    borderBottomWidth: 2,
    borderColor: "#fff",
  },
});

export default ProfilePhoneChangeScreen;
