import React, { SetStateAction, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SvgAddIcon from "../../../../../assets/svg/SvgAddIcon";
import {
  requestToGetAllRoles,
  requestToLoadDefaultRoles,
} from "../../../../services/api/RoleApiService";
import { useConnectionAlert } from "../../../ConnectionAlertProvider";
import LoadingButton from "../../../LoadingButton";
import { phoneHeight } from "../../../ScreenInfo";
import PermissionCheck from "../../PermissionCheck";
import { NavigationProp } from "@react-navigation/native";
import { RoleProps } from "../../../../types/Types";

type NoRolesViewProps = {
  setAllRoles: React.Dispatch<SetStateAction<RoleProps[] | null>>;
  navigation: NavigationProp<any, any>;
};

export default function NoRolesView({
  setAllRoles,
  navigation,
}: NoRolesViewProps) {
  const [isRolesRecomended, setIsRolesRecomended] = useState(false);
  const [defaultRoles, setDefaultRoles] = useState([
    { name: "Менеджер", token: "manager", choosen: false },
    { name: "Робітник", token: "worker", choosen: false },
    { name: "Водій", token: "driver", choosen: false },
    { name: "Клієнт", token: "client", choosen: false },
  ]);
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const handleRoleToggle = (token: string) => {
    setDefaultRoles((prevRoles) =>
      prevRoles.map((role, _index) =>
        role.token === token ? { ...role, choosen: !role.choosen } : role
      )
    );
  };

  const handleAdd = async () => {
    setIsRequestProcesed(false);
    const selectedRoles: string[] = [];
    defaultRoles.forEach((role) => {
      if (role.choosen) {
        selectedRoles.push(role.token);
      }
    });

    if (await requestToLoadDefaultRoles({ roles: selectedRoles })) {
      const allRoles = await requestToGetAllRoles();
      if (allRoles && typeof allRoles !== "boolean") {
        setAllRoles(allRoles);
      } else {
        setConnectionStatus(false, "Не вдалось загрузити ролі");
      }
    } else {
      setConnectionStatus(false, "Не вдалось створити ролі");
    }
    setIsRequestProcesed(true);
  };

  if (isRolesRecomended) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View style={styles.defaultRolesContainer}>
          <Text style={styles.headerText}>
            Додайте рекомендовані ролі користувачів
          </Text>
          <FlatList
            nestedScrollEnabled={true}
            data={defaultRoles}
            renderItem={({ item }) => {
              return (
                <View style={styles.defaultRolsRow}>
                  <Text style={styles.roleNames}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleRoleToggle(item.token)}
                    style={[
                      styles.checkBox,
                      {
                        backgroundColor: item.choosen
                          ? "#5EC396"
                          : "transparent",
                      },
                    ]}
                  />
                </View>
              );
            }}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5A5A5A", left: -12 }]}
            onPress={() => {
              navigation.navigate("AddRoleScreen");
              setIsRolesRecomended(false);
            }}
          >
            <Text style={styles.textInButton}>Не додавати</Text>
          </TouchableOpacity>
          <LoadingButton
            style={[styles.button, { backgroundColor: "#5EC396", right: -12 }]}
            isProcessed={isRequestProcesed}
            onPress={() => handleAdd()}
          >
            <Text style={styles.textInButton}>Додати</Text>
          </LoadingButton>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.whiteCircle}>
          <PermissionCheck permissionsToBeVisible={[3]}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setIsRolesRecomended(true);
              }}
            >
              <SvgAddIcon
                style={styles.iconInAddButton}
                width={37}
                height={37}
              />
              <Text style={styles.textInAddButton}>додати</Text>
            </TouchableOpacity>
          </PermissionCheck>
          <Text style={[styles.mainText, { right: 80 }]}>Створіть</Text>
          <Text style={[styles.mainText]}>роль</Text>
        </View>
        <View style={styles.greenCircle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  circleContainer: {
    position: "absolute",
    flex: 1,
  },
  whiteCircle: {
    backgroundColor: "#fff",
    height: 400,
    width: 400,
    borderRadius: 1000,
    marginTop: phoneHeight / 2 - 200,
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  greenCircle: {
    backgroundColor: "#5EC396",
    height: 300,
    width: 300,
    borderRadius: 1000,
    marginLeft: 220,
    top: -160,
  },
  addButton: {
    height: 85,
    width: 210,
    borderColor: "#5EC396",
    borderWidth: 5,
    borderRadius: 30,
    flexDirection: "row",
    marginTop: 150,
    marginBottom: "auto",
    position: "absolute",
    bottom: 47,
    left: 20,
  },
  iconInAddButton: {
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  textInAddButton: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 5,
    color: "#5EC396",
    alignSelf: "center",
  },
  mainText: {
    color: "#5EC396",
    fontSize: 40,
    fontWeight: "600",
  },
  defaultRolesContainer: {
    width: 338,
    height: 377,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerText: {
    color: "#5EC396",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  roleNames: {
    color: "#313131",
    fontSize: 20,
    marginLeft: 36,
  },
  checkBox: {
    width: 26,
    height: 26,
    borderColor: "#5EC396",
    borderWidth: 2,
    marginRight: 34,
    marginLeft: "auto",
    borderRadius: 3,
  },
  defaultRolsRow: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
    height: 28,
  },
  button: {
    width: 160,
    height: 54,
    borderRadius: 10,
    position: "absolute",
    bottom: -27,
    justifyContent: "center",
    alignItems: "center",
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
  },
});
