import React, { Dispatch, SetStateAction, useState } from "react";
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
  requestToDeleteRole,
  requestToGetAllRoles,
  requestToUpdateRole,
} from "../../../../services/api/RoleApiService";
import { RoleProps } from "../../../../types/Types";
import { usePanResponder } from "../../../../utils/helpers/PanResponderUtils";
import { useConnectionAlert } from "../../../ConnectionAlertProvider";
import ActionConfirmation from "../../ActionConfirmation";
import PermissionCheck from "../../PermissionCheck";

type RoleDeleteComponentProps = {
  role: RoleProps;
  editId: number | null;
  setEditId: Dispatch<SetStateAction<number | null>>;
  setAllRoles: Dispatch<SetStateAction<RoleProps[] | null>>;
  navigation: any;
};

export default function RoleDeleteComponent({
  role,
  editId,
  setEditId,
  setAllRoles,
  navigation,
}: RoleDeleteComponentProps) {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { pan, panResponder } = usePanResponder(setIsConfirmationVisible);
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const { setConnectionStatus } = useConnectionAlert();
  const [changedName, setChangedName] = useState("");

  const handleToEdit = () => {
    setChangedName(role.name);
    setEditId(role.id);
  };

  const handleToChangeName = async () => {
    const result = await requestToUpdateRole({
      name: changedName,
      permissions: role.permissions,
      id: role.id,
    });
    if (result && typeof result !== "boolean") {
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
    }
    setEditId(null);
  };

  const handleToDelete = async () => {
    setIsRequestProcesed(false);
    const result = await requestToDeleteRole(role.id);
    setIsRequestProcesed(true);
    setIsConfirmationVisible(false);
    if (result) {
      Animated.spring(pan, {
        toValue: { x: -1000, y: 0 },
        useNativeDriver: false,
      }).start(async () => {
        const allRoles = await requestToGetAllRoles();
        if (allRoles && typeof allRoles !== "boolean") {
          setAllRoles(allRoles);
        } else {
          setConnectionStatus(false);
        }
      });
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      true;
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

  const deleteLineBackgroundColor = pan.x.interpolate({
    inputRange: [-200, 0],
    outputRange: ["#CC4E4E", "#313131"],
    extrapolate: "clamp",
  });

  return (
    <>
      <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
        <PermissionCheck
          permissionsToBeVisible={[3]}
          elseChildren={
            <View style={styles.animatedMain}>
              {editId === role.id ? (
                <View style={styles.main}>
                  <TextInput
                    style={styles.mainText}
                    value={changedName}
                    onChangeText={(text) => {
                      setChangedName(text);
                    }}
                  />
                  <View style={styles.line} />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.main}
                  onPress={() => {
                    navigation.navigate("RolePermissionScreen", { role: role });
                  }}
                >
                  <Text style={styles.mainText}>{role.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        >
          <Animated.View
            style={[pan.getLayout(), styles.animatedMain]}
            {...panResponder.panHandlers}
          >
            {editId === role.id ? (
              <View style={styles.main}>
                <TextInput
                  style={styles.mainText}
                  value={changedName}
                  onChangeText={(text) => {
                    setChangedName(text);
                  }}
                />
                <View style={styles.line} />
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.main}
                onPress={() => {
                  navigation.navigate("RolePermissionScreen", { role: role });
                }}
              >
                <Text style={styles.mainText}>{role.name}</Text>
              </TouchableOpacity>
            )}
            {editId === role.id ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleToChangeName()}
              >
                <Image
                  source={require("@assets/images/accesIcon.png")}
                  style={styles.editButtonImage}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleToEdit()}
              >
                <Image
                  source={require("@assets/images/editIcon.png")}
                  style={styles.editButtonImage}
                />
              </TouchableOpacity>
            )}
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
        nameOfItem={role.name}
        isProcessed={isRequestProcesed}
        handleCancle={() => handleCancle()}
        handleDelete={() => handleToDelete()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  animatedMain: {
    width: "100%",
    marginTop: 20,
    zIndex: 2,
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
  editButton: {
    position: "absolute",
    right: 17,
    bottom: 17,
  },
  editButtonImage: {
    width: 30,
    height: 30,
  },
  line: {
    backgroundColor: "#fff",
    height: 1,
    width: 170,
  },
  deleteLine: {
    width: 400,
    height: 105,
    top: 20,
    left: -10,
    zIndex: 1,
    justifyContent: "center",
  },
  deleteLineText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 70,
  },
});
