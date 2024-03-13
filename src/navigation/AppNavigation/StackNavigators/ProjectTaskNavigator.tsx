import React from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import ProjectTasksScreen from "../../../screens/app/project/projectTasks/ProjectTasksScreen";
import SingleProjectTaskScreen from "../../../screens/app/project/projectTasks/SingleProjectTaskScreen";
import EditProjectTaskScreen from "../../../screens/app/project/projectTasks/EditProjectTaskScreen";
import { ProjectProps, ProjectTaskProps } from "../../../types/Types";

const Stack = createStackNavigator();

const ProjectTaskScreenStack =
  createStackNavigator<ProjectTaskScreenParamListBase>();
const SingleProjectTaskScreenStack =
  createStackNavigator<SingleProjectTaskScreenParamListBase>();
const EditProjectTaskScreenStack =
  createStackNavigator<EditProjectTaskScreenParamListBase>();

type ProjectTaskScreenParamListBase = {
  ProjectTasksScreen: { project: ProjectProps };
};
type SingleProjectTaskScreenParamListBase = {
  SingleProjectTaskScreen: {
    projectTask: ProjectTaskProps;
    project: ProjectProps;
  };
};
type EditProjectTaskScreenParamListBase = {
  EditProjectTaskScreen: {
    projectTask: ProjectTaskProps;
    project: ProjectProps;
  };
};

export default function ProjectTaskNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 60,
        headerBackgroundContainerStyle: {
          backgroundColor: "#313131",
          alignItems: "center",
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 28,
          fontWeight: "600",
        },
        headerTitleAlign: "center",
        headerBackImage: () => (
          <Image
            source={require("@assets/images/whiteBackButtonIcon.png")}
            style={{
              width: 33,
              height: 33,
            }}
          />
        ),
      }}
    >
      <ProjectTaskScreenStack.Screen
        name="ProjectTasksScreen"
        component={ProjectTasksScreen}
        options={{
          animationEnabled: false,
          title: "Прогрес обʼєкту",
        }}
      />
      <SingleProjectTaskScreenStack.Screen
        name="SingleProjectTaskScreen"
        component={SingleProjectTaskScreen}
        options={{
          animationEnabled: false,
          title: "",
        }}
      />
      <EditProjectTaskScreenStack.Screen
        name="EditProjectTaskScreen"
        component={EditProjectTaskScreen}
        options={{
          animationEnabled: false,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
}
