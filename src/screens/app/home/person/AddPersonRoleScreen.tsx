import { RouteProp, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Person from "../../../../class/Person";
import ExceptionAlert from "../../../../components/ExceptionsAlert";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import TextInputBlock from "../../../../components/TextInputBlock";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import { requestToGetAllRoles } from "../../../../services/api/RoleApiService";
import { RoleProps } from "../../../../types/Types";
import { FlatList } from "react-native-gesture-handler";

type AddPersonNameScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { person: Person }>, string>;
};

export default function AddPersonRoleScreen({
  navigation,
  route,
}: AddPersonNameScreenProps) {
  const [person, setPerson] = useState(route.params.person);
  const [isGlobalAlertVisible, setIsGlobalAlertVisible] = useState(false);
  const [isPhoneAlertVisible, setIsPhoneAlertVisible] = useState(false);
  const [allRoles, setAllRoles] = useState<RoleProps[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const handleOptionSelect = (value: string) => {
    setPerson((prev) => ({ ...prev, role: value }));
    setIsOpen(!isOpen);
  };

  const onChangeNumber = (newNumber: string) => {
    const numericValue = newNumber.replace(/[^0-9]/g, "");
    setPerson((prev) => ({ ...prev, phoneNumber: numericValue }));
  };

  const handleToSetup = () => {
    let isEverythingGood = true;
    if (person.role === "") {
      setIsGlobalAlertVisible(true);
    } else {
      setIsGlobalAlertVisible(false);
    }

    if (person.phoneNumber.length !== 9) {
      setIsPhoneAlertVisible(true);
      isEverythingGood = false;
    } else {
      setIsPhoneAlertVisible(false);
    }
    if (isEverythingGood) {
      navigation.navigate("PersonPaswordAchiveScreen", { person: person });
    }
  };

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllRoles,
        setData: setAllRoles,
        setIsDataRequestProcessed,
      });
    }, [])
  );

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
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ position: "absolute", width: "100%", zIndex: 2 }}
            onPress={() => setIsOpen(!isOpen)}
          >
            <Text style={styles.headText}>Роль</Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text style={styles.textInput}>{person.role}</Text>
            </View>
            <View style={styles.line} />
            {isOpen && (
              <View style={styles.dropDown}>
                <FlatList
                  nestedScrollEnabled={true}
                  data={allRoles}
                  renderItem={({ item: role }) => (
                    <>
                      {role.name !== "Власник" && (
                        <TouchableOpacity
                          onPress={() => handleOptionSelect(role.name)}
                          style={{ paddingVertical: 5 }}
                        >
                          <Text style={styles.dropDownText}>{role.name}</Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                  ListFooterComponent={() => (
                    <TouchableOpacity style={{ paddingVertical: 5 }}>
                      <Text
                        style={[styles.dropDownText, { color: "#5EC396" }]}
                        onPress={() =>
                          navigation.navigate("MenuStack", {
                            screen: "RoleStack",
                            params: {
                              screen: "AddRoleScreen",
                            },
                          })
                        }
                      >
                        створити нову
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </TouchableOpacity>

          <TextInputBlock
            headText="Номер телефону"
            placeholder=""
            beforeText="+380  "
            keyboardType="phone-pad"
            maxLength={9}
            style={{ marginTop: 127 }}
            value={person.phoneNumber}
            onChangeText={(value) => onChangeNumber(value)}
          />
          <ExceptionAlert
            textType="small"
            textInAlert={["введено неправильний номер"]}
            visible={isPhoneAlertVisible}
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
      {!isDataRequestProcessed && (
        <Image
          source={require("@assets/gif/buttonLoadingGif.gif")}
          style={{
            width: "100%",
            position: "absolute",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        />
      )}
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
    height: 150,
    width: 255,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 10,
    zIndex: 3,
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
