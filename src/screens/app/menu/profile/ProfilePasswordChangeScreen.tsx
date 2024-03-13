import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../redux/reducers/userInfoReducer";
import { requestToSignIn } from "../../../../services/api/AuthApiService";
import LoadingButton from "../../../../components/LoadingButton";
import { requestToChangeOwnPassword } from "../../../../services/api/ProfileApiSrvice";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";

const ProfilePasswordChangeScreen = ({ navigation }: any) => {
  const profileData = useSelector(selectUserInfo);
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [isCurrentPasswordRight, setIsCurrentPasswordRight] =
    useState<boolean>(true);

  const [newPassword, setNewPassword] = useState<string>("");
  const [isNewPasswordRegexRight, setIsNewPasswordRegexRight] =
    useState<boolean>(true);

  const [newPasswordCheck, setNewPasswordCheck] = useState<string>("");
  const [isNewPasswordCheckRight, setIsNewPasswordCheckRight] =
    useState<boolean>(true);

  const passwordRegex = /^(?=.*[a-zа-яґіїє])(?=.*[A-ZА-ЯҐІЇЄ])(?=.*\d){8,}/;

  const handleToChangePassword = async () => {
    setIsRequestProcesed(false);
    const currentPasswordCheckResult = await requestToSignIn({
      email: profileData.email,
      password: currentPassword,
    });
    let isEverethingGood = true;
    if (currentPasswordCheckResult) {
      setIsCurrentPasswordRight(true);
    } else if (currentPasswordCheckResult === false) {
      setIsCurrentPasswordRight(false);
      isEverethingGood = false;
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      true;
      isEverethingGood = false;
    }

    if (passwordRegex.test(newPassword)) {
      setIsNewPasswordRegexRight(true);
    } else {
      setIsNewPasswordRegexRight(false);
      isEverethingGood = false;
    }

    if (newPassword === newPasswordCheck) {
      setIsNewPasswordCheckRight(true);
    } else {
      setIsNewPasswordCheckRight(false);
      isEverethingGood = false;
    }

    if (isEverethingGood) {
      const result = await requestToChangeOwnPassword({
        id: profileData.id,
        current_password: currentPassword,
        new_password: newPassword,
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
      <View style={styles.main}>
        <TextInput
          style={[
            styles.textInput,
            !isCurrentPasswordRight && { color: "red" },
          ]}
          placeholder="Введіть ваш пароль"
          placeholderTextColor={!isCurrentPasswordRight ? "red" : "black"}
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
          keyboardType="visible-password"
        />
        <Text style={styles.passwordHeaderText}>
          Пароль має містити 8 символів(4 букви, 4 цифри)
        </Text>
        <TextInput
          style={[
            styles.textInput,
            !isNewPasswordRegexRight && { color: "red" },
            { marginTop: 0 },
          ]}
          placeholder="Введіть новий пароль"
          placeholderTextColor={!isNewPasswordRegexRight ? "red" : "black"}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry={true}
        />
        <TextInput
          style={[
            styles.textInput,
            !isNewPasswordCheckRight && { color: "red" },
          ]}
          placeholder="Повторіть новий пароль"
          placeholderTextColor={!isNewPasswordCheckRight ? "red" : "black"}
          value={newPasswordCheck}
          onChangeText={(text) => setNewPasswordCheck(text)}
          secureTextEntry={true}
        />

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
            onPress={() => handleToChangePassword()}
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
    height: 305,
    width: 370,
    backgroundColor: "#FFFFFF17",
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 6,
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
  textInput: {
    width: 304,
    height: 44,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    marginTop: 24,
    paddingHorizontal: 12,
  },
  passwordHeaderText: {
    color: "#fff",
    marginTop: 18,
  },
});

export default ProfilePasswordChangeScreen;
