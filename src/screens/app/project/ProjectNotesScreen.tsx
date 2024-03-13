import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useConnectionAlert } from "../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../components/LoadingButton";
import ScrollViewEditing from "../../../components/ScrollViewEditing";
import PermissionCheck from "../../../components/app/PermissionCheck";
import { selectUserInfo } from "../../../redux/reducers/userInfoReducer";
import { requestToUpdateProject } from "../../../services/api/ProjectService";
import { ProjectProps } from "../../../types/Types";

type ProjectNotesScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { project: ProjectProps }>, string>;
};

const ProjectNotesScreen = ({ navigation, route }: ProjectNotesScreenProps) => {
  const project = route.params.project;
  const [notes, setNotes] = useState(project ? project.notes : "");
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcessed, setIsRequestProcessed] = useState(true);
  const userInfo = useSelector(selectUserInfo);

  const handleToSave = async () => {
    setIsRequestProcessed(false);
    if (project) {
      const result = await requestToUpdateProject({
        ...project,
        notes,
        manager: project.manager.id,
        client: project.client ? project.client.id : null,
      });
      if (result) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "не вдалось зберегти");
      }
    }

    setIsRequestProcessed(true);
  };

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main}>
          <TextInput
            value={notes}
            onChangeText={(text) => setNotes(text)}
            numberOfLines={16}
            style={styles.textArea}
            multiline={true}
            editable={userInfo.permissionIds.includes(9) ? true : false}
          />
        </View>
        <PermissionCheck permissionsToBeVisible={[9]}>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#5A5A5A" }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Скасувати зміни</Text>
            </TouchableOpacity>
            <LoadingButton
              isProcessed={isRequestProcessed}
              style={[styles.button, { backgroundColor: "#5EC396" }]}
              onPress={() => handleToSave()}
            >
              <Text style={styles.buttonText}>Зберегти</Text>
            </LoadingButton>
          </View>
        </PermissionCheck>
      </ScrollViewEditing>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  main: {
    width: 360,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 20,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  textArea: {
    textAlignVertical: "top",
    fontSize: 20,
    color: "#fff",
  },
  button: {
    borderRadius: 10,
    width: 170,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    marginTop: 40,
  },
});

export default ProjectNotesScreen;
