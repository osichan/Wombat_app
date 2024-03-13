import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type AddConsumableTypeChooseProps = {
  choosenType: "WH" | "SS" | "OP";
  setChoosenType: React.Dispatch<React.SetStateAction<"WH" | "SS" | "OP">>;
};

const AddConsumableTypeChoose = ({
  choosenType,
  setChoosenType,
}: AddConsumableTypeChooseProps) => {
  return (
    <View style={[styles.chooseWhereToTakeType]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.warehouseTypeButton,
          choosenType === "WH" && { backgroundColor: "#5A5A5A" },
        ]}
        onPress={() => {
          setChoosenType("WH");
        }}
      >
        <Text
          style={[
            styles.typeButtonText,
            choosenType === "WH" && { color: "#fff" },
          ]}
        >
          Склад
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.projectTypeButton,
          choosenType === "OP" && { backgroundColor: "#5A5A5A" },
        ]}
        onPress={() => {
          setChoosenType("OP");
        }}
      >
        <Text
          style={[
            styles.typeButtonText,
            choosenType === "OP" && { color: "#fff" },
          ]}
        >
          Обʼєкт
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.specialStatusTypeButton,
          choosenType === "SS" && { backgroundColor: "#5A5A5A" },
        ]}
        onPress={() => {
          setChoosenType("SS");
        }}
      >
        <Text
          style={[
            styles.typeButtonText,
            choosenType === "SS" && { color: "#fff" },
          ]}
        >
          Спец. статус
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chooseWhereToTakeType: {
    width: 300,
    height: 30,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  warehouseTypeButton: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  projectTypeButton: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  specialStatusTypeButton: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  typeButtonText: {
    color: "rgba(90, 90, 90, 0.70)",
    fontSize: 17,
  },
});
export default AddConsumableTypeChoose;
