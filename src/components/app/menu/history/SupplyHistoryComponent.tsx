import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  ToolHistoryProps,
  ConsumableHistoryProps,
} from "../../../../types/Types";

type SupplyHistoryComponentProps =
  | {
      history: ToolHistoryProps;
      type: "T";
    }
  | {
      history: ConsumableHistoryProps;
      type: "C";
    };

const STATUS_TO_COLOR_TEXT = {
  Взято: ["#D75555", "Взяли"],
  Додано: ["#5CBA90", "Додали"],
  Повернено: ["#D7A355", "Повернули"],
  Витрачено: ["#fff", "Витратили"],
};

export default function SupplyHistoryComponent({
  history,
  type,
}: SupplyHistoryComponentProps) {
  return (
    <View style={styles.card}>
      <View style={styles.sideView}>
        <Text
          style={[
            styles.statusText,
            { color: STATUS_TO_COLOR_TEXT[history.status][0] },
          ]}
        >
          {history.status === "Додано" && type === "T"
            ? "Створили"
            : STATUS_TO_COLOR_TEXT[history.status][1]}
        </Text>
        <Text style={styles.nameText}>{history.relatedObject.name}</Text>
        <Text style={styles.currentlyAtText}>
          {history.status === "Взято" &&
            (history.relatedObject.currentlyAt.type === "OP"
              ? history.relatedObject.currentlyAt.data.project.name
              : history.relatedObject.currentlyAt.data)}
        </Text>
        <Text style={styles.quantityText}>
          {type === "C" && history.relatedObject.unitQuantity}
        </Text>
      </View>
      <View style={[styles.sideView, { alignItems: "flex-end" }]}>
        <Text style={styles.dateText}>{history.timestamp}</Text>
        <Text style={styles.causedByText}>{history.causedBy}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 367,
    height: 110,
    marginTop: 16,
    backgroundColor: "#313131",
    alignSelf: "center",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
  },
  sideView: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  nameText: {
    marginTop: 3,
    fontSize: 19,
    color: "#fff",
    fontWeight: "600",
  },
  currentlyAtText: {
    color: "#FFFFFFA6",
  },
  quantityText: {
    color: "#FFFFFFA6",
    marginTop: "auto",
    marginBottom: 0,
  },
  dateText: {
    color: "#FFFFFFCC",
  },
  causedByText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: "auto",
    marginBottom: 0,
  },
});
