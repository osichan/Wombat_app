import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useConnectionAlert } from "../../../components/ConnectionAlertProvider";
import ExceptionAlert from "../../../components/ExceptionsAlert";
import LoadingButton from "../../../components/LoadingButton";
import { phoneHeight } from "../../../components/ScreenInfo";
import ScrollViewEditing from "../../../components/ScrollViewEditing";
import TextInputBlock from "../../../components/TextInputBlock";
import { requestToSignIn } from "../../../services/api/AuthApiService";
import { saveDataAsync } from "../../../storage/Async";
import {
  COMPANY_DOMAIN_KEY,
  USER_TOKEN_KEY,
} from "../../../utils/constants/asyncStorageKeys";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const [textInGloblAlert, setTextInGlobalAlert] = useState([
    "Заповніть всі поля !",
  ]);
  const [isGlobalAlertVisible, setIsGlobalAlertVisible] = useState(false);
  const { setConnectionStatus } = useConnectionAlert();

  const handleToSetup = async () => {
    setIsRequestProcesed(false);
    if (email === "" || password === "") {
      setTextInGlobalAlert(["Заповніть всі поля !"]);
      setIsGlobalAlertVisible(true);
    } else {
      setIsGlobalAlertVisible(false);
      let result = await requestToSignIn({ email, password });
      if (result) {
        await saveDataAsync({ key: USER_TOKEN_KEY, data: result });
        await saveDataAsync({
          key: COMPANY_DOMAIN_KEY,
          data: email.split("@")[1],
        });

        navigation.navigate("Loading");
      } else if (result === null) {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      } else {
        setTextInGlobalAlert(["Хибний e-mail або пароль"]);
        setIsGlobalAlertVisible(true);
      }
    }
    setIsRequestProcesed(true);
  };

  return (
    <>
      <ImageBackground
        source={require("@assets/images/authBackgroundImage.jpg")}
        style={styles.container}
      >
        <ScrollViewEditing viewStyle={{ height: phoneHeight }}>
          <View style={styles.registrationBlock}>
            <View style={{ marginTop: 100, height: 400, width: 300 }}>
              <TextInputBlock
                headText="Корпоративний e-mail"
                descriptionText="Прізвище_імʼя латинню(Abc)"
                placeholder="your_email@company_name"
                value={email}
                onChangeText={setEmail}
              />
              <TextInputBlock
                headText="Пароль"
                descriptionText="має містити 8 символів(4 букви, 4 цифри)"
                placeholder="* * * * * * * * *"
                style={{ marginTop: 43 }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <LoadingButton
                isProcessed={isRequestProcesed}
                style={styles.submitButton}
                onPress={handleToSetup}
              >
                <Text style={styles.textInSubmitButtono}>Увійти в акаунт</Text>
              </LoadingButton>
              <ExceptionAlert
                textType="big"
                textInAlert={textInGloblAlert}
                visible={isGlobalAlertVisible}
              />
            </View>
          </View>
        </ScrollViewEditing>
      </ImageBackground>
    </>
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
    marginBottom: 0,
    marginTop: "auto",
    height: 57,
    width: "100%",
    backgroundColor: "#5EC396",
    borderRadius: 10,
    zIndex: 2,
  },
  textInSubmitButtono: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "Judson-400",
  },
});
