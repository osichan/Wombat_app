import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PersonProps } from "../../../../types/Types";
import { RouteProp } from "@react-navigation/native";
import { getDataAsync } from "../../../../storage/Async";
import { COMPANY_DOMAIN_KEY } from "../../../../utils/constants/asyncStorageKeys";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import formatPhoneNumber from "../../../../utils/helpers/formatPhoneNumber";

type PersonInfoScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { person: PersonProps }>, string>;
};

export default function PersonInfoScreen({
  navigation,
  route,
}: PersonInfoScreenProps) {
  const person = route.params.person;
  const [domain, setDomain] = useState("");

  useEffect(() => {
    const getDomain = async () => {
      setDomain(await getDataAsync({ key: COMPANY_DOMAIN_KEY }));
    };
    getDomain();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{ paddingHorizontal: 70, marginBottom: 75 }}>
          <Text
            style={styles.nameText}
          >{`${person.firstName} ${person.lastName}`}</Text>
          <View style={styles.line} />
          <Text style={styles.roleText}>{person.role}</Text>
          <Text style={styles.numberText}>
            {person.phoneNumber
              ? formatPhoneNumber(person.phoneNumber)
              : "номер не записаний"}
          </Text>
          <Text style={styles.emailText}>{person.email}</Text>
        </View>
        <PermissionCheck permissionsToBeVisible={[5]}>
          <TouchableOpacity
            style={styles.goToEditButton}
            onPress={() => navigation.navigate("EditPersonScreen", { person })}
          >
            <Text style={styles.textInGoToEditButton}>
              редагувати дані людини
            </Text>
          </TouchableOpacity>
        </PermissionCheck>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  main: {
    marginTop: 50,
    width: 370,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    paddingTop: 35,
  },
  nameText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  line: {
    height: 1,
    backgroundColor: "#5EC396",
    width: 155,
    left: -10,
  },
  roleText: {
    color: "#5EC396",
    fontSize: 19,
    fontWeight: "600",
    marginTop: 6,
  },
  numberText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 18,
  },
  emailText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 16,
  },
  goToEditButton: {
    height: 60,
    backgroundColor: "#5EC396",
    width: 371,
    left: -1,
    bottom: -1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInGoToEditButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
