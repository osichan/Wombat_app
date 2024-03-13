import React from "react";
import { View, StyleSheet, Text } from "react-native";
import NavigationButton from "../../components/navigation/NavigationButton";
import BlockBackButton from "../../components/navigation/BlockBackButton";

export default function ChooseScreen({ navigation }: any) {
  BlockBackButton();

  return (
    <>
      <View style={styles.container}>
        <NavigationButton
          navigation={navigation}
          whereToNavigate="CompanyRegistration"
          style={[styles.button, { backgroundColor: "#5EC396" }]}
        >
          <Text style={styles.textInButton}>Зареєструвати компанію</Text>
        </NavigationButton>
        <NavigationButton
          navigation={navigation}
          whereToNavigate="SignIn"
          style={[styles.button, { backgroundColor: "#313131", marginTop: 27 }]}
        >
          <Text style={styles.textInButton}>Увійти в акаунт</Text>
        </NavigationButton>
      </View>
      <View style={styles.upperBlackCircle} />
      <View style={styles.upperGreenCircle} />
      <View style={styles.lowerBlackCircle} />
      <View style={styles.lowerGreenCircle} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 65,
    width: 300,
    borderRadius: 10,
    justifyContent: "center",
  },
  textInButton: {
    alignSelf: "center",
    color: "#FFFFFF",
    fontFamily: "Judson-400",
    fontSize: 18,
  },
  upperGreenCircle: {
    backgroundColor: "#66C69BE5",
    height: 236,
    width: 242,
    borderRadius: 1000,
    top: -125,
    right: 43,
    position: "absolute",
  },
  upperBlackCircle: {
    backgroundColor: "#313131F2",
    height: 357,
    width: 357,
    borderRadius: 1000,
    top: -125,
    right: -215,
    position: "absolute",
  },
  lowerGreenCircle: {
    backgroundColor: "#66C69BE5",
    height: 357,
    width: 357,
    borderRadius: 1000,
    bottom: -167,
    right: -31,
    position: "absolute",
  },
  lowerBlackCircle: {
    backgroundColor: "#313131F2",
    height: 357,
    width: 357,
    borderRadius: 1000,
    bottom: -164,
    right: 186,
    position: "absolute",
  },
});
