import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  requestToDeleteProject,
  requestToUpdateProject,
} from "../../../services/api/ProjectService";
import { ProjectProps } from "../../../types/Types";
import { useConnectionAlert } from "../../ConnectionAlertProvider";
import LoadingButton from "../../LoadingButton";
import ActionConfirmation from "../ActionConfirmation";
import PermissionCheck from "../PermissionCheck";

type ProjectSettingsButtonProps = {
  navigation: any;
  project: ProjectProps;
  whereToNavigate: string;
};

const ProjectSettingsButton = ({
  navigation,
  project,
  whereToNavigate,
}: ProjectSettingsButtonProps) => {
  const [isDropDownSettingsVisible, setIsDropDownSettingsVisible] =
    useState(false);
  const [isDeleteRequestProcesed, setIsDeleteRequestProcesed] = useState(true);
  const [isCloseRequestProcesed, setIsCloseRequestProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [isCloseConfirmationVisible, setCloseConfirmationVisible] =
    useState(false);

  const handleToClose = async () => {
    setIsCloseRequestProcesed(false);
    const result = await requestToUpdateProject(
      project.isActive
        ? {
            ...project,
            isActive: false,
            manager: project.manager.id,
            client: project.client ? project.client.id : null,
          }
        : {
            ...project,
            isActive: true,
            manager: project.manager.id,
            client: project.client ? project.client.id : null,
          }
    );
    if (typeof result !== "boolean" && result !== null) {
      navigation.goBack();
    } else {
      setConnectionStatus(false);
      setIsCloseRequestProcesed(true);
    }
  };

  const handleToDelete = async () => {
    setIsDeleteRequestProcesed(false);
    const result = await requestToDeleteProject(project.id);
    if (result) {
      navigation.goBack();
    } else {
      setConnectionStatus(true);
    }
    setIsDeleteRequestProcesed(true);
  };

  return (
    <>
      <PermissionCheck permissionsToBeVisible={[29]}>
        <TouchableOpacity
          style={{ marginRight: 26 }}
          onPress={() =>
            setIsDropDownSettingsVisible(!isDropDownSettingsVisible)
          }
        >
          <Image
            source={require("@assets/images/settingsIcon.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        {isDropDownSettingsVisible && (
          <View style={styles.dropDownContainer}>
            <TouchableOpacity
              style={styles.dropDownComponent}
              onPress={() => {
                navigation.navigate(whereToNavigate, { project: project });
                setIsDropDownSettingsVisible(false);
              }}
            >
              <Text style={styles.dropDownComponentText}>Редагувати</Text>
            </TouchableOpacity>
            <LoadingButton
              isProcessed={isCloseRequestProcesed}
              onPress={() => setCloseConfirmationVisible(true)}
              style={[
                styles.dropDownComponent,
                { borderWidth: 1, borderColor: "#FFFFFF33" },
              ]}
            >
              <Text style={styles.dropDownComponentText}>
                {project.isActive ? "Закрити обʼєкт" : "Відновити обʼєкт"}
              </Text>
            </LoadingButton>
            <TouchableOpacity
              onPress={() => setDeleteConfirmationVisible(true)}
              style={styles.dropDownComponent}
            >
              <Text
                style={[styles.dropDownComponentText, { color: "#CC4E4E" }]}
              >
                Видалити
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </PermissionCheck>
      <ActionConfirmation
        visible={deleteConfirmationVisible}
        handleCancle={() => setDeleteConfirmationVisible(false)}
        handleDelete={() => handleToDelete()}
        nameOfItem={project.name}
        isProcessed={isDeleteRequestProcesed}
        text={"Впевнені, що хочете видалити"}
      />
      <ActionConfirmation
        visible={isCloseConfirmationVisible}
        handleCancle={() => setCloseConfirmationVisible(false)}
        handleDelete={() => handleToClose()}
        nameOfItem={project.name}
        isProcessed={isDeleteRequestProcesed}
        text={
          project.isActive
            ? "Впевнені, що хочете закрити об'єкт"
            : "Впевнені, що хочете відновити обє'кт"
        }
        buttonText={project.isActive ? "Закрити об'єкт" : "Відновити об'єкт"}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 34,
    height: 30,
  },
  dropDownContainer: {
    width: 150,
    backgroundColor: "#FFFFFF8C",
    position: "absolute",
    top: 70,
    right: 20,
    borderRadius: 10,
  },
  dropDownComponent: {
    height: 33,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownComponentText: {
    fontSize: 17,
    fontWeight: "600",
  },
});

export default ProjectSettingsButton;
