import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import NoRoleView from "../../../../components/app/menu/role/NoRolesView";
import RoleDeleteComponent from "../../../../components/app/menu/role/RoleDeleteComponent";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import { requestToGetAllRoles } from "../../../../services/api/RoleApiService";
import { RoleProps } from "../../../../types/Types";

export default function RoleScreen({ navigation }: any) {
  const [editId, setEditId] = useState<number | null>(null);
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const [allRoles, setAllRoles] = useState<RoleProps[] | null>(null);
  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllRoles,
        setData: setAllRoles,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  if (allRoles === null || allRoles.length === 1) {
    return <NoRoleView navigation={navigation} setAllRoles={setAllRoles} />;
  }
  return (
    <View style={styles.container}>
      <PermissionCheck permissionsToBeVisible={[3]}>
        <TouchableOpacity
          style={styles.newRoleButton}
          onPress={() => {
            navigation.navigate("AddRoleScreen");
          }}
        >
          <Text style={styles.newRoleButtonText}>створити нову роль</Text>
          <Image
            source={require("@assets/images/addIcon.png")}
            style={styles.newRoleButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.deleteExampleText}>{"<<  видалити"}</Text>
      </PermissionCheck>
      <FlatList
        nestedScrollEnabled={true}
        data={allRoles}
        renderItem={({ item }) => {
          if (item.name === "Власник") {
            return null;
          }
          return (
            <RoleDeleteComponent
              role={item}
              editId={editId}
              setEditId={setEditId}
              setAllRoles={setAllRoles}
              navigation={navigation}
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

  newRoleButton: {
    marginTop: 45,
    flexDirection: "row",
    alignItems: "center",
    width: 230,
    marginLeft: 20,
  },
  newRoleButtonImage: {
    width: 30,
    height: 30,
  },
  newRoleButtonText: {
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
    marginRight: 25,
    marginLeft: "auto",
  },
});
