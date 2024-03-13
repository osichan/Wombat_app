import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import { requestToUpdatePerson } from "../../../../services/api/PersonApiService";
import { requestToGetAllRoles } from "../../../../services/api/RoleApiService";
import { getDataAsync } from "../../../../storage/Async";
import { PersonProps, RoleProps } from "../../../../types/Types";
import { COMPANY_DOMAIN_KEY } from "../../../../utils/constants/asyncStorageKeys";

type EditPersonScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { person: PersonProps }>, string>;
};

const EditPersonScreen = ({ navigation, route }: EditPersonScreenProps) => {
  const { setConnectionStatus } = useConnectionAlert();
  const [allRoles, setAllRoles] = useState<RoleProps[] | null>(null);
  const [person, setPerson] = useState(route.params.person);
  const [domain, setDomain] = useState("");

  const [newPhoneNumber, setNewPhoneNumber] = useState<string>(
    person.phoneNumber ? person.phoneNumber.slice(3) : ""
  );
  const [newEmail, setNewEmail] = useState<string>(person.email.split("@")[0]);

  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(true);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(true);
  const [isPhoneNumberValid, setIsPhoneNUmberValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const domainTextRef = useRef<Text | null>(null);

  const [domainRightPadding, setDomainRightPadding] = useState<number>(100);

  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const [isRequestProcessed, setIsRequestProcessed] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onLayout = () => {
    domainTextRef.current?.measure((_x, _y, width, _height, _pageX, _pageY) => {
      setDomainRightPadding(width + 10);
    });
  };

  const handleToUpdate = async () => {
    setIsRequestProcessed(false);
    const emailRegex = /^[a-zA-Z0-9.]{4,}/;
    let everythingGood = true;

    if (person.firstName === "") {
      setIsFirstNameValid(false);
      everythingGood = false;
    } else {
      setIsFirstNameValid(true);
    }

    if (person.lastName === "") {
      setIsLastNameValid(false);
      everythingGood = false;
    } else {
      setIsLastNameValid(true);
    }

    if (newPhoneNumber.length !== 9 && newPhoneNumber !== "") {
      setIsPhoneNUmberValid(false);
      everythingGood = false;
    } else {
      setIsPhoneNUmberValid(true);
    }

    if (!emailRegex.test(newEmail)) {
      setIsEmailValid(false);
      everythingGood = false;
    } else {
      setIsEmailValid(true);
    }

    if (everythingGood) {
      const result = await requestToUpdatePerson({
        ...person,
        phoneNumber: newPhoneNumber,
        email: newEmail,
      });

      if (typeof result !== "boolean" && result !== null) {
        navigation.goBack();
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcessed(true);
  };

  const onChangeNumber = (newNumber: string) => {
    const numericValue = newNumber.replace(/[^0-9]/g, "");
    setNewPhoneNumber(numericValue);
  };

  useFocusEffect(
    useCallback(() => {
      const getDomain = async () => {
        setDomain(await getDataAsync({ key: COMPANY_DOMAIN_KEY }));
      };
      focusEffectToGetData({
        request: requestToGetAllRoles,
        setData: setAllRoles,
        setIsDataRequestProcessed,
      });
      getDomain();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main}>
          <View style={styles.inputBlock}>
            <Text style={styles.preInputText}>Імʼя :</Text>
            <TextInput
              value={person.firstName}
              style={[
                styles.textInput,
                !isFirstNameValid && {
                  borderColor: "#CC4E4E",
                  color: "#CC4E4E",
                },
              ]}
              onChangeText={(text) => setPerson({ ...person, firstName: text })}
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.preInputText}>Прізвище :</Text>
            <TextInput
              value={person.lastName}
              style={[
                styles.textInput,
                !isLastNameValid && {
                  borderColor: "#CC4E4E",
                  color: "#CC4E4E",
                },
              ]}
              onChangeText={(text) => setPerson({ ...person, lastName: text })}
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.preInputText}>Роль :</Text>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setIsOpen(!isOpen)}
            >
              <Text style={[styles.textInput]}>{person.role}</Text>
            </TouchableOpacity>
          </View>
          {isOpen && (
            <View style={styles.roleSelectorView}>
              <FlatList
                nestedScrollEnabled={true}
                data={allRoles}
                renderItem={({ item: role }) => {
                  if (role.name !== "Власник") {
                    return (
                      <TouchableOpacity
                        style={styles.roleSelectorComponent}
                        onPress={() => {
                          setPerson({ ...person, role: role.name });
                          setIsOpen(false);
                        }}
                      >
                        <Text style={styles.roleComponentText}>
                          {role.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                  return null;
                }}
              />
            </View>
          )}

          <View style={styles.inputBlock}>
            <Text style={styles.preInputText}>Номер :</Text>
            <TextInput
              placeholder="не обовязкове"
              placeholderTextColor={"lightgray"}
              value={newPhoneNumber}
              style={[
                styles.textInput,
                !isPhoneNumberValid && {
                  borderColor: "#CC4E4E",
                  color: "#CC4E4E",
                },
              ]}
              onChangeText={(text) => onChangeNumber(text)}
            />
          </View>

          <View
            style={[styles.inputBlock, { flexDirection: "column", height: 50 }]}
          >
            <Text
              style={[
                styles.preInputText,
                {
                  alignSelf: "auto",
                  marginBottom: 4,
                },
              ]}
            >
              Пошта :
            </Text>
            <TextInput
              value={newEmail}
              style={[
                styles.textInput,
                !isEmailValid && {
                  borderColor: "#CC4E4E",
                  color: "#CC4E4E",
                },
                {
                  paddingRight: domainRightPadding ? domainRightPadding : 100,
                },
              ]}
              onChangeText={(text) => setNewEmail(text)}
            />
            <Text
              style={[
                styles.preInputText,
                {
                  position: "absolute",
                  right: 35,
                  bottom: 0,
                },
              ]}
              ref={domainTextRef}
              onLayout={onLayout}
            >
              {`@${domain}`}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() =>
              navigation.navigate("PersonNewPasswordScreen", { person: person })
            }
          >
            <Text style={styles.changePasswordButtonText}>зміна паролю</Text>
          </TouchableOpacity>

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
    height: 550,
  },
  goToEditButton: {
    height: 60,
    width: 371,
    left: -1,
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

export default EditPersonScreen;
