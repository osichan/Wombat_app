import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

type ConnectionAlertProps = {
  text: string;
  visible: boolean;
  setConnectionStatus: (status: boolean, alertText?: string) => void;
};

export default function ConnectionAlert({
  text,
  visible,
  setConnectionStatus,
}: ConnectionAlertProps) {
  return (
    <Modal visible={!visible} transparent animationType="none">
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.headText}>Погане підключення до мережі</Text>
          <Text style={styles.secondaryText}>{text}</Text>
          <Image
            source={require("@assets/images/connectionIcon.png")}
            style={{
              width: 65,
              height: 65,
              alignSelf: "center",
              marginTop: 16,
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setConnectionStatus(true)}
          >
            <Text style={styles.textInButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    height: "100%",
    width: "100%",
  },
  messageContainer: {
    height: 211,
    width: 340,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#CC4E4E",
    borderWidth: 4,
  },
  headText: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 32,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#CC4E4E",
    fontSize: 16,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#CC4E4E",
    width: 63,
    height: 50,
    position: "absolute",
    right: 17,
    bottom: 17,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
