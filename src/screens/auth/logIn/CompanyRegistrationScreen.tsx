import React, { useState } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";

import TextInputBlock from "../../../components/TextInputBlock";
import Person from "../../../class/Person";
import ExceptionAlert from "../../../components/ExceptionsAlert";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScrollViewEditing from "../../../components/ScrollViewEditing";
import { phoneHeight } from "../../../components/ScreenInfo";

type CompanyRegistrationScreenType = {
  navigation: any;
  route: RouteProp<Record<string, { message: string[]; user: Person }>, string>;
};

export default function CompanyRegistrationScreen({
  navigation,
  route,
}: CompanyRegistrationScreenType) {
  const [user, setUser] = useState(new Person());

  //alert states
  const [isDomenAlertVisible, setIsDomenAlertVisible] = useState(false);
  const [isGlobalAlertVisible, setIsGlobalAlertVisible] = useState(false);
  const [globalAlertText, setGlobalAlertText] = useState([
    "Заповніть всі поля !",
  ]);

  const handleToSetup = async () => {
    let isEverethingGood = true;
    const latinRegex = /^[a-zA-Z0-9\s.]+$/;

    if (user.companyName === "" || user.companyName === "") {
      setGlobalAlertText(["Заповніть всі поля !"]);
      setIsGlobalAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsGlobalAlertVisible(false);
    }

    if (!latinRegex.test(user.companyDomain)) {
      setIsDomenAlertVisible(true);
      isEverethingGood = false;
    } else {
      setIsDomenAlertVisible(false);
    }

    if (isEverethingGood) {
      navigation.navigate("ManagerRegistration", { user: user });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        setGlobalAlertText(route.params.message);
        setIsGlobalAlertVisible(true);
        setUser(route.params.user);
      }
    }, [])
  );

  return (
    <ImageBackground
      source={require("@assets/images/authBackgroundImage.jpg")}
      style={styles.container}
    >
      <ScrollViewEditing viewStyle={{ height: phoneHeight }}>
        <View style={styles.registrationBlock}>
          <View style={{ marginTop: 100, height: 400, width: 300 }}>
            <TextInputBlock
              value={user.companyName}
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, companyName: value }))
              }
              maxLength={30}
              headText="Назва компанії"
              placeholder="Build company"
            />

            <TextInputBlock
              value={user.companyDomain}
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, companyDomain: value }))
              }
              headText="Домен компанії"
              placeholder="company.name"
              beforeText="@"
              descriptionText="буде відображатись у ел.поштах людей"
              style={{ marginTop: 56 }}
              maxLength={30}
            />
            <ExceptionAlert
              textType="small"
              textInAlert={["ввід лише латинню(Abc)"]}
              visible={isDomenAlertVisible}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleToSetup}
            >
              <Text style={styles.textInSubmitButtono}>Перевірити дані</Text>
            </TouchableOpacity>
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
