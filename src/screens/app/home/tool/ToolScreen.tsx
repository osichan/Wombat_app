import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import ActionConfirmation from "../../../../components/app/ActionConfirmation";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import ReturnToolComponent from "../../../../components/app/home/supply/tool/ReturnToolComponent";
import TakeToolModalComponent from "../../../../components/app/home/supply/tool/TakeToolComponent";
import { requestToDeleteTool } from "../../../../services/api/ToolApiService";
import { ToolProps } from "../../../../types/Types";

type ToolScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { tool: ToolProps }>, string>;
};

export default function ToolScreen({ navigation, route }: ToolScreenProps) {
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { setConnectionStatus } = useConnectionAlert();
  const [isTakeToolModalVisible, setIsTakeToolModalVisible] = useState(false);
  const [isReturnToolModalVisible, setIsReturnToolModalVisible] =
    useState(false);

  const handleToDelete = async () => {
    setIsRequestProcesed(false);
    const result = await requestToDeleteTool(route.params.tool.id);
    if (result) {
      navigation.goBack();
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
    }
    setIsRequestProcesed(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.nameText}>{route.params.tool.name}</Text>
        <Text style={styles.articleText}>{route.params.tool.article}</Text>
        {route.params.tool.description && (
          <Text style={styles.descriptionText}>
            {route.params.tool.description}
          </Text>
        )}
        {route.params.tool.currentlyAt.type === "WH" ||
        route.params.tool.currentlyAt.type === "SS" ? (
          <Text style={styles.descriptionText}>
            {route.params.tool.currentlyAt.data}
          </Text>
        ) : (
          route.params.tool.currentlyAt?.type === "OP" && (
            <>
              <Text style={styles.descriptionText}>
                {route.params.tool.currentlyAt.data.owner.name}
              </Text>
              <Text style={styles.descriptionText}>
                {route.params.tool.currentlyAt.data.project.name}
              </Text>
            </>
          )
        )}
        <PermissionCheck permissionsToBeVisible={[25]}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() =>
              navigation.navigate("EditToolScreen", { tool: route.params.tool })
            }
          >
            <Image
              source={require("@assets/images/settingsIcon.png")}
              style={styles.settingsImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setIsConfirmationVisible(true)}
          >
            <Image
              source={require("@assets/images/trashDeleteIcon.png")}
              style={styles.deleteImage}
            />
          </TouchableOpacity>
        </PermissionCheck>
        <PermissionCheck permissionsToBeVisible={[26]}>
          <TouchableOpacity
            style={styles.takeButton}
            onPress={() =>
              route.params.tool.currentlyAt.type === "WH"
                ? setIsTakeToolModalVisible(!isTakeToolModalVisible)
                : setIsReturnToolModalVisible(!isReturnToolModalVisible)
            }
          >
            <Text style={styles.takeButtonText}>
              {route.params.tool.currentlyAt.type === "WH"
                ? "взяти інструмент"
                : "повернути інструмент"}
            </Text>
          </TouchableOpacity>
        </PermissionCheck>
      </View>
      <TakeToolModalComponent
        isTakeToolModalVisible={isTakeToolModalVisible}
        setIsTakeToolModalVisible={setIsTakeToolModalVisible}
        tool={route.params.tool}
        navigation={navigation}
      />
      <ReturnToolComponent
        isReturnToolModalVisible={isReturnToolModalVisible}
        setIsReturnToolModalVisible={setIsReturnToolModalVisible}
        tool={route.params.tool}
        navigation={navigation}
      />
      <ActionConfirmation
        text="Впевнені, що хочете видалити"
        visible={isConfirmationVisible}
        nameOfItem={route.params.tool.name}
        isProcessed={isRequestProcesed}
        handleCancle={() => setIsConfirmationVisible(false)}
        handleDelete={() => handleToDelete()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  main: {
    width: 373,
    backgroundColor: "#313131",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
    marginBottom: 100,
    borderRadius: 10,
  },
  nameText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    width: "70%",
  },
  articleText: {
    color: "#808080",
    fontSize: 16,
  },
  descriptionText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 15,
    maxHeight: 80,
  },
  settingsButton: {
    position: "absolute",
    right: 11,
    top: 20,
  },
  settingsImage: {
    width: 30,
    height: 30,
  },
  deleteButton: {
    position: "absolute",
    right: 57,
    top: 18,
  },
  deleteImage: {
    width: 33,
    height: 33,
  },
  takeButton: {
    backgroundColor: "#5EC396",
    borderRadius: 10,
    width: 200,
    height: 55,
    position: "absolute",
    right: -10,
    bottom: -32,
    alignItems: "center",
    justifyContent: "center",
  },
  takeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
