import { useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useConnectionAlert } from "../components/ConnectionAlertProvider";
import BlockBackButton from "../components/navigation/BlockBackButton";
import { setUserInfo } from "../redux/reducers/userInfoReducer";
import { requestToCheckDomain } from "../services/api/domainCheck";
import { tokenCheck } from "../services/api/tokenCheck";
import { getDataAsync, saveDataAsync } from "../storage/Async";
import {
  COMPANY_DOMAIN_KEY,
  USER_TOKEN_KEY,
} from "../utils/constants/asyncStorageKeys";

export default function Loading({ navigation }: any) {
  const { setConnectionStatus } = useConnectionAlert();
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("@assets/fonts/Roboto-Regular.ttf"),
    "Jost-400": require("@assets/fonts/Jost-Regular.ttf"),
    "Jost-600": require("@assets/fonts/Jost-SemiBold.ttf"),
    "Judson-400": require("@assets/fonts/Judson-Regular.ttf"),
    "Montserrat-600": require("@assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const handleToResend = () => {
    setTimeout(() => {
      fetchData();
    }, 3000);
  };

  const waitBeforeNavigation = async (whereToNavigate: string) => {
    setTimeout(() => {
      navigation.navigate(whereToNavigate);
    }, 1000);
  };

  const fetchData = async () => {
    if ((await requestToCheckDomain()) === false) {
      await AsyncStorage.clear();
      await waitBeforeNavigation("AuthNavigator");
    }

    if (await getDataAsync({ key: USER_TOKEN_KEY })) {
      const userInfo = await tokenCheck();

      if (userInfo && typeof userInfo !== "boolean") {
        dispatch(setUserInfo(userInfo));
        if (await getDataAsync({ key: COMPANY_DOMAIN_KEY })) {
          await saveDataAsync({
            key: COMPANY_DOMAIN_KEY,
            data: userInfo.email.split("@")[1],
          });
        }
        await waitBeforeNavigation("AppTabNavigator");
      } else if (userInfo === null) {
        setConnectionStatus(false, "Не вдалось отримати дані");
        handleToResend();
      } else {
        await AsyncStorage.clear();
        await waitBeforeNavigation("AuthNavigator");
      }
    } else {
      await AsyncStorage.clear();
      await waitBeforeNavigation("AuthNavigator");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  BlockBackButton();

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/images/wombatLogo.png")}
        style={styles.logoImage}
      />
      <Image
        source={require("@assets/gif/loadingGif.gif")}
        style={styles.gif}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    height: 115,
    width: 200,
    bottom: 180,
  },
  gif: {
    height: 174,
    width: 174,
    position: "absolute",
  },
  errorText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 28,
  },
});
