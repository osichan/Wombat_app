import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProjectProps } from "../../../types/Types";

type ProjectComponentProps = {
  project: ProjectProps;
  navigation: any;
};

export default function ProjectComponent({
  project,
  navigation,
}: ProjectComponentProps) {
  return (
    <TouchableOpacity
      style={styles.main}
      activeOpacity={0.7}
      onPress={() => navigation.navigate("ProjectScreen", { project: project })}
    >
      <LinearGradient
        colors={["#4E4E4E", "rgba(78, 78, 78, 0)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientView}
      >
        <Text style={styles.textName}>{project.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 370,
    height: 86,
    marginTop: 2,
    alignSelf: "center",
    zIndex: 2,
    justifyContent: "center",
  },
  gradientView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#313131",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    color: "#5EC396",
    fontSize: 28,
    fontWeight: "400",
  },
});
