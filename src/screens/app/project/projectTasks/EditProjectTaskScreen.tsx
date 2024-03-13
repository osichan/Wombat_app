import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import GreenTextInputBlock from "../../../../components/app/GreenTextInputBlock";
import {
  requestToAddProjectStatus,
  requestToUpdateProjectStatus,
} from "../../../../services/api/ProjectTaskService";
import { ProjectProps, ProjectTaskProps } from "../../../../types/Types";

type EditProjectTaskScreenProps = {
  navigation: any;
  route: RouteProp<
    Record<string, { projectTask: ProjectTaskProps; project: ProjectProps }>,
    string
  >;
};

const EditProjectTaskScreen = ({
  navigation,
  route,
}: EditProjectTaskScreenProps) => {
  const [name, setName] = useState<string>(
    route.params.projectTask ? route.params.projectTask.name : ""
  );
  const [isNameFilled, setIsNameFilled] = useState(true);
  const [notes, setNotes] = useState<string>(
    route.params.projectTask ? route.params.projectTask.description : ""
  );
  const [status, setStatus] = useState<"A" | "O" | "D">(
    route.params.projectTask ? route.params.projectTask.taskStatus : "A"
  );
  const [isShowClient, setIsShowClient] = useState<boolean>(
    route.params.projectTask ? route.params.projectTask.showToClient : false
  );

  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();

  const handleToAddTask = async () => {
    setIsRequestProcesed(false);
    if (name === "") {
      setIsNameFilled(false);
    } else {
      setIsNameFilled(true);
      let result;
      if (route.params.projectTask) {
        result = await requestToUpdateProjectStatus({
          id: route.params.projectTask.id,
          name,
          description: notes,
          task_status: status,
          show_to_client: isShowClient,
          projectId: route.params.project.id,
        });
      } else {
        result = await requestToAddProjectStatus({
          name,
          description: notes,
          task_status: status,
          show_to_client: isShowClient,
          projectId: route.params.project.id,
        });
      }
      if (result) {
        await navigation.goBack();
        await navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcesed(true);
  };

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View>
          <Text style={styles.headerText}>
            {route.params.projectTask
              ? "Редагування завдання"
              : "Створення нового завдання"}
          </Text>
          <GreenTextInputBlock
            value={name}
            onChangeText={(text) => setName(text)}
            header="Назва завдання"
            placeholder="Помити вікна"
            style={{ marginTop: 30 }}
            valible={isNameFilled}
          />
          <View style={styles.inputView}>
            <Text style={styles.inputHeaderText}>Опис</Text>
            <TextInput
              style={styles.notesTextArea}
              numberOfLines={8}
              multiline={true}
              value={notes}
              onChangeText={(text) => setNotes(text)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputHeaderText}>Виберіть статус завдання</Text>
            <View style={styles.taskStatusView}>
              <TouchableOpacity
                style={[
                  styles.taskStatusButton,
                  { backgroundColor: status === "D" ? "#5EC396" : "#387359" },
                ]}
                activeOpacity={0.7}
                onPress={() => setStatus("D")}
              >
                <Text style={styles.tetxInTaskStatusButton}>Виконано</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.taskStatusButton,
                  { backgroundColor: status === "A" ? "#C39B5E" : "#82673e" },
                ]}
                activeOpacity={0.7}
                onPress={() => setStatus("A")}
              >
                <Text style={styles.tetxInTaskStatusButton}>В процесі</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.taskStatusButton,
                  { backgroundColor: status === "O" ? "#C35E5E" : "#5e2e2e" },
                ]}
                activeOpacity={0.7}
                onPress={() => setStatus("O")}
              >
                <Text style={styles.tetxInTaskStatusButton}>Застарілі</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setIsShowClient(!isShowClient)}
            style={styles.showClientView}
          >
            {isShowClient ? (
              <Image
                source={require("@assets/images/checkboxIconGreen.png")}
                style={{ height: 24, width: 24 }}
              />
            ) : (
              <View style={styles.checkbox} />
            )}
            <Text style={styles.showClientText}>Показувати клієнту</Text>
          </TouchableOpacity>
          <LoadingButton
            isProcessed={isRequestProcesed}
            style={styles.newTaskButton}
            onPress={() => handleToAddTask()}
          >
            <Text style={styles.textInNewTaskButton}>
              {route.params.projectTask ? "Змінити" : "Додати завдання"}
            </Text>
          </LoadingButton>
        </View>
      </ScrollViewEditing>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
  },
  inputView: {
    width: 290,
    alignSelf: "center",
    marginTop: 35,
  },
  notesTextArea: {
    height: 124,
    backgroundColor: "#444444",
    borderRadius: 10,
    textAlignVertical: "top",
    padding: 10,
    color: "#fff",
  },
  inputHeaderText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5EC396",
  },
  taskStatusView: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskStatusButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 26,
    paddingHorizontal: 12,
  },
  tetxInTaskStatusButton: {
    color: "#fff",
    fontSize: 17,
  },
  showClientView: {
    marginTop: 60,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 25,
  },
  showClientText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 8,
  },
  checkbox: {
    borderRadius: 3,
    borderColor: "#fff",
    borderWidth: 2,
    height: 20,
    width: 20,
  },
  newTaskButton: {
    backgroundColor: "#313131",
    width: 270,
    height: 50,
    borderRadius: 10,
    borderColor: "#5EC396",
    borderWidth: 2,
    marginBottom: 25,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  textInNewTaskButton: {
    color: "#5EC396",
    fontSize: 22,
    fontWeight: "600",
  },
});

export default EditProjectTaskScreen;
