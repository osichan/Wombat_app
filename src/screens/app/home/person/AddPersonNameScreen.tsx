import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import Person from "../../../../class/Person";
import TextInputBlock from "../../../../components/TextInputBlock";
import ExceptionAlert from "../../../../components/ExceptionsAlert";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";

export default function AddPersonNameScreen({ navigation }: any) {
  const [person, setPerson] = useState(new Person());
  const [isGlobalAlertVisible, setIsGlobalAlertVisible] = useState(false);

  const handleToSetup = () => {
    let isEverythingGood = true;

    if (person.lastName === "" || person.firstName === "") {
      setIsGlobalAlertVisible(true);
      isEverythingGood = false;
    } else {
      setIsGlobalAlertVisible(false);
      navigation.navigate("AddPersonRoleScreen", { person: person });
    }
  };

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
            headText="Прізвище"
            placeholder="Пантелеймон"
            value={person.lastName}
            onChangeText={(value) =>
              setPerson((prev) => ({ ...prev, lastName: value }))
            }
          />

          <TextInputBlock
            headText="Імʼя"
            placeholder="Куліш"
            style={{ marginTop: 56 }}
            value={person.firstName}
            onChangeText={(value) =>
              setPerson((prev) => ({ ...prev, firstName: value }))
            }
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleToSetup}>
            <Text style={styles.textInSubmitButton}>Продовжити реєстрацію</Text>
          </TouchableOpacity>
          <ExceptionAlert
            textType="big"
            textInAlert={["Заповніть всі поля !"]}
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
  },
  main: {
    width: 270,
    height: 355,
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
  textInSubmitButton: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 20,
    fontFamily: "Judson-400",
  },
});
