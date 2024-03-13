import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../../redux/reducers/userInfoReducer";
import formatPhoneNumber from "../../../../utils/helpers/formatPhoneNumber";

const ProfileScreen = ({ navigation }: any) => {
  const profileData = useSelector(selectUserInfo);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.nameText}>
          {profileData.firstName} {profileData.lastName}
        </Text>
        <Text style={styles.roleText}>{profileData.role}</Text>
        <View style={{ marginTop: 15, flexDirection: "row" }}>
          <Text style={styles.emailPhoneText}>E-mail:</Text>
          <Text style={styles.emailPhoneDataText}> {profileData.email}</Text>
        </View>
        <View style={{ marginTop: 8, flexDirection: "row" }}>
          <Text style={styles.emailPhoneText}>Номер:</Text>
          <Text style={styles.emailPhoneDataText}>
            {profileData.phoneNumber
              ? formatPhoneNumber(profileData.phoneNumber)
              : " номер не заданий"}
          </Text>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.phoneChangeButton}
            onPress={() => navigation.navigate("ProfilePhoneChangeScreen")}
          >
            <Text style={styles.textInButtons}>змінити номер</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.passwordChangeButton}
            onPress={() => navigation.navigate("ProfilePasswordChangeScreen")}
          >
            <Text style={styles.textInButtons}>змінити пароль</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  main: {
    height: 215,
    width: 370,
    backgroundColor: "#FFFFFF17",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  buttonsView: {
    height: 60,
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 0,
  },
  phoneChangeButton: {
    flex: 1,
    width: 185,
    backgroundColor: "#6D6B6B",
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordChangeButton: {
    flex: 1,
    width: 185,
    backgroundColor: "#5EC396",
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textInButtons: {
    color: "#fff",
    fontSize: 16,
  },
  nameText: {
    fontSize: 22,
    color: "#fff",
    alignSelf: "center",
    marginTop: 20,
  },
  roleText: {
    fontSize: 15,
    color: "#5EC396",
    alignSelf: "center",
    marginTop: 3,
  },
  emailPhoneText: {
    marginLeft: 18,
    color: "#FFFFFF99",
  },
  emailPhoneDataText: {
    color: "#FFFFFF",
  },
});

export default ProfileScreen;
