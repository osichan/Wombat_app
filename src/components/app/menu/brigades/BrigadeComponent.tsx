import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BrigadeProps } from "../../../../types/Types";

type BrigadeComponentProps = {
  brigade: BrigadeProps;
  navigation: any;
};

export default function BrigadeComponent({
  brigade,
  navigation,
}: BrigadeComponentProps) {
  return (
    <TouchableOpacity
      style={styles.main}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("SingleBrigadeScreen", { brigade: brigade })
      }
    >
      <LinearGradient
        colors={["#4E4E4E", "rgba(78, 78, 78, 0)"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientView}
      >
        <Text style={styles.textName}>{brigade.name}</Text>
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
