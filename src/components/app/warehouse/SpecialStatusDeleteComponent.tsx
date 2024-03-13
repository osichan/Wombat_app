import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  requestToDeleteSpecialStatuses,
  requestToGetAllStatuses,
  requestToUpdateSpecialStatuses,
} from "../../../services/api/SpecialStatusService";
import { SpecialStatusProps } from "../../../types/Types";
import { usePanResponder } from "../../../utils/helpers/PanResponderUtils";
import { useConnectionAlert } from "../../ConnectionAlertProvider";
import ActionConfirmation from "../ActionConfirmation";
import PermissionCheck from "../PermissionCheck";

type SpecialStatusDeleteComponentProps = {
  specialStatus: SpecialStatusProps;
  navigation: any;
  isEditMode: boolean;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setAllSpecialStatuses: React.Dispatch<
    React.SetStateAction<SpecialStatusProps[]>
  >;
};

export default function SpecialStatusDeleteComponent({
  specialStatus,
  navigation,
  isEditMode,
  editId,
  setEditId,
  setAllSpecialStatuses,
}: SpecialStatusDeleteComponentProps) {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { pan, panResponder } = usePanResponder(setIsConfirmationVisible);
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const { setConnectionStatus } = useConnectionAlert();
  const [changedInformation, setChangedInformation] = useState("");

  const handleToDelete = async () => {
    setIsRequestProcesed(false);
    const result = await requestToDeleteSpecialStatuses(specialStatus);
    const allSpecialStatuses = await requestToGetAllStatuses();
    setIsRequestProcesed(true);
    setIsConfirmationVisible(false);
    if (result) {
      Animated.spring(pan, {
        toValue: { x: -1000, y: 0 },
        useNativeDriver: false,
      }).start(() => setAllSpecialStatuses(allSpecialStatuses));
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  };
  const handleCancle = () => {
    setIsConfirmationVisible(false);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const handleToEdit = () => {
    setChangedInformation(specialStatus.information);
    setEditId(specialStatus.id);
  };

  const handleToChangeName = async () => {
    specialStatus.information = changedInformation;
    const result = await requestToUpdateSpecialStatuses(specialStatus);
    if (result) {
      setEditId(null);
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      true;
    }
  };

  const deleteLineBackgroundColor = pan.x.interpolate({
    inputRange: [-200, 0],
    outputRange: ["#CC4E4E", "#313131"],
    extrapolate: "clamp",
  });

  if (!isEditMode) {
    return (
      <View style={styles.animatedMain}>
        <LinearGradient
          colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.95, y: 1 }}
          style={styles.mainView}
        >
          <Text style={styles.textName}>{specialStatus.information}</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <PermissionCheck
          permissionsToBeVisible={[15]}
          elseChildren={
            <View style={styles.animatedMain}>
              <LinearGradient
                colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.95, y: 1 }}
                style={styles.mainView}
              >
                <Text style={styles.textName}>{specialStatus.information}</Text>
              </LinearGradient>
            </View>
          }
        >
          <Animated.View
            style={[pan.getLayout(), styles.animatedMain]}
            {...panResponder.panHandlers}
          >
            <LinearGradient
              colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.95, y: 1 }}
              style={styles.mainView}
            >
              {isEditMode ? (
                <>
                  {editId === specialStatus.id ? (
                    <>
                      <TextInput
                        style={styles.textName}
                        value={changedInformation}
                        onChangeText={(text) => {
                          setChangedInformation(text);
                        }}
                      />
                      <View style={styles.line} />
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleToChangeName()}
                      >
                        <Image
                          source={require("@assets/images/accesIcon.png")}
                          style={styles.editButtonImage}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={styles.textName}>
                        {specialStatus.information}
                      </Text>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleToEdit()}
                      >
                        <Image
                          source={require("@assets/images/editIcon.png")}
                          style={styles.editButtonImage}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </>
              ) : (
                <Text style={styles.textName}>{specialStatus.information}</Text>
              )}
            </LinearGradient>
          </Animated.View>
          <Animated.View
            style={[
              styles.deleteLine,
              {
                backgroundColor: deleteLineBackgroundColor,
                transform: [{ translateX: pan.x }],
              },
            ]}
          >
            <Text style={styles.deleteLineText}>видалити</Text>
          </Animated.View>
        </PermissionCheck>
      </View>

      <ActionConfirmation
        text="Впевнені, що хочете видалити"
        visible={isConfirmationVisible}
        nameOfItem={specialStatus.information}
        isProcessed={isRequestProcesed}
        handleCancle={() => handleCancle()}
        handleDelete={() => handleToDelete()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  animatedMain: {
    width: 370,
    height: 89,
    marginTop: 10,
    alignSelf: "center",
    zIndex: 2,
  },
  mainView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingVertical: 28,
    paddingLeft: 36,
    paddingRight: "20%",
  },
  textName: {
    color: "#5EC396",
    fontSize: 28,
    fontWeight: "600",
  },
  textAddress: {
    marginBottom: 15,
    marginTop: "auto",
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  textDescription: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  editButton: {
    position: "absolute",
    bottom: 23,
    right: 18,
  },
  deleteLine: {
    width: 400,
    height: 89,
    top: 10,
    right: -355,
    zIndex: 1,
    justifyContent: "center",
    position: "absolute",
  },
  deleteLineText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 70,
  },
  editButtonImage: {
    width: 30,
    height: 30,
  },
  main: {
    height: 105,
    borderColor: "#5EC396",
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313131",
  },
  mainText: {
    color: "#fff",
    fontSize: 32,
  },
  line: {
    backgroundColor: "#fff",
    height: 1,
    width: 250,
  },
});
