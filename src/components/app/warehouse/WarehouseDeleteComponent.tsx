import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  requestToDeleteWarehouse,
  requestToGetAllWareHouses,
} from "../../../services/api/WarehouseApiService";
import { WarehouseProps } from "../../../types/Types";
import { usePanResponder } from "../../../utils/helpers/PanResponderUtils";
import { useConnectionAlert } from "../../ConnectionAlertProvider";
import ActionConfirmation from "../ActionConfirmation";
import PermissionCheck from "../PermissionCheck";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../../redux/reducers/userInfoReducer";

type WarehouseDeleteComponentProps = {
  warehouse: WarehouseProps;
  navigation: any;
  isEditMode: boolean;
  setAllWarehouses: React.Dispatch<
    React.SetStateAction<WarehouseProps[] | null>
  >;
};

export default function WarehouseDeleteComponent({
  warehouse,
  navigation,
  isEditMode,
  setAllWarehouses,
}: WarehouseDeleteComponentProps) {
  const userPermissions = useSelector(selectUserInfo)?.permissionIds;
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { pan, panResponder } = usePanResponder(setIsConfirmationVisible);
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);

  const { setConnectionStatus } = useConnectionAlert();

  const handleToDelete = async () => {
    setIsRequestProcesed(false);
    const result = await requestToDeleteWarehouse(warehouse);
    const allWarehouses = await requestToGetAllWareHouses();
    setIsRequestProcesed(true);
    setIsConfirmationVisible(false);
    if (result) {
      Animated.spring(pan, {
        toValue: { x: -1000, y: 0 },
        useNativeDriver: false,
      }).start(() => setAllWarehouses(allWarehouses));
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      true;
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
  };
  const handleCancle = () => {
    setIsConfirmationVisible(false);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const deleteLineBackgroundColor = pan.x.interpolate({
    inputRange: [-200, 0],
    outputRange: ["#CC4E4E", "#313131"],
    extrapolate: "clamp",
  });
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <PermissionCheck
          permissionsToBeVisible={[20, 24]}
          elseChildren={
            <View style={styles.animatedMain}>
              <LinearGradient
                colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.95, y: 1 }}
                style={styles.mainView}
              >
                <Text style={styles.textName}>{warehouse.name}</Text>
                <Text style={styles.textAddress}>{warehouse.address}</Text>
                <Text style={styles.textDescription}>
                  {warehouse.description}
                </Text>
              </LinearGradient>
            </View>
          }
        >
          <Animated.View
            style={[pan.getLayout(), styles.animatedMain]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={() =>
                userPermissions.includes(24)
                  ? navigation.navigate("SupplyInWarehouseTabNavigator", {
                      screen: "ToolsInWarehouseScreen",
                      warehouse: warehouse,
                      params: {
                        warehouse: warehouse,
                      },
                    })
                  : navigation.navigate("SupplyInWarehouseTabNavigator", {
                      screen: "ConsumablesInWarehousScreen",
                      warehouse: warehouse,
                      params: {
                        warehouse: warehouse,
                      },
                    })
              }
            >
              <LinearGradient
                colors={["#4E4E4E", "rgba(78, 78, 78, 0.1)"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.95, y: 1 }}
                style={styles.mainView}
              >
                <Text style={styles.textName}>{warehouse.name}</Text>
                <Text style={styles.textAddress}>{warehouse.address}</Text>
                <Text style={styles.textDescription}>
                  {warehouse.description}
                </Text>
                {isEditMode && (
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      navigation.navigate("EditWarehouseScreen", {
                        warehouse: warehouse,
                      });
                    }}
                  >
                    <Image
                      source={require("@assets/images/editIcon.png")}
                      style={{ height: 30, width: 30 }}
                    />
                  </TouchableOpacity>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[
              styles.deleteLine,
              {
                backgroundColor: deleteLineBackgroundColor,
                transform: [{ translateX: pan.x }],
              },
            ]}
          >
            <Text style={styles.deleteLineText}>видалити</Text>
          </Animated.View>
        </PermissionCheck>
      </View>

      <ActionConfirmation
        text="Впевнені, що хочете видалити"
        visible={isConfirmationVisible}
        nameOfItem={warehouse.name}
        isProcessed={isRequestProcesed}
        handleCancle={() => handleCancle()}
        handleDelete={() => handleToDelete()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  animatedMain: {
    width: 370,
    minHeight: 220,
    marginTop: 10,
    alignSelf: "center",
    zIndex: 2,
  },
  mainView: {
    width: "100%",
    minHeight: 220,
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingVertical: 28,
    paddingLeft: 36,
    paddingRight: "20%",
  },
  textName: {
    color: "#5EC396",
    fontSize: 28,
    fontWeight: "600",
    maxHeight: 80,
  },
  textAddress: {
    marginBottom: 15,
    marginTop: "auto",
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    maxHeight: 80,
  },
  textDescription: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    maxHeight: 80,
  },
  editButton: {
    position: "absolute",
    bottom: 23,
    right: 18,
  },
  deleteLine: {
    width: 400,
    height: 220,
    top: 10,
    right: -355,
    zIndex: 1,
    justifyContent: "center",
    position: "absolute",
  },
  deleteLineText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 70,
  },
});
