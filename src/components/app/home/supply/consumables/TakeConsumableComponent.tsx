import { useFocusEffect } from "@react-navigation/native";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../../redux/reducers/userInfoReducer";
import { requestToTransferConsumable } from "../../../../../services/api/ConsumablesApiService";
import { requestToGetAllStaffPersons } from "../../../../../services/api/PersonApiService";
import { requestToGetAllActiveUnActiveProjects } from "../../../../../services/api/ProjectService";
import { requestToGetAllStatuses } from "../../../../../services/api/SpecialStatusService";
import {
  ConsumableProps,
  PersonProps,
  ProjectProps,
  SpecialStatusProps,
} from "../../../../../types/Types";
import { useConnectionAlert } from "../../../../ConnectionAlertProvider";
import LoadingButton from "../../../../LoadingButton";
import focusEffectToGetData from "../../../../focusEffectToGetData";
import PermissionCheck from "../../../PermissionCheck";

type TakeConsumableModalComponentProps = {
  isTakeConsumableModalVisible: boolean;
  setIsTakeConsumableModalVisible: Dispatch<SetStateAction<boolean>>;
  consumable: ConsumableProps;
  navigation: any;
};

export default function TakeConsmableModalComponent({
  isTakeConsumableModalVisible,
  setIsTakeConsumableModalVisible,
  consumable,
  navigation,
}: TakeConsumableModalComponentProps) {
  const [isRequestProcesed, setIsRequestProcesed] = useState<boolean>(true);
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);
  const [takenQuantity, setTakenQuantity] = useState<string>("");

  const [allPersons, setAllPersons] = useState<PersonProps[] | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectProps[] | null>(null);
  const [allSpecailStatuses, setAllSpecialStatuses] = useState<
    SpecialStatusProps[] | null
  >(null);

  const userInfo = useSelector(selectUserInfo);

  const [choosenProject, setChoosenProject] = useState<ProjectProps | null>(
    null
  );
  const [isChoosenProjectValid, setIsChoosenProjectValid] =
    useState<boolean>(true);
  const [choosenSpecialStatus, setChoosenSpecialStatus] =
    useState<SpecialStatusProps | null>(null);
  const [isChoosenSpecialStatusValid, setIsChoosenSpecialStatusValid] =
    useState<boolean>(true);

  const [userToGive, setUserToGive] = useState<PersonProps | null>(null);

  const { setConnectionStatus } = useConnectionAlert();

  const [isUserToGiveOpen, setIsUserToGiveOpen] = useState<boolean>(false);
  const [isWhereToTakeOpen, setIsWhereToTakeOpen] = useState<boolean>(false);
  const [isProjectChoosen, setIsProjectChoosen] = useState(true);

  const mainViewnRef = useRef<View | null>(null);

  const [projectTopValue, setProjectTopValue] = useState(180);
  const projectButtonRef = useRef<TouchableOpacity | null>(null);

  const [ownerTopValue, setOwnerTopValue] = useState(180);
  const ownerButtonRef = useRef<TouchableOpacity | null>(null);

  const onLayout = () => {
    let topValue = 0;
    mainViewnRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      topValue = pageY;
    });
    projectButtonRef.current?.measure(
      (_x, _y, _width, _height, _pageX, pageY) => {
        setProjectTopValue(pageY - topValue + 44);
      }
    );
    ownerButtonRef.current?.measure(
      (_x, _y, _width, _height, _pageX, pageY) => {
        setOwnerTopValue(pageY - topValue + 44);
      }
    );
  };

  const onChangeQuantity = (newNumber: string) => {
    let numericValue = newNumber.replace(/[^0-9.]/g, "");
    if (parseFloat(numericValue) > consumable.unitQuantity) {
      setTakenQuantity(numericValue.slice(0, -1));
    } else {
      setTakenQuantity(numericValue);
    }
  };

  const takeConsumable = async () => {
    setIsRequestProcesed(false);
    if (isProjectChoosen) {
      if (choosenProject === null) {
        setIsChoosenProjectValid(false);
      } else {
        setIsChoosenProjectValid(true);
        if (
          await requestToTransferConsumable({
            id: consumable.id,
            owner: userToGive !== null ? userToGive.id : userInfo.id,
            project: choosenProject.id,
            unit_quantity: parseFloat(takenQuantity),
          })
        ) {
          navigation.goBack();
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      }
    } else {
      if (choosenSpecialStatus === null) {
        setIsChoosenSpecialStatusValid(false);
      } else {
        setIsChoosenSpecialStatusValid(true);

        if (
          await requestToTransferConsumable({
            id: consumable.id,
            owner: userToGive !== null ? userToGive.id : userInfo.id,
            project: choosenSpecialStatus.id,
            unit_quantity: parseFloat(takenQuantity),
          })
        ) {
          navigation.goBack();
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      }
    }
    setIsRequestProcesed(true);
  };

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllStaffPersons,
        setData: setAllPersons,
        setIsDataRequestProcessed,
      });

      focusEffectToGetData({
        request: () => requestToGetAllActiveUnActiveProjects(true),
        setData: setAllProjects,
        setIsDataRequestProcessed,
      });

      focusEffectToGetData({
        request: requestToGetAllStatuses,
        setData: setAllSpecialStatuses,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <Modal visible={isTakeConsumableModalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.main} ref={mainViewnRef}>
          <Text style={styles.headText}>{"Взяти матеріал"}</Text>
          <Text style={styles.headText}>“{consumable.name}”</Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              marginTop: 10,
            }}
          >
            <TextInput
              style={styles.quantityTextInput}
              value={takenQuantity}
              onChangeText={(text) => onChangeQuantity(text)}
              keyboardType="number-pad"
            />
            <Text
              style={styles.quantitAfterText}
            >{`${consumable.measuredBy}     (максимально ${consumable.unitQuantity})`}</Text>
          </View>

          <PermissionCheck
            permissionsToBeVisible={[23]}
            elseChildren={
              <TouchableOpacity
                activeOpacity={1}
                ref={ownerButtonRef}
                style={{ marginTop: 30, width: 340, height: 45 }}
              />
            }
          >
            {isProjectChoosen && (
              <TouchableOpacity
                ref={ownerButtonRef}
                style={[styles.dropdownInput, { marginTop: 30 }]}
                onPress={() => setIsUserToGiveOpen(!isUserToGiveOpen)}
              >
                <Text style={styles.dropdownText}>
                  {userToGive === null
                    ? "на себе"
                    : `${userToGive.lastName}  ${userToGive.firstName}`}
                </Text>
                <Image
                  source={require("@assets/images/openRectangleIcon.png")}
                  style={styles.dropdownImage}
                />
              </TouchableOpacity>
            )}
            {isUserToGiveOpen && (
              <View
                style={[
                  styles.dropdown,
                  { top: ownerTopValue, zIndex: 3, height: 200 },
                ]}
              >
                <FlatList
                  nestedScrollEnabled={true}
                  data={allPersons}
                  renderItem={({ item }) => {
                    if (item.id === userInfo.id) {
                      return null;
                    }
                    return (
                      <TouchableOpacity
                        style={styles.dropDownElement}
                        onPress={() => {
                          setUserToGive(item);
                          setIsUserToGiveOpen(!isUserToGiveOpen);
                        }}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.dropDownElementText}>
                          {`${item.lastName}  ${item.firstName}`}
                        </Text>
                        <View style={styles.line} />
                      </TouchableOpacity>
                    );
                  }}
                  ListHeaderComponent={
                    <TouchableOpacity
                      style={styles.dropDownElement}
                      onPress={() => {
                        setUserToGive(null);
                        setIsUserToGiveOpen(!isUserToGiveOpen);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.dropDownElementText}>На себе</Text>
                      <View style={styles.line} />
                    </TouchableOpacity>
                  }
                  ListFooterComponent={
                    <>
                      {allPersons?.length !== 0 ? (
                        <View style={styles.dropDownFooter} />
                      ) : (
                        <View style={styles.dropDownElement}>
                          <Text style={styles.dropDownElementText}>
                            У вас немає дозволу на перегляд користувачів
                          </Text>
                        </View>
                      )}
                    </>
                  }
                />
              </View>
            )}
          </PermissionCheck>

          <View
            style={[
              styles.chooseWhereToTakeType,
              !isProjectChoosen && { marginTop: 95 },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.warehouseTypeButton,
                isProjectChoosen && { backgroundColor: "#5A5A5A" },
              ]}
              onPress={() => {
                setIsProjectChoosen(true);
              }}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  isProjectChoosen && { color: "#fff" },
                ]}
              >
                Обʼєкт
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.specialStatusTypeButton,
                !isProjectChoosen && { backgroundColor: "#5A5A5A" },
              ]}
              onPress={() => {
                setIsProjectChoosen(false);
              }}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  !isProjectChoosen && { color: "#fff" },
                ]}
              >
                Спец. статус
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            ref={projectButtonRef}
            style={[
              styles.dropdownInput,
              isProjectChoosen
                ? !isChoosenProjectValid && { backgroundColor: "red" }
                : !isChoosenSpecialStatusValid && { backgroundColor: "red" },
            ]}
            onPress={() => setIsWhereToTakeOpen(!isWhereToTakeOpen)}
          >
            <Text style={styles.dropdownText}>
              {isProjectChoosen
                ? choosenProject
                  ? choosenProject.name
                  : "поле обовзкове"
                : choosenSpecialStatus
                ? choosenSpecialStatus.information
                : "поле обовзкове"}
            </Text>
            <Image
              source={require("@assets/images/openRectangleIcon.png")}
              style={styles.dropdownImage}
            />
          </TouchableOpacity>
          {isWhereToTakeOpen && (
            <View
              style={[
                styles.dropdown,
                { top: projectTopValue, zIndex: 2, height: 140 },
              ]}
            >
              {isProjectChoosen ? (
                <FlatList
                  nestedScrollEnabled={true}
                  data={allProjects}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropDownElement}
                      onPress={() => {
                        setChoosenProject(item);
                        setIsWhereToTakeOpen(!isWhereToTakeOpen);
                      }}
                    >
                      <Text style={styles.dropDownElementText}>
                        {item.name}
                      </Text>
                      <View style={styles.line} />
                    </TouchableOpacity>
                  )}
                  ListFooterComponent={
                    <>
                      {allProjects?.length !== 0 ? (
                        <View style={styles.dropDownFooter} />
                      ) : (
                        <View style={styles.dropDownElement}>
                          <Text style={styles.dropDownElementText}>
                            У вас немає дозволу на перегляд об'єктів
                          </Text>
                        </View>
                      )}
                    </>
                  }
                />
              ) : (
                <FlatList
                  nestedScrollEnabled={true}
                  data={allSpecailStatuses}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropDownElement}
                      onPress={() => {
                        setChoosenSpecialStatus(item);
                        setIsWhereToTakeOpen(!isWhereToTakeOpen);
                      }}
                    >
                      <Text style={styles.dropDownElementText}>
                        {item.information}
                      </Text>
                      <View style={styles.line} />
                    </TouchableOpacity>
                  )}
                  ListFooterComponent={
                    <>
                      {allProjects?.length !== 0 ? (
                        <View style={styles.dropDownFooter} />
                      ) : (
                        <View style={styles.dropDownElement}>
                          <Text style={styles.dropDownElementText}>
                            У вас немає дозволу на перегляд об'єктів
                          </Text>
                        </View>
                      )}
                    </>
                  }
                />
              )}
            </View>
          )}

          <View style={styles.buttonView} onLayout={onLayout}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancleButton}
              onPress={() => setIsTakeConsumableModalVisible(false)}
            >
              <Text style={styles.textInButton}>Скасувати</Text>
            </TouchableOpacity>
            <LoadingButton
              isProcessed={isRequestProcesed}
              activeOpacity={0.7}
              style={styles.settupButton}
              onPress={() => takeConsumable()}
            >
              <Text style={styles.textInButton}>Взяти</Text>
            </LoadingButton>
          </View>
        </View>
      </View>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: 366,
    height: 410,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 120,
    padding: 25,
    alignItems: "center",
  },
  headText: {
    fontSize: 23,
    textAlign: "center",
    lineHeight: 28,
    width: 220,
  },
  dropdownInput: {
    width: 340,
    height: 45,
    borderRadius: 23,
    borderWidth: 2,
    backgroundColor: "#fff",
    elevation: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownText: {
    color: "rgba(0, 0, 0, 0.30)",
    fontSize: 18,
  },
  dropdownImage: {
    width: 16,
    height: 16,
  },
  dropdown: {
    position: "absolute",
    alignSelf: "center",
    left: 15,
    right: 15,
    paddingHorizontal: 15,
  },
  dropDownElement: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    height: 34,
  },
  dropDownElementText: {
    paddingHorizontal: 26,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "auto",
  },
  dropDownFooter: {
    height: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    marginBottom: 0,
    marginTop: "auto",
  },
  buttonView: {
    marginBottom: 0,
    marginTop: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  cancleButton: {
    width: 135,
    height: 52,
    backgroundColor: "rgba(49, 49, 49, 0.8)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settupButton: {
    width: 135,
    height: 52,
    backgroundColor: "#5EC396",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  chooseWhereToTakeType: {
    width: 210,
    height: 30,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  warehouseTypeButton: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  specialStatusTypeButton: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  typeButtonText: {
    color: "rgba(90, 90, 90, 0.70)",
    fontSize: 17,
  },
  quantityTextInput: {
    width: 80,
    borderBottomWidth: 2,
    borderColor: "#000",
    height: 17,
  },
  quantitAfterText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginLeft: 5,
  },
});
