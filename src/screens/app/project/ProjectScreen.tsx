import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProjectProps } from "../../../types/Types";
import { RouteProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PermissionCheck from "../../../components/app/PermissionCheck";
import ScrollViewEditing from "../../../components/ScrollViewEditing";

type ProjectScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { project: ProjectProps }>, string>;
};

const ProjectScreen = ({ navigation, route }: ProjectScreenProps) => {
  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main}>
          <Text style={styles.nameText}>{route.params.project.name}</Text>
          <Text style={styles.addressText}>{route.params.project.address}</Text>
          <Text style={styles.headerText}>клієнт</Text>
          <View style={styles.clientsView}>
            <Text style={styles.clientNameText}>
              {route.params.project.client?.fullName}
            </Text>
          </View>
          <Text style={styles.headerText}>відповідальний за обʼєкт</Text>
          <View style={styles.managersView}>
            <View style={styles.managerView}>
              <Text style={styles.clientNameText}>
                {route.params.project.manager.fullName}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text
              style={[styles.headerText, { textDecorationLine: "underline" }]}
              onPress={() =>
                navigation.navigate("ProjectNotesScreen", {
                  project: route.params.project,
                })
              }
            >
              нотатки по обʼєкту
            </Text>
          </TouchableOpacity>
          <PermissionCheck permissionsToBeVisible={[10]}>
            <TouchableOpacity
              style={styles.progressButton}
              activeOpacity={0.55}
              onPress={() =>
                navigation.navigate("ProjectTaskNavigator", {
                  screen: "ProjectTasksScreen",
                  params: {
                    project: route.params.project,
                  },
                })
              }
            >
              <Text style={styles.progressButtonText}>Прогрес проекту</Text>
            </TouchableOpacity>
          </PermissionCheck>
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
  main: {
    paddingHorizontal: 55,
    paddingTop: 55,
  },
  nameText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "600",
    width: "70%",
  },
  addressText: {
    color: "#808080",
    fontSize: 20,
  },
  headerText: {
    marginTop: 25,
    color: "#5EC396",
    fontSize: 16,
  },
  clientsView: {
    height: 70,
  },
  clientNameText: {
    marginTop: 7,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  managersView: {
    height: 160,
    padding: 10,
  },
  managerView: {
    width: 189,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#515151",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    marginBottom: 18,
  },
  progressButton: {
    height: 50,
    marginTop: 40,
    backgroundColor: "#444444",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#5EC396",
    justifyContent: "center",
    alignItems: "center",
  },
  progressButtonText: {
    color: "#5EC396",
    fontSize: 20,
  },
});

export default ProjectScreen;
