import { RouteProp, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import {
  requestToGetPermissions,
  requestToUpdateRole,
} from "../../../../services/api/RoleApiService";
import { PermissionsProps, RoleProps } from "../../../../types/Types";

type RolePermissionScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { role: RoleProps }>, string>;
};

export default function RolePermissionScreen({
  navigation,
  route,
}: RolePermissionScreenProps) {
  const [choosenPermissions, setChoosenPermissions] = useState<number[]>(
    route.params.role.permissions
  );
  const [isEdit, setIsEdit] = useState(false);
  const [isProcessed, setIsProcessed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  const [permissions, setPermissions] = useState<PermissionsProps[] | null>(
    null
  );
  const handleToSave = async () => {
    setIsProcessed(false);
    const result = await requestToUpdateRole({
      name: route.params.role.name,
      permissions: choosenPermissions,
      id: route.params.role.id,
    });
    if (result && typeof result !== "boolean") {
      setIsEdit(false);
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
    }
    setIsProcessed(true);
  };
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(false);

  const handleToUnChoose = (item: PermissionsProps) => {
    const newChoosenPermissions = choosenPermissions.filter(
      (id) => id !== item.id
    );
    setChoosenPermissions(newChoosenPermissions);
  };

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetPermissions,
        setData: setPermissions,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Дозволи та можливості для</Text>
      <Text
        style={[
          styles.headerText,
          { marginBottom: 42, marginTop: 5, fontWeight: "600" },
        ]}
      >
        {route.params.role.name}
      </Text>
      <ScrollView>
        {permissions?.map((permision) => (
          <>
            {!isEdit ? (
              <>
                {choosenPermissions.includes(permision.id) && (
                  <View style={styles.main}>
                    <View style={styles.chosenButton}></View>
                    <Text style={styles.mainText}>{permision.name}</Text>
                  </View>
                )}
              </>
            ) : (
              <TouchableOpacity
                style={styles.main}
                onPress={() => {
                  choosenPermissions.includes(permision.id)
                    ? handleToUnChoose(permision)
                    : setChoosenPermissions([
                        ...choosenPermissions,
                        permision.id,
                      ]);
                }}
              >
                <View
                  style={
                    choosenPermissions.includes(permision.id)
                      ? styles.chosenButton
                      : styles.nonChoosenButton
                  }
                ></View>
                <Text style={styles.mainText}>{permision.name}</Text>
              </TouchableOpacity>
            )}
          </>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        {!isEdit ? (
          <PermissionCheck permissionsToBeVisible={[3]}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setIsEdit(true);
              }}
            >
              <Text style={styles.editButtonText}>редагувати</Text>
              <Image
                source={require("@assets/images/editIcon.png")}
                style={styles.editButtonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={() => {
                navigation.navigate("RoleScreen");
              }}
            >
              <Image
                source={require("@assets/images/whiteBackButtonIcon.png")}
                style={styles.goBackButtonImage}
              />
              <Text style={styles.goBackButtonText}>до всіх ролей</Text>
            </TouchableOpacity>
          </PermissionCheck>
        ) : (
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
              paddingHorizontal: 33,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsEdit(false);
              }}
            >
              <Text style={styles.textInButton}>скасувати зміни</Text>
            </TouchableOpacity>
            <LoadingButton
              style={[styles.saveButton, styles.button]}
              onPress={() => handleToSave()}
              isProcessed={isProcessed}
            >
              <Text style={styles.textInButton}>зберегти</Text>
            </LoadingButton>
          </View>
        )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    paddingTop: 70,
  },
  headerText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },
  main: {
    marginLeft: 23,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  chosenButton: {
    height: 25,
    width: 25,
    backgroundColor: "#5EC396",
    borderRadius: 3,
  },
  nonChoosenButton: {
    height: 25,
    width: 25,
    borderWidth: 3,
    borderColor: "#5EC396",
    borderRadius: 3,
  },
  mainText: {
    color: "#fff",
    marginLeft: 16,
    fontSize: 20,
  },
  editButton: {
    marginRight: 55,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  editButtonText: {
    color: "#5EC396",
    fontSize: 16,
    marginRight: 11,
  },
  editButtonImage: {
    width: 20,
    height: 20,
  },
  goBackButton: {
    width: 200,
    height: 54,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "row",
  },
  goBackButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  goBackButtonImage: {
    width: 25,
    height: 25,
    marginHorizontal: 13,
  },
  footer: {
    height: 150,
  },
  button: {
    height: 50,
    width: 165,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  saveButton: {
    marginRight: 0,
    marginLeft: "auto",
  },
  textInButton: {
    fontSize: 16,
    fontWeight: "600",
  },
});
