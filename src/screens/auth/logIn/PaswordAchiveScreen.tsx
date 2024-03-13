import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import Person from "../../../class/Person";
import { useConnectionAlert } from "../../../components/ConnectionAlertProvider";
import ExceptionAlert from "../../../components/ExceptionsAlert";
import LoadingButton from "../../../components/LoadingButton";
import { phoneHeight } from "../../../components/ScreenInfo";
import ScrollViewEditing from "../../../components/ScrollViewEditing";
import TextInputBlock from "../../../components/TextInputBlock";
import {
  requestToRegisterCompany,
  requestToRegisterOwner,
  requestToSignIn,
} from "../../../services/api/AuthApiService";
import requestToPermissionsLoad from "../../../services/api/permissionsLoad";
import { saveDataAsync } from "../../../storage/Async";
import {
  COMPANY_DOMAIN_KEY,
  USER_TOKEN_KEY,
} from "../../../utils/constants/asyncStorageKeys";

type PasswordAchiveProps = {
  navigation: any;
  route: RouteProp<Record<string, { user: Person }>, string>;
};

export default function PasswordAchiveScreen({
  navigation,
  route,
}: PasswordAchiveProps) {
  const [user, setUser] = useState(route.params.user);
  const [passwordToCheck, setPasswordToCheck] = useState("");
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  //alert states
  const [globalAlertText, setGlobalAlertText] = useState([
    "Заповніть всі поля !",
  ]);
  const [isGlobalAlertVisible, setIsGlobalAlertVisible] = useState(false);
  const [isPasswordAlertVisible, setIsPasswordAlertVisible] = useState(false);
  const [isEmailAlertVisible, setIsEmailAlertVisible] = useState(false);
  const [isCheckPasswordAlertVisible, setIsCheckPasswordAlertVisible] =
    useState(false);

  const handleToSetup = async () => {
    setIsRequestProcesed(false);
    let isEverethingGood = true;
    const passwordRegex = /^(?=.*[a-zа-яґіїє])(?=.*[A-ZА-ЯҐІЇЄ])(?=.*\d){8,}/;
    const emailRegex = /^[a-zA-Z0-9.]{4,}/;

    if (user.email === "" || user.password === "" || passwordToCheck === "") {
      setGlobalAlertText(["Заповніть всі поля !"]);
      setIsGlobalAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsGlobalAlertVisible(false);
    }

    if (passwordToCheck !== user.password) {
      setIsCheckPasswordAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsCheckPasswordAlertVisible(false);
    }

    if (!passwordRegex.test(user.password)) {
      setIsPasswordAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsPasswordAlertVisible(false);
    }

    if (!emailRegex.test(user.email)) {
      setIsEmailAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsEmailAlertVisible(false);
    }

    if (isEverethingGood) {
      const resultOfCompanyRegistration = await requestToRegisterCompany({
        companyDomain: user.companyDomain,
        companyName: user.companyName,
      });

      if (resultOfCompanyRegistration) {
        saveDataAsync({ key: COMPANY_DOMAIN_KEY, data: user.companyDomain });
        await requestToPermissionsLoad();
        const resultOfOwnerRegistration = await requestToRegisterOwner({
          email: `${user.email}@${user.companyDomain}`,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          phoneNumber: user.phoneNumber,
        });

        if (resultOfOwnerRegistration) {
          const resultOfSigIn = await requestToSignIn({
            email: `${user.email}@${user.companyDomain}`,
            password: user.password,
          });
          if (resultOfSigIn) {
            await saveDataAsync({
              key: USER_TOKEN_KEY,
              data: resultOfSigIn,
            });
            await navigation.navigate("Loading");
          } else if (resultOfCompanyRegistration === null) {
            setConnectionStatus(false, "Не вдалось зберегти зміни");
          } else {
            setGlobalAlertText(["Щось пішло не так"]);
            setIsGlobalAlertVisible(true);
          }
        } else if (resultOfCompanyRegistration === null) {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        } else {
          setGlobalAlertText(["Щось пішло не так"]);
          setIsGlobalAlertVisible(true);
        }
      } else if (resultOfCompanyRegistration === null) {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      } else {
        navigation.navigate("CompanyRegistration", {
          message: ["Такого домену не існує"],
          user: user,
        });
      }
    }
    setIsRequestProcesed(true);
  };

  return (
    <ImageBackground
      source={require("@assets/images/authBackgroundImage.jpg")}
      style={styles.container}
    >
      <ScrollViewEditing viewStyle={{ height: phoneHeight }}>
        <View style={styles.registrationBlock}>
          <View style={{ marginTop: 100, height: 510, width: 300 }}>
            <TextInputBlock
              headText="Створіть свій корпоративний e-mail"
              descriptionText="Прізвище_імʼя латинню(Abc)"
              placeholder="                                   "
              afterText={"@" + user.companyDomain}
              value={user.email}
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, email: value }))
              }
              maxLength={30}
            />
            <ExceptionAlert
              textType="small"
              textInAlert={["Ввід лише латинню (Abc)!"]}
              visible={isEmailAlertVisible}
            />

            <TextInputBlock
              headText="Пароль"
              descriptionText="має містити 8 символів(1 велику букву, 1 цифру)"
              placeholder="* * * * * * * * *"
              style={{ marginTop: 2 }}
              value={user.password}
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, password: value }))
              }
              secureTextEntry={true}
            />
            <ExceptionAlert
              textType="small"
              textInAlert={["Хибний пароль"]}
              visible={isPasswordAlertVisible}
            />

            <TextInputBlock
              headText="Повторіть пароль"
              placeholder="* * * * * * * * *"
              style={{ marginTop: 2 }}
              value={passwordToCheck}
              onChangeText={setPasswordToCheck}
              secureTextEntry={true}
            />
            <ExceptionAlert
              textType="small"
              textInAlert={["Перевірте повторний пароль"]}
              visible={isCheckPasswordAlertVisible}
            />
            <LoadingButton
              isProcessed={isRequestProcesed}
              style={styles.submitButton}
              onPress={handleToSetup}
            >
              <Text style={styles.textInSubmitButton}>Зареєструвати себе</Text>
            </LoadingButton>
            <ExceptionAlert
              textType="big"
              textInAlert={globalAlertText}
              visible={isGlobalAlertVisible}
            />
          </View>
        </View>
      </ScrollViewEditing>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -100,
  },
  registrationBlock: {
    height: phoneHeight - 100,
    width: 300,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  submitButton: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 57,
    width: "100%",
    backgroundColor: "#5EC396",
    borderRadius: 10,
  },
  textInSubmitButton: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "Judson-400",
  },
});
