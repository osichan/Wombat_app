import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import PermissionCheck from "../../../PermissionCheck";
import { ConsumableProps } from "../../../../../types/Types";
import ActionConfirmation from "../../../ActionConfirmation";
import { requestToDeleteConsumable } from "../../../../../services/api/ConsumablesApiService";
import { useConnectionAlert } from "../../../../ConnectionAlertProvider";

type ConsumableSettingsButtonProps = {
  navigation: any;
  consumable: ConsumableProps;
};

const ConsumableSettingsButton = ({
  navigation,
  consumable,
}: ConsumableSettingsButtonProps) => {
  const [isDropDownSettingsVisible, setIsDropDownSettingsVisible] =
    useState(false);
  const [isDeleteRequestProcesed, setIsDeleteRequestProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const handleToDelete = async () => {
    setIsDeleteRequestProcesed(false);
    const result = await requestToDeleteConsumable(consumable.id);
    if (result) {
      navigation.goBack();
    } else {
      setConnectionStatus(false, "Не вдалося видалити");
    }
    setIsDeleteRequestProcesed(true);
  };

  return (
    <>
      <PermissionCheck permissionsToBeVisible={[29]}>
        <TouchableOpacity
          style={{ marginRight: 26 }}
          onPress={() =>
            setIsDropDownSettingsVisible(!isDropDownSettingsVisible)
          }
        >
          <Image
            source={require("@assets/images/settingsIcon.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        {isDropDownSettingsVisible && (
          <View style={styles.dropDownContainer}>
            <TouchableOpacity
              style={styles.dropDownComponent}
              onPress={() => {
                navigation.navigate("SpendConsumableScreen", {
                  consumable: consumable,
                });
                setIsDropDownSettingsVisible(false);
              }}
            >
              <Text style={styles.dropDownComponentText}>
                Витратити матеріал
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDeleteConfirmationVisible(true)}
              style={styles.dropDownComponent}
            >
              <Text
                style={[styles.dropDownComponentText, { color: "#CC4E4E" }]}
              >
                Видалити
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </PermissionCheck>
      <ActionConfirmation
        visible={deleteConfirmationVisible}
        handleCancle={() => setDeleteConfirmationVisible(false)}
        handleDelete={() => handleToDelete()}
        nameOfItem={consumable.name}
        isProcessed={isDeleteRequestProcesed}
        text={"Впевнені, що хочете видалити"}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 34,
    height: 30,
  },
  dropDownContainer: {
    width: 150,
    backgroundColor: "#C4C4C4",
    position: "absolute",
    top: 35,
    right: 5,
    borderRadius: 10,
  },
  dropDownComponent: {
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownComponentText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default ConsumableSettingsButton;
