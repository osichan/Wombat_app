import { RouteProp, useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import { requestToGetAllTasksOfProject } from "../../../../services/api/ProjectTaskService";
import { ProjectProps, ProjectTaskProps } from "../../../../types/Types";
import PermissionCheck from "../../../../components/app/PermissionCheck";

type ProjectTaskScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { project: ProjectProps }>, string>;
};

const ProjectTasksScreen = ({ navigation, route }: ProjectTaskScreenProps) => {
  const [projectTasks, setProjectTasks] = useState<ProjectTaskProps[]>();
  const [filteredProjectTasks, setFilteredProjectTasks] =
    useState<ProjectTaskProps[]>();
  const [isGetAllTasksProcesed, setIsGetAllTasksProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();

  const markerColorDueToStatus = {
    A: "#C39B5E",
    O: "#C35E5E",
    D: "#5EC396",
  };

  useFocusEffect(
    React.useCallback(() => {
      const getAllProjectTasks = async () => {
        setIsGetAllTasksProcesed(false);
        const result = await requestToGetAllTasksOfProject(
          route.params.project.id
        );
        if (typeof result !== "boolean" && result !== null) {
          setProjectTasks(result);
          setFilteredProjectTasks(result);
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
        setIsGetAllTasksProcesed(true);
      };
      getAllProjectTasks();
    }, [])
  );

  if (!isGetAllTasksProcesed) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image
          source={require("@assets/gif/buttonLoadingGif.gif")}
          style={{ width: 300, height: 200 }}
        />
      </View>
    );
  }

  const handleFilterTasksByStatus = (
    status: "All" | "Active" | "Outdated" | "Done"
  ) => {
    if (status === "All") {
      setFilteredProjectTasks(projectTasks);
    } else {
      setFilteredProjectTasks(
        projectTasks?.filter((element) => element.taskStatus === status[0])
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.row, { marginLeft: 10 }]}>
          <TouchableOpacity
            style={[styles.buttonInHeader, { backgroundColor: "#797979" }]}
            activeOpacity={0.7}
            onPress={() => handleFilterTasksByStatus("All")}
          >
            <Text style={styles.tetxInHeaderButton}>Усі</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonInHeader, { backgroundColor: "#5EC396" }]}
            activeOpacity={0.7}
            onPress={() => handleFilterTasksByStatus("Done")}
          >
            <Text style={styles.tetxInHeaderButton}>Виконано</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.buttonInHeader, { backgroundColor: "#C39B5E" }]}
            activeOpacity={0.7}
            onPress={() => handleFilterTasksByStatus("Active")}
          >
            <Text style={styles.tetxInHeaderButton}>В процесі</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonInHeader, { backgroundColor: "#C35E5E" }]}
            activeOpacity={0.7}
            onPress={() => handleFilterTasksByStatus("Outdated")}
          >
            <Text style={styles.tetxInHeaderButton}>Застарілі</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        nestedScrollEnabled={true}
        data={filteredProjectTasks}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.taskComponentConatiner}
              onPress={() =>
                navigation.navigate("SingleProjectTaskScreen", {
                  projectTask: item,
                  project: route.params.project,
                })
              }
            >
              <View
                style={[
                  styles.taskComponentMarker,
                  { backgroundColor: markerColorDueToStatus[item.taskStatus] },
                ]}
              />
              <Text style={styles.taskComponentText}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{
          alignItems: "center",
          marginTop: 12,
        }}
      />
      <PermissionCheck permissionsToBeVisible={[11]}>
        <TouchableOpacity
          style={styles.newTaskButton}
          onPress={() =>
            navigation.navigate("EditProjectTaskScreen", {
              project: route.params.project,
            })
          }
        >
          <Text style={styles.textInNewTaskButton}>нове завдання</Text>
          <Image
            source={require("@assets/images/addIconGreen.png")}
            style={styles.imageInNewTaskButton}
          />
        </TouchableOpacity>
      </PermissionCheck>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  header: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  buttonInHeader: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 26,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  tetxInHeaderButton: {
    color: "#fff",
    fontSize: 17,
  },
  taskComponentConatiner: {
    width: 330,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#494949",
    elevation: 12,
    marginTop: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  taskComponentMarker: {
    paddingHorizontal: 1,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 25,
  },
  taskComponentText: {
    color: "#fff",
    fontSize: 17,
    marginLeft: 24,
  },
  newTaskButton: {
    backgroundColor: "#494949",
    width: 220,
    height: 50,
    borderRadius: 10,
    borderColor: "#5EC396",
    borderWidth: 2,
    marginBottom: 25,
    alignSelf: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textInNewTaskButton: {
    color: "#5EC396",
    fontSize: 22,
    fontWeight: "600",
  },
  imageInNewTaskButton: {
    height: 30,
    width: 30,
  },
});

export default ProjectTasksScreen;
