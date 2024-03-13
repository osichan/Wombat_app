import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { MeasurementUnitProps } from "../../../../../types/Types";
import { NavigationProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PermissionCheck from "../../../PermissionCheck";
import ActionConfirmation from "../../../ActionConfirmation";
import { useState } from "react";
import { requestToDeleteMeasurementUnit } from "../../../../../services/api/MeasurementUnitsApiService";
import { useConnectionAlert } from "../../../../ConnectionAlertProvider";

type MeasurementUntsFlatListProps = {
  data: MeasurementUnitProps[];
  navigation: NavigationProp<any, any>;
  getMeasurementUnit: () => {};
};

const MeasurementUnitsFlatList = ({
  data,
  navigation,
  getMeasurementUnit,
}: MeasurementUntsFlatListProps) => {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<MeasurementUnitProps | null>(
    null
  );
  const [isRequestProcessed, setIsrequestProcessed] = useState<boolean>(true);
  const { setConnectionStatus } = useConnectionAlert();

  const handleToDelete = async () => {
    setIsrequestProcessed(false);
    if (
      itemToDelete &&
      (await requestToDeleteMeasurementUnit(itemToDelete?.id))
    ) {
      getMeasurementUnit();
    } else {
      setConnectionStatus(false);
    }
    setIsrequestProcessed(true);
  };

  return (
    <View style={styles.flastList}>
      <FlatList
        nestedScrollEnabled={true}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.itemButton}>
            <Text style={styles.textInButton}>{item.name}</Text>
            <PermissionCheck permissionsToBeVisible={[17]}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  setIsDeleteConfirmationVisible(true);
                  setItemToDelete(item);
                }}
              >
                <Image
                  source={require("@assets/images/trashDeleteIcon.png")}
                  style={styles.imageInDeleteButton}
                />
              </TouchableOpacity>
            </PermissionCheck>
          </View>
        )}
        ListFooterComponent={() => (
          <PermissionCheck permissionsToBeVisible={[17]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddMesurementUnitsScreen")}
              style={[
                styles.itemButton,
                { backgroundColor: "#5EC396", justifyContent: "center" },
              ]}
            >
              <Text style={styles.textInAddButton}>Нова одиниця</Text>
            </TouchableOpacity>
          </PermissionCheck>
        )}
      />
      <ActionConfirmation
        visible={isDeleteConfirmationVisible}
        handleCancle={() => setIsDeleteConfirmationVisible(false)}
        handleDelete={handleToDelete}
        isProcessed={isRequestProcessed}
        text={`Впевнені, що хочете видалити ${
          itemToDelete ? itemToDelete.name : "одиницю вимірювання"
        }`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flastList: {
    justifyContent: "center",
    marginTop: 50,
  },
  itemButton: {
    alignSelf: "center",
    width: 373,
    height: 80,
    backgroundColor: "#313131",
    marginTop: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textInButton: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 40,
  },
  deleteButton: {
    marginRight: 25,
  },
  imageInDeleteButton: {
    width: 35,
    height: 35,
  },
  textInAddButton: {
    fontSize: 22,
    color: "#fff",
  },
});

export default MeasurementUnitsFlatList;
