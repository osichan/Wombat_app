import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useConnectionAlert } from "../../../../../components/ConnectionAlertProvider";
import ActionConfirmation from "../../../../../components/app/ActionConfirmation";
import PermissionCheck from "../../../../../components/app/PermissionCheck";
import SupplyCategoryComponent from "../../../../../components/app/menu/category/SupplyCategoryComponent";
import { requestToDeleteConsumableUnit } from "../../../../../services/api/ConsumableUnitApiService";
import { requestToGetAllConsumables } from "../../../../../services/api/ConsumablesApiService";
import {
  ConsumableProps,
  ConsumableUnitProps,
} from "../../../../../types/Types";

type ConsumableInUnitScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { unit: ConsumableUnitProps }>, string>;
};

export default function ConsumableInUnitScreen({
  navigation,
  route,
}: ConsumableInUnitScreenProps) {
  const unit = route.params.unit;
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const { setConnectionStatus } = useConnectionAlert();

  const handleToDelete = async () => {
    setIsRequestProcesed(false);
    const result = await requestToDeleteConsumableUnit(unit.id);
    if (result) {
      navigation.goBack();
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
    }
    setIsRequestProcesed(true);
  };

  const [consumables, SetConsumables] = useState<ConsumableProps[]>([]);

  const getConsumables = async () => {
    const result = await requestToGetAllConsumables();
    if (result && typeof result != "boolean") {
      SetConsumables(
        result.filter((consumable) => consumable.name === unit.name)
      );
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getConsumables();
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.nameText}>{unit.name}</Text>
        <Text style={styles.descriptionText}>{unit.description}</Text>
        <PermissionCheck permissionsToBeVisible={[19]}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() =>
              navigation.navigate("EditConsumableUnitScreen", {
                unit: route.params.unit,
              })
            }
          >
            <Image
              source={require("@assets/images/settingsIcon.png")}
              style={styles.settingsImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setIsConfirmationVisible(true)}
          >
            <Image
              source={require("@assets/images/trashDeleteIcon.png")}
              style={styles.deleteImage}
            />
          </TouchableOpacity>
        </PermissionCheck>
        <PermissionCheck permissionsToBeVisible={[21]}>
          <TouchableOpacity
            style={styles.addConsumableButton}
            onPress={() =>
              navigation.navigate("AddConsumableScreen", {
                unit: unit,
              })
            }
          >
            <Text style={styles.takeButtonText}>додати матеріал</Text>
          </TouchableOpacity>
        </PermissionCheck>
      </View>
      <PermissionCheck permissionsToBeVisible={[20]}>
        <FlatList
          nestedScrollEnabled={true}
          data={consumables}
          renderItem={({ item }) => {
            return (
              <SupplyCategoryComponent supply={item} navigation={navigation} />
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </PermissionCheck>
      <ActionConfirmation
        text="Впевнені, що хочете видалити"
        visible={isConfirmationVisible}
        nameOfItem={unit.name}
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
    flex: 1,
  },
  main: {
    width: 373,
    marginTop: 40,
    backgroundColor: "#313131",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
    marginBottom: 70,
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
  },
  settingsImage: {
    width: 30,
    height: 30,
  },
  deleteButton: {
    position: "absolute",
    right: 57,
    top: 18,
  },
  deleteImage: {
    width: 33,
    height: 33,
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
    marginTop: 20,
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
