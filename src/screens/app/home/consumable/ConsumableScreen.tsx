import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import ActionConfirmation from "../../../../components/app/ActionConfirmation";
import PermissionCheck from "../../../../components/app/PermissionCheck";
import ConsumableSettingsButton from "../../../../components/app/home/supply/consumables/ConsumableSettingsButton";
import ReturnConsumableComponent from "../../../../components/app/home/supply/consumables/ReturnConsumableComponent";
import TakeConsmableModalComponent from "../../../../components/app/home/supply/consumables/TakeConsumableComponent";
import { requestToDeleteConsumable } from "../../../../services/api/ConsumablesApiService";
import { ConsumableProps } from "../../../../types/Types";

type ConsumableScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { consumable: ConsumableProps }>, string>;
};

export default function ConsumableScreen({
  navigation,
  route,
}: ConsumableScreenProps) {
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const { setConnectionStatus } = useConnectionAlert();
  const [isTakeModalVisible, setIsTakeModalVisible] = useState(false);
  const [isReturnModalVisible, setIsReturnModalVisible] = useState(false);
  const consumable = route.params.consumable;

  const handleToDelete = async () => {
    setIsRequestProcesed(false);
    const result = await requestToDeleteConsumable(consumable.id);
    if (result) {
      navigation.goBack();
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      true;
    }
    setIsRequestProcesed(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.nameText}>{consumable.name}</Text>
        <Text style={styles.descriptionText}>{consumable.description}</Text>
        <Text style={styles.unitQuantityText}>
          {`${consumable.unitQuantity} ${consumable.measuredBy}`}
        </Text>
        {consumable.currentlyAt.type === "WH" ||
        consumable.currentlyAt.type === "SS" ? (
          <Text style={styles.currenlyAtText}>
            {consumable.currentlyAt.data}
          </Text>
        ) : (
          consumable.currentlyAt?.type === "OP" && (
            <>
              <Text style={styles.currenlyAtText}>
                {consumable.currentlyAt.data.project.name}
              </Text>
              <Text style={styles.currenlyAtText}>
                {consumable.currentlyAt.data.owner.name}
              </Text>
            </>
          )
        )}
        <PermissionCheck permissionsToBeVisible={[21]}>
          <View style={styles.settingsButton}>
            <ConsumableSettingsButton
              navigation={navigation}
              consumable={route.params.consumable}
            />
          </View>
        </PermissionCheck>
        <PermissionCheck permissionsToBeVisible={[21]}>
          <TouchableOpacity
            style={styles.addConsumableButton}
            onPress={() =>
              navigation.navigate("AddConsumableScreen", {
                consumable: consumable,
              })
            }
          >
            <Text style={styles.takeButtonText}>додати матеріал</Text>
          </TouchableOpacity>
        </PermissionCheck>
        <PermissionCheck permissionsToBeVisible={[22]}>
          <TouchableOpacity
            style={styles.takeButton}
            onPress={() =>
              consumable.currentlyAt.type === "WH"
                ? setIsTakeModalVisible(!isTakeModalVisible)
                : setIsReturnModalVisible(!isReturnModalVisible)
            }
          >
            <Text style={styles.takeButtonText}>
              {consumable.currentlyAt.type === "WH"
                ? "взяти матеріал"
                : "повернути матеріал"}
            </Text>
          </TouchableOpacity>
        </PermissionCheck>
      </View>
      <TakeConsmableModalComponent
        isTakeConsumableModalVisible={isTakeModalVisible}
        setIsTakeConsumableModalVisible={setIsTakeModalVisible}
        consumable={consumable}
        navigation={navigation}
      />
      <ReturnConsumableComponent
        isReturnConsumableModalVisible={isReturnModalVisible}
        setIsReturnConsumableModalVisible={setIsReturnModalVisible}
        consumable={consumable}
        navigation={navigation}
      />

      <ActionConfirmation
        text="Впевнені, що хочете видалити"
        visible={isConfirmationVisible}
        nameOfItem={consumable.name}
        isProcessed={isRequestProcesed}
        handleCancle={() => setIsConfirmationVisible(false)}
        handleDelete={() => handleToDelete()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  main: {
    width: 373,
    backgroundColor: "#313131",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
    marginBottom: 100,
    borderRadius: 10,
  },
  nameText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    width: "70%",
  },
  descriptionText: {
    color: "#808080",
    fontSize: 16,
    maxHeight: 80,
  },
  settingsButton: {
    position: "absolute",
    right: 11,
    top: 20,
    zIndex: 3,
  },
  settingsImage: {
    width: 30,
    height: 30,
  },
  takeButton: {
    backgroundColor: "#5EC396",
    borderRadius: 10,
    width: "50%",
    height: 55,
    position: "absolute",
    right: -10,
    bottom: -32,
    alignItems: "center",
    justifyContent: "center",
  },
  takeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  unitQuantityText: {
    color: "#5EC396",
    fontSize: 21,
    fontWeight: "600",
  },
  currenlyAtText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  addConsumableButton: {
    backgroundColor: "#5A5A5A",
    borderRadius: 10,
    width: "50%",
    height: 55,
    position: "absolute",
    left: -10,
    bottom: -32,
    alignItems: "center",
    justifyContent: "center",
  },
});
