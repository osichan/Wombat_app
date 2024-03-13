import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import LoadingButton from "../LoadingButton";

type ActionConfirmationProps = {
  visible: boolean;
  handleCancle: () => void;
  handleDelete: () => void;
  nameOfItem?: string;
  isProcessed: boolean;
  text: string;
  buttonText?: string;
};

export default function ActionConfirmation({
  visible,
  handleCancle,
  handleDelete,
  nameOfItem,
  isProcessed,
  text,
  buttonText,
}: ActionConfirmationProps) {
  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.messageBackground}>
        <View style={styles.message}>
          <Text style={styles.messageText}>
            {text} {!nameOfItem && "?"}
          </Text>
          <Text style={styles.messageText}>
            {nameOfItem} {nameOfItem && "?"}
          </Text>
          <View style={styles.buttonHolder}>
            <TouchableOpacity
              style={styles.cancleButton}
              onPress={handleCancle}
            >
              <Text style={styles.textInButton}>Скасувати</Text>
            </TouchableOpacity>
            <LoadingButton
              style={styles.deleteButton}
              onPress={handleDelete}
              isProcessed={isProcessed}
            >
              <Text style={styles.textInButton}>
                {buttonText ? buttonText : "Видалити"}
              </Text>
            </LoadingButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  messageBackground: {
    position: "absolute",
    zIndex: 2,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 220,
    width: 370,
    paddingTop: 50,
  },
  messageText: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
  },
  buttonHolder: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: "auto",
    marginBottom: 15,
  },
  cancleButton: {
    borderRadius: 10,
    width: 135,
    height: 50,
    backgroundColor: "#313131CC",
    marginRight: "auto",
    marginLeft: 0,
    justifyContent: "center",
  },
  deleteButton: {
    borderRadius: 10,
    width: 135,
    height: 50,
    backgroundColor: "#CC4E4E",
    marginRight: 0,
    marginLeft: "auto",
    justifyContent: "center",
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "center",
  },
});
