import { RouteProp } from "@react-navigation/native";
import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import { ProjectProps, ProjectTaskProps } from "../../../../types/Types";
import { TouchableOpacity } from "react-native-gesture-handler";
import PermissionCheck from "../../../../components/app/PermissionCheck";

type SingleProjectTaskScreenProps = {
  navigation: any;
  route: RouteProp<
    Record<string, { projectTask: ProjectTaskProps; project: ProjectProps }>,
    string
  >;
};

const SingleProjectTaskScreen = ({
  navigation,
  route,
}: SingleProjectTaskScreenProps) => {
  const markerColorDueToStatus = {
    A: ["#C39B5E", "В процесі"],
    O: ["#C35E5E", "Застарілі"],
    D: ["#5EC396", "Виконано"],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Завдання</Text>
      <View style={styles.main}>
        <Text style={styles.nameText}>{route.params.projectTask.name}</Text>
        <>
          <Text style={styles.textHeaders}>Опис</Text>
          <Text style={styles.descriptionText}>
            {route.params.projectTask.description}
          </Text>
        </>
        <>
          <Text style={styles.textHeaders}>Статус</Text>
          <View
            style={[
              styles.tatusView,
              {
                backgroundColor:
                  markerColorDueToStatus[
                    route.params.projectTask.taskStatus
                  ][0],
              },
            ]}
          >
            <Text style={styles.tetxInStatusView}>
              {markerColorDueToStatus[route.params.projectTask.taskStatus][1]}
            </Text>
          </View>
        </>
        {route.params.projectTask.showToClient && (
          <Text style={styles.bottomText}>* Клієнт не бачить це завдання</Text>
        )}
        <PermissionCheck permissionsToBeVisible={[11]}>
          <View style={styles.settingsView}>
            <TouchableOpacity
              style={styles.settingsButton}
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate("EditProjectTaskScreen", {
                  projectTask: route.params.projectTask,
                  project: route.params.project,
                })
              }
            >
              <Image
                source={require("@assets/images/settingsIconWhite.png")}
                style={styles.settingsImage}
              />
            </TouchableOpacity>
          </View>
        </PermissionCheck>
      </View>
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
  main: {
    alignSelf: "center",
    marginTop: 120,
    width: 350,
    height: 300,
    backgroundColor: "#444444",
    borderRadius: 24,
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  nameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
    width: "70%",
  },
  textHeaders: {
    marginTop: 25,
    color: "#5EC396",
    fontSize: 18,
  },
  descriptionText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 5,
    maxHeight: 80,
  },
  tatusView: {
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 26,
    width: 120,
    paddingHorizontal: 18,
  },
  tetxInStatusView: {
    color: "#fff",
    fontSize: 17,
  },
  bottomText: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 0,
    color: "#fff",
  },
  settingsView: {
    position: "absolute",
    bottom: -16,
    right: -16,
  },
  settingsButton: {
    backgroundColor: "#5EC396",
    width: 50,
    height: 50,
    borderRadius: 14,
    padding: 13,
  },
  settingsImage: {
    width: "auto",
    height: 26,
  },
});

export default SingleProjectTaskScreen;
