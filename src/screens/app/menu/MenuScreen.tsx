import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ActionConfirmation from "../../../components/app/ActionConfirmation";
import PermissionCheck from "../../../components/app/PermissionCheck";
import MenuButton from "../../../components/app/menu/MenuButton";
import {
  removeUserInfo,
  selectUserInfo,
} from "../../../redux/reducers/userInfoReducer";

export default function MenuScreen({ navigation }: any) {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleToLogOut = async () => {
    setIsRequestProcesed(false);
    await AsyncStorage.clear();
    dispatch(removeUserInfo());
    setIsRequestProcesed(true);
    navigation.navigate("Loading");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@assets/images/wombatBigLogo.jpg")}
          style={styles.image}
        />
        <Text style={styles.headerText}>{userInfo?.role}</Text>
      </View>
      <LinearGradient
        colors={["#343434", "rgba(2, 2, 2, 0.70)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0.8 }}
        style={styles.gradient}
      >
        <ScrollView>
          <PermissionCheck permissionsToBeVisible={[2]}>
            <MenuButton
              text="Налаштування ролей"
              onPress={() => navigation.navigate("RoleStack")}
              marginTop={40}
            />
          </PermissionCheck>
          <PermissionCheck permissionsToBeVisible={[30]}>
            <MenuButton
              text="Журнал використання"
              onPress={() => navigation.navigate("SupplyHistoryNavigator")}
            />
          </PermissionCheck>
          <PermissionCheck permissionsToBeVisible={[28]}>
            <MenuButton
              text="Категорії інвентаря"
              onPress={() => navigation.navigate("SupplyCategoriyStack")}
            />
          </PermissionCheck>
          <PermissionCheck permissionsToBeVisible={[6]}>
            <MenuButton
              text="Бригади"
              onPress={() => navigation.navigate("BrigadesStackNavigator")}
            />
          </PermissionCheck>

          <PermissionCheck permissionsToBeVisible={[14]}>
            <MenuButton
              text="Спеціальні статуси"
              onPress={() => navigation.navigate("SpecialStatusStackNavigator")}
            />
          </PermissionCheck>
          <MenuButton
            source={require("@assets/images/userIcon.png")}
            text="Мій акаунт"
            onPress={() => navigation.navigate("ProfileStackNavigator")}
            marginTop={60}
          />
          <View style={styles.line} />
          <MenuButton
            source={require("@assets/images/logOutIcon.png")}
            text="Вийти"
            onPress={() => setIsConfirmationVisible(true)}
            marginTop={0}
            marginBottom={20}
          />
        </ScrollView>
      </LinearGradient>
      <ActionConfirmation
        text="Впевнені, що хочете вийти"
        visible={isConfirmationVisible}
        buttonText="Вийти"
        nameOfItem=""
        isProcessed={isRequestProcesed}
        handleCancle={() => setIsConfirmationVisible(false)}
        handleDelete={() => handleToLogOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "#353535",
    zIndex: 1,
    flex: 1,
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 6,
    borderTopLeftRadius: 90,
  },
  line: {
    backgroundColor: "#313131",
    height: 1,
    width: "100%",
    marginVertical: 30,
  },
  image: {
    width: 125,
    height: 125,
  },
  headerText: {
    color: "#80CFAD",
    fontSize: 26,
    marginTop: 10,
    fontWeight: "600",
  },
});
