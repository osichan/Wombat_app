import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import SpecialStatusDeleteComponent from "../../../../components/app/warehouse/SpecialStatusDeleteComponent";
import { requestToGetAllStatuses } from "../../../../services/api/SpecialStatusService";
import { SpecialStatusProps } from "../../../../types/Types";

const SpecialStatusesScreen = ({ navigation }: any) => {
  const [allSpecialStatuses, setAllSpecialStatuses] = useState<
    SpecialStatusProps[]
  >([]);
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcessed, setIsRequestProcesed] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const getAllSpecialStatuses = async () => {
    setIsRequestProcesed(false);
    const result = await requestToGetAllStatuses();
    if (result && typeof result !== "boolean") {
      setAllSpecialStatuses(result);
    } else {
      setConnectionStatus(false);
    }
    setIsRequestProcesed(true);
  };
  useFocusEffect(
    useCallback(() => {
      getAllSpecialStatuses();
    }, [])
  );
  if (!isRequestProcessed) {
    return (
      <View style={styles.container}>
        <Image
          source={require("@assets/gif/buttonLoadingGif.gif")}
          style={styles.loadingGif}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {isEditMode ? (
        <>
          <View style={styles.secondHeader}>
            <TouchableOpacity
              onPress={() => {
                setIsEditMode(false);
              }}
              style={{
                position: "absolute",
                left: 0,
              }}
            >
              <Image
                source={require("@assets/images/whiteBackButtonIcon.png")}
                style={styles.imageInSecondHeader}
              />
            </TouchableOpacity>
            <Text style={styles.textInSecondHeader}>Редагування</Text>
          </View>
          <PermissionCheck permissionsToBeVisible={[15]}>
            <Text style={styles.deleteExampleText}>{"<<  видалити"}</Text>
          </PermissionCheck>
        </>
      ) : (
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Усі статуси</Text>

          <PermissionCheck permissionsToBeVisible={[15]}>
            <TouchableOpacity style={styles.buttonInHeader}>
              <Text
                style={styles.textInHeaderButton}
                onPress={() => setIsEditMode(true)}
              >
                {isEditMode ? "вийти з редагування" : "редагувати"}
              </Text>
            </TouchableOpacity>
          </PermissionCheck>
        </View>
      )}
      <FlatList
        nestedScrollEnabled={true}
        data={allSpecialStatuses}
        renderItem={({ item }) => {
          return (
            <SpecialStatusDeleteComponent
              specialStatus={item}
              navigation={navigation}
              isEditMode={isEditMode}
              editId={editId}
              setEditId={setEditId}
              setAllSpecialStatuses={setAllSpecialStatuses}
            />
          );
        }}
        ListHeaderComponent={() => (
          <>
            {isEditMode && (
              <PermissionCheck permissionsToBeVisible={[15]}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate("AddSpecialStatusScreen")}
                >
                  <LinearGradient
                    colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0.95, y: 1 }}
                    style={styles.addButtonGradient}
                  >
                    <Image
                      source={require("@assets/images/addIconGreen.png")}
                      style={styles.imageInAddButton}
                    />
                    <Text style={styles.textName}>додати статус</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </PermissionCheck>
            )}
          </>
        )}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
  },
  loadingGif: {
    width: "100%",
  },
  headerView: {
    marginTop: 150,
    flexDirection: "row",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 34,
    fontWeight: "700",
    marginLeft: 35,
    color: "#fff",
  },
  buttonInHeader: {
    alignSelf: "center",
    marginRight: 28,
    marginLeft: "auto",
  },
  textInHeaderButton: {
    color: "#5EC396",
    fontSize: 18,
    fontWeight: "600",
  },
  iconInAddButton: {
    alignSelf: "center",
  },
  addNewWarehouseButton: {
    height: 45,
    width: 200,
    backgroundColor: "#5EC396",
    alignSelf: "center",
    marginRight: 140,
    marginTop: 37,
    marginBottom: 7,
    borderRadius: 10,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  textInAddNewWarehouseButton: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    top: -2,
  },
  secondHeader: {
    flexDirection: "row",
    marginLeft: 31,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 83,
    marginBottom: 45,
  },
  textInSecondHeader: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },
  imageInSecondHeader: {
    width: 30,
    height: 30,
  },
  deleteExampleText: {
    color: "#CC4E4E",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 25,
    marginLeft: "auto",
    marginTop: -10,
  },
  addButton: {
    width: 370,
    height: 42,
    marginTop: 10,
    alignSelf: "center",
    zIndex: 2,
  },
  addButtonGradient: {
    width: "100%",
    height: "100%",
    backgroundColor: "#313131",
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: 36,
    flexDirection: "row",
  },
  textName: {
    color: "#5EC396",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },
  imageInAddButton: {
    width: 18,
    height: 18,
  },
});

export default SpecialStatusesScreen;
