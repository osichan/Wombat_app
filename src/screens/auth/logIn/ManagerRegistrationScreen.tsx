import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RouteProp } from "@react-navigation/native";

import TextInputBlock from "../../../components/TextInputBlock";
import Person from "../../../class/Person";
import ExceptionAlert from "../../../components/ExceptionsAlert";
import ScrollViewEditing from "../../../components/ScrollViewEditing";
import { phoneHeight } from "../../../components/ScreenInfo";

type ManagerRegistrationProps = {
  navigation: any;
  route: RouteProp<Record<string, { user: Person }>, string>;
};

export default function ManagerRegistrationScreen({
  navigation,
  route,
}: ManagerRegistrationProps) {
  const [user, setUser] = useState(route.params.user);

  //alert states
  const [isGlobalAlertVisible, setIsGlobalAlertVisible] = useState(false);
  const [isPhoneAlertVisible, setIsPhoneAlertVisible] = useState(false);

  const onChangeNumber = (newNumber: string) => {
    const numericValue = newNumber.replace(/[^0-9]/g, "");
    setUser((prev) => ({ ...prev, phoneNumber: numericValue }));
  };

  const handleToSetup = () => {
    let isEverythingGood = true;

    if (
      user.lastName === "" ||
      user.firstName === "" ||
      user.phoneNumber === ""
    ) {
      setIsGlobalAlertVisible(true);
      isEverythingGood = false;
    } else {
      setIsGlobalAlertVisible(false);
    }

    if (user.phoneNumber.length !== 9) {
      setIsPhoneAlertVisible(true);
      isEverythingGood = false;
    } else {
      setIsPhoneAlertVisible(false);
    }

    if (isEverythingGood) {
      navigation.navigate("PasswordAchive", { user: user });
    }
  };

  return (
    <ImageBackground
      source={require("@assets/images/authBackgroundImage.jpg")}
      style={styles.container}
    >
      <ScrollViewEditing viewStyle={{ height: phoneHeight }}>
        <View style={styles.registrationBlock}>
          <View style={{ marginTop: 100, height: 480, width: 300 }}>
            <TextInputBlock
              headText="Прізвище"
              placeholder="Пантелеймон"
              value={user.lastName}
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, lastName: value }))
              }
            />

            <TextInputBlock
              headText="Імʼя"
              placeholder="Куліш"
              style={{ marginTop: 56 }}
              value={user.firstName}
              onChangeText={(value) =>
                setUser((prev) => ({ ...prev, firstName: value }))
              }
            />

            <TextInputBlock
              headText="Номер телефону"
              placeholder=""
              beforeText="+380  "
              keyboardType="phone-pad"
              maxLength={9}
              style={{ marginTop: 56 }}
              value={user.phoneNumber}
              onChangeText={(value) => onChangeNumber(value)}
            />
            <ExceptionAlert
              textType="small"
              textInAlert={["введено неправильний номер"]}
              visible={isPhoneAlertVisible}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleToSetup}
            >
              <Text style={styles.textInSubmitButton}>
                Продовжити реєстрацію
              </Text>
            </TouchableOpacity>
            <ExceptionAlert
              textType="big"
              textInAlert={["Заповніть всі поля !"]}
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
  },
  textInSubmitButton: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "Judson-400",
  },
});
