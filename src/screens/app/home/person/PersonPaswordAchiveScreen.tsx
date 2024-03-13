import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Person from "../../../../class/Person";
import ExceptionAlert from "../../../../components/ExceptionsAlert";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import TextInputBlock from "../../../../components/TextInputBlock";
import { requestToAddPerson } from "../../../../services/api/PersonApiService";
import { getDataAsync } from "../../../../storage/Async";
import { COMPANY_DOMAIN_KEY } from "../../../../utils/constants/asyncStorageKeys";

type PersonPaswordAchiveScreeProps = {
  navigation: any;
  route: RouteProp<Record<string, { person: Person }>, string>;
};

export default function PersonPaswordAchiveScreen({
  navigation,
  route,
}: PersonPaswordAchiveScreeProps) {
  const [domain, setDomain] = useState("");

  const [person, setPerson] = useState(route.params.person);
  const [globalAlertText, setGlobalAlertText] = useState([
    "Заповніть всі поля !",
  ]);
  const [isGlobalAlertVisible, setIsGlobalAlertVisible] = useState(false);
  const [isPasswordAlertVisible, setIsPasswordAlertVisible] = useState(false);
  const [isCheckPasswordAlertVisible, setIsCheckPasswordAlertVisible] =
    useState(false);
  const [passwordToCheck, setPasswordToCheck] = useState("");
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const handleToSetup = async () => {
    setIsRequestProcesed(false);
    let isEverethingGood = true;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,}$/;

    if (
      person.email === "" ||
      person.password === "" ||
      passwordToCheck === ""
    ) {
      setGlobalAlertText(["Заповніть всі поля !"]);
      setIsGlobalAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsGlobalAlertVisible(false);
    }

    if (passwordToCheck !== person.password) {
      setIsCheckPasswordAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsCheckPasswordAlertVisible(false);
    }

    if (!passwordRegex.test(person.password)) {
      setIsPasswordAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsPasswordAlertVisible(false);
    }

    if (isEverethingGood) {
      setIsRequestProcesed(false);
      const result = await requestToAddPerson({
        ...person,
        email: `${person.email}@${domain}`,
      });
      if (typeof result !== "boolean" && result !== null) {
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
      } else {
        setGlobalAlertText(["Щось пішло не так"]);
        setIsGlobalAlertVisible(true);
      }
    }
    setIsRequestProcesed(true);
  };

  const getDomain = async () => {
    setDomain(await getDataAsync({ key: COMPANY_DOMAIN_KEY }));
  };
  getDomain();
  return (
    <ImageBackground
      source={require("@assets/images/authBackgroundImage.jpg")}
      style={styles.container}
    >
      <ScrollViewEditing>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 35,
            height: 35,
            marginLeft: 20,
            marginTop: 60,
            position: "absolute",
          }}
        >
          <Image
            source={require("@assets/images/whiteBackButtonIcon.png")}
            style={{
              width: 35,
              height: 35,
            }}
          />
        </TouchableOpacity>
        <View style={styles.main}>
          <TextInputBlock
            headText="Створіть свій корпоративний e-mail"
            descriptionText="Прізвище_імʼя латинню(Abc)"
            placeholder="                                   "
            afterText={"@" + domain}
            value={person.email}
            onChangeText={(value) =>
              setPerson((prev) => ({ ...prev, email: value }))
            }
          />
          <TextInputBlock
            headText="Пароль"
            descriptionText="має містити 8 символів(1 велику букву, 1 цифру)"
            placeholder="* * * * * * * * *"
            style={{ marginTop: 31 }}
            value={person.password}
            onChangeText={(value) =>
              setPerson((prev) => ({ ...prev, password: value }))
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
            style={styles.submitButton}
            onPress={handleToSetup}
            isProcessed={isRequestProcesed}
          >
            <Text style={styles.textInSubmitButton}>Зареєструвати</Text>
          </LoadingButton>
          <ExceptionAlert
            textType="big"
            textInAlert={globalAlertText}
            visible={isGlobalAlertVisible}
          />
        </View>
      </ScrollViewEditing>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#313131",
    flex: 1,
    justifyContent: "center",
  },
  main: {
    width: 270,
    height: 500,
    alignSelf: "center",
    marginTop: 100,
  },
  submitButton: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 50,
    height: 57,
    width: "100%",
    backgroundColor: "#5EC396",
    borderRadius: 10,
    zIndex: 2,
  },
  textInSubmitButton: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "Judson-400",
  },
  headText: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "Jost-600",
  },
  descriptionText: {
    fontFamily: "Jost-400",
    fontSize: 14,
    color: "#fff",
  },
  textInput: {
    fontFamily: "Jost-400",
    color: "#fff",
    fontSize: 18,
    alignSelf: "center",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  dropDown: {
    width: 255,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 10,
  },
  dropDownText: {
    width: 160,
    height: 25,
    flexShrink: 0,
    color: "#313131",
    fontFamily: "Judson-400",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25 * 1.3,
  },
});
