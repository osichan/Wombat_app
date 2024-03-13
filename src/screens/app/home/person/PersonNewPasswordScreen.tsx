import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import { selectUserInfo } from "../../../../redux/reducers/userInfoReducer";
import { requestToSignIn } from "../../../../services/api/AuthApiService";
import { requestToChangeOwnPassword } from "../../../../services/api/ProfileApiSrvice";
import { PersonProps } from "../../../../types/Types";

type PersonNewPasswordScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { person: PersonProps }>, string>;
};

const PersonNewPasswordScreen = ({
  navigation,
  route,
}: PersonNewPasswordScreenProps) => {
  const profileData = useSelector(selectUserInfo);
  const { setConnectionStatus } = useConnectionAlert();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [checkNewPassword, setCheckNewPassword] = useState<string>("");

  const [isCurrentPasswordValid, setIsCurrentPasswordValid] =
    useState<boolean>(true);
  const [isNewPasswordValible, setIsNewPasswordValible] =
    useState<boolean>(true);
  const [ischeckPasswordValible, setIsCheckPasswordValible] =
    useState<boolean>(true);

  const [isRequestProcessed, setIsRequestProcesed] = useState<boolean>(true);

  const handleToUpdate = async () => {
    const passwordRegex = /^(?=.*[a-zа-яґіїє])(?=.*[A-ZА-ЯҐІЇЄ])(?=.*\d){8,}/;
    setIsRequestProcesed(false);
    const currentPasswordCheckResult = await requestToSignIn({
      email: profileData.email,
      password: currentPassword,
    });
    let isEverethingGood = true;
    if (currentPasswordCheckResult) {
      setIsCurrentPasswordValid(true);
    } else if (currentPasswordCheckResult === false) {
      setIsCurrentPasswordValid(false);
      isEverethingGood = false;
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      isEverethingGood = false;
    }

    if (passwordRegex.test(newPassword)) {
      setIsNewPasswordValible(true);
    } else {
      setIsNewPasswordValible(false);
      isEverethingGood = false;
    }

    if (newPassword === checkNewPassword) {
      setIsCheckPasswordValible(true);
    } else {
      setIsCheckPasswordValible(false);
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
      <ScrollViewEditing>
        <View style={styles.main}>
          <View style={styles.inputBlock}>
            <Text style={styles.preInputText}>Ваш пароль : </Text>
            <TextInput
              value={currentPassword}
              style={[
                styles.textInput,
                !isCurrentPasswordValid && {
                  borderColor: "#CC4E4E",
                  color: "#CC4E4E",
                },
              ]}
              onChangeText={(text) => setCurrentPassword(text)}
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.preInputText}>Новий пароль : </Text>
            <TextInput
              value={newPassword}
              style={[
                styles.textInput,
                !isNewPasswordValible && {
                  borderColor: "#CC4E4E",
                  color: "#CC4E4E",
                },
              ]}
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.preInputText}>Повторіть пароль : </Text>
            <TextInput
              value={checkNewPassword}
              style={[
                styles.textInput,
                !ischeckPasswordValible && {
                  borderColor: "#CC4E4E",
                  color: "#CC4E4E",
                },
              ]}
              onChangeText={(text) => setCheckNewPassword(text)}
            />
          </View>
          <View style={styles.goToEditButton}>
            <TouchableOpacity
              style={styles.cancleButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textInBottomButtons}>скасувати</Text>
            </TouchableOpacity>
            <LoadingButton
              style={styles.updateButton}
              onPress={handleToUpdate}
              isProcessed={isRequestProcessed}
            >
              <Text style={styles.textInBottomButtons}>зберегти</Text>
            </LoadingButton>
          </View>
        </View>
      </ScrollViewEditing>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  main: {
    width: 370,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  goToEditButton: {
    height: 60,
    width: 371,
    marginBottom: -2,
    marginTop: "auto",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  changePasswordButton: {
    marginTop: "auto",
    marginBottom: 0,
    width: 140,
    alignItems: "center",
    marginLeft: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#5EC396",
    height: 40,
    justifyContent: "center",
  },
  changePasswordButtonLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#5EC396",
  },
  changePasswordButtonText: {
    fontSize: 19,
    color: "#5EC396",
    fontWeight: "600",
  },
  inputBlock: {
    marginTop: 37,
    paddingHorizontal: 35,
    flexDirection: "row",
  },
  preInputText: {
    color: "#fff",
    fontSize: 17,
    alignSelf: "center",
    marginRight: 5,
  },
  textInput: {
    color: "#fff",
    fontSize: 17,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: "white",
    flex: 1,
    height: 25,
  },
  roleSelectorView: {
    position: "absolute",
    height: 150,
    width: 256,
    right: 35,
    top: 190,
    backgroundColor: "lightgray",
    zIndex: 3,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  roleSelectorComponent: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    paddingLeft: 10,
  },
  roleComponentText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  cancleButton: { flex: 1, backgroundColor: "#494949" },
  updateButton: {
    flex: 1,
    backgroundColor: "#5EC396",
  },
  textInBottomButtons: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    color: "white",
    fontSize: 21,
  },
});

export default PersonNewPasswordScreen;
