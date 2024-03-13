import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import PersonDeleteComponent from "../../../../components/app/home/person/PersonDeleteComponent";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import { requestToGetAllPersones } from "../../../../services/api/PersonApiService";
import { requestToGetAllRoles } from "../../../../services/api/RoleApiService";
import { PersonProps, RoleProps } from "../../../../types/Types";

export default function PersonScreen({ navigation }: any) {
  const [allPersons, setAllPersons] = useState<PersonProps[] | null>(null);
  const [allRoles, setAllRoles] = useState<RoleProps[] | null>(null);

  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  function getTotalPermissions(roleName: string) {
    const role = allRoles?.find((role) => role.name === roleName);
    return role ? role.permissions.length : 0;
  }

  const sortedPersons =
    allPersons !== null
      ? [...allPersons].sort(
          (person1, person2) =>
            getTotalPermissions(person1.role) -
            getTotalPermissions(person2.role)
        )
      : [];
  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllPersones,
        setData: setAllPersons,
        setIsDataRequestProcessed,
      });

      focusEffectToGetData({
        request: requestToGetAllRoles,
        setData: setAllRoles,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <PermissionCheck permissionsToBeVisible={[1]}>
        <TouchableOpacity
          style={styles.newPersonButton}
          onPress={() => {
            navigation.navigate("AddPersonNameScreen");
          }}
        >
          <Text style={styles.newPersonButtonText}>додати людину</Text>
          <Image
            source={require("@assets/images/addIcon.png")}
            style={styles.newPersonButtonImage}
          />
        </TouchableOpacity>
      </PermissionCheck>
      <PermissionCheck permissionsToBeVisible={[5]}>
        <Text style={styles.deleteExampleText}>{"<<  видалити"}</Text>
      </PermissionCheck>
      <FlatList
        nestedScrollEnabled={true}
        data={sortedPersons}
        renderItem={({ item }) => {
          return (
            <PersonDeleteComponent
              person={item}
              navigation={navigation}
              setAllPersons={setAllPersons}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      {!isDataRequestProcessed && (
        <Image
          source={require("@assets/gif/buttonLoadingGif.gif")}
          style={{
            width: "100%",
            position: "absolute",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  newPersonButton: {
    marginTop: 45,
    flexDirection: "row",
    alignItems: "center",
    width: 230,
    marginLeft: 30,
  },
  newPersonButtonImage: {
    width: 30,
    height: 30,
  },
  newPersonButtonText: {
    color: "#66C69B",
    fontSize: 20,
    fontWeight: "600",
    marginRight: 7,
    bottom: 2,
  },
  deleteExampleText: {
    color: "#CC4E4E",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 35,
    marginLeft: "auto",
    marginBottom: 10,
  },
});
