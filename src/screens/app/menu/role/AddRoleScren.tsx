import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import ExceptionAlert from "../../../../components/ExceptionsAlert";
import LoadingButton from "../../../../components/LoadingButton";
import {
  requestToAddRole,
  requestToGetPermissions,
} from "../../../../services/api/RoleApiService";
import { PermissionsProps } from "../../../../types/Types";
import { useFocusEffect } from "@react-navigation/native";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";

export default function AddRoleScreen({ navigation }: any) {
  const [isProcessed, setIsProcessed] = useState(true);
  const [roleName, setRoleName] = useState("");
  const { setConnectionStatus } = useConnectionAlert();
  const [choosenPermissions, setChoosenPermissions] = useState<number[]>([]);
  const [isInputAlertVisible, setIsInputAlertVisible] = useState(false);
  const [permissions, setPermissions] = useState<PermissionsProps[] | null>(
    null
  );
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(false);

  const handleToUnChoose = (item: PermissionsProps) => {
    const newChoosenPermissions = choosenPermissions.filter(
      (id) => id !== item.id
    );
    setChoosenPermissions(newChoosenPermissions);
  };

  const handleToSave = async () => {
    setIsProcessed(false);
    if (roleName === "") {
      setIsInputAlertVisible(true);
    } else {
      setIsInputAlertVisible(false);
      const result = await requestToAddRole({
        name: roleName,
        permissions: choosenPermissions.sort(function (a, b) {
          return a - b;
        }),
      });
      if (result) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsProcessed(true);
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
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text style={styles.labelText}>Назва ролі :</Text>
        <TextInput
          style={styles.textInput}
          value={roleName}
          onChangeText={(text) => {
            setRoleName(text);
          }}
          placeholder="Нова роль"
          placeholderTextColor={"#8c8c8c"}
        />
        <View style={styles.line} />
        <ExceptionAlert
          textInAlert={["Заповніть поле !"]}
          visible={isInputAlertVisible}
          textType="small"
          style={{
            marginTop: 5,
            width: 200,
            marginLeft: 22,
            marginBottom: 20,
          }}
        />
        <FlatList
          nestedScrollEnabled={true}
          data={permissions}
          renderItem={({ item }) => {
            return (
              <>
                {choosenPermissions.includes(item.id) ? (
                  <TouchableOpacity
                    style={styles.main}
                    onPress={() => {
                      handleToUnChoose(item);
                    }}
                  >
                    <View
                      style={[
                        styles.chooseButton,
                        { backgroundColor: "#5EC396" },
                      ]}
                    ></View>
                    <Text style={styles.mainText}>{item.name}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.main}
                    onPress={() => {
                      setChoosenPermissions([...choosenPermissions, item.id]);
                    }}
                  >
                    <View style={styles.chooseButton}></View>
                    <Text style={styles.mainText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              </>
            );
          }}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5A5A5A" }]}
            onPress={() => {
              navigation.navigate("RoleScreen");
            }}
          >
            <Text style={styles.textInButton}>скасувати зміни</Text>
          </TouchableOpacity>
          <LoadingButton
            style={[styles.saveButton, styles.button]}
            onPress={() => handleToSave()}
            isProcessed={isProcessed}
          >
            <Text style={styles.textInButton}>зберегти нову роль</Text>
          </LoadingButton>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  labelText: {
    color: "#fff",
    fontSize: 26,
    marginTop: 80,
    marginLeft: 20,
  },
  textInput: {
    marginTop: 20,
    marginLeft: 25,
    color: "#fff",
    fontSize: 24,
  },
  line: {
    height: 1,
    backgroundColor: "#fff",
    marginLeft: 22,
    width: 200,
  },
  main: {
    paddingRight: 22,
    marginLeft: 23,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  chooseButton: {
    height: 25,
    width: 25,
    borderWidth: 3,
    borderColor: "#5EC396",
    borderRadius: 3,
  },
  mainText: {
    color: "#fff",
    marginLeft: 16,
    paddingRight: 10,
    fontSize: 20,
  },
  footer: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: "row",
  },
  button: {
    height: 50,
    width: 175,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    marginRight: 0,
    marginLeft: "auto",
    backgroundColor: "#5EC396",
  },
  textInButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
