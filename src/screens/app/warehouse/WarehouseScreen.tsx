import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SvgAddIcon from "../../../../assets/svg/SvgAddIcon";
import { phoneHeight } from "../../../components/ScreenInfo";
import WarehouseDeleteComponent from "../../../components/app/warehouse/WarehouseDeleteComponent";

import { useFocusEffect } from "@react-navigation/native";
import PermissionCheck from "../../../components/app/PermissionCheck";
import focusEffectToGetData from "../../../components/focusEffectToGetData";
import { requestToGetAllWareHouses } from "../../../services/api/WarehouseApiService";
import { WarehouseProps } from "../../../types/Types";

export default function WarehouseScreen({ navigation }: any) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseProps[] | null>(
    null
  );
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllWareHouses,
        setData: setAllWarehouses,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  if (allWarehouses === null || allWarehouses.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Усі склади</Text>
        </View>
        <View style={styles.circleContainer}>
          <View style={styles.whiteCircle}>
            <PermissionCheck permissionsToBeVisible={[13]}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  navigation.navigate("AddNewWarehouseScreen");
                }}
              >
                <SvgAddIcon style={styles.iconInAddButton} />
                <Text style={styles.textInAddButton}>створити склад</Text>
              </TouchableOpacity>
            </PermissionCheck>
          </View>
          <View style={styles.greenCircle} />
        </View>

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
          <TouchableOpacity
            style={styles.addNewWarehouseButton}
            onPress={() => {
              navigation.navigate("AddNewWarehouseScreen");
            }}
          >
            <SvgAddIcon
              style={styles.iconInAddButton}
              color={"#fff"}
              width={18}
              height={18}
            />
            <Text style={styles.textInAddNewWarehouseButton}>додати склад</Text>
          </TouchableOpacity>
          <Text style={styles.deleteExampleText}>{"<<  видалити"}</Text>
        </>
      ) : (
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Усі склади</Text>

          <PermissionCheck permissionsToBeVisible={[13]}>
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
        data={allWarehouses}
        renderItem={({ item }) => {
          return (
            <WarehouseDeleteComponent
              warehouse={item}
              navigation={navigation}
              isEditMode={isEditMode}
              setAllWarehouses={setAllWarehouses}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
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
    marginLeft: 110,
    justifyContent: "center",
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
    width: 290,
    borderColor: "#5EC396",
    borderWidth: 6,
    borderRadius: 30,
    flexDirection: "row",
    marginTop: 150,
    marginBottom: "auto",
    left: -16,
  },
  iconInAddButton: {
    alignSelf: "center",
  },
  textInAddButton: {
    fontSize: 30,
    fontWeight: "600",
    color: "#5EC396",
    marginLeft: "auto",
    alignSelf: "center",
  },
  mainView: {
    width: 370,
    height: 220,
    backgroundColor: "#313131",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: 28,
    paddingLeft: 36,
    paddingRight: "20%",
  },
  textName: {
    color: "#5EC396",
    fontSize: 28,
    fontWeight: "600",
  },
  textAddress: {
    marginBottom: 15,
    marginTop: "auto",
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  textDescription: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  deleteButton: {
    position: "absolute",
    top: 15,
    right: 18,
  },
  textInDeleteButton: {
    color: "#CC4E4E",
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    position: "absolute",
    bottom: 23,
    right: 18,
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
});
