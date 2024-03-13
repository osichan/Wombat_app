import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useConnectionAlert } from "../../../../../../components/ConnectionAlertProvider";
import { requestToGetAllMeasurementUnits } from "../../../../../../services/api/MeasurmentUnitApiService";
import { MeasurementUnitProps } from "../../../../../../types/Types";
import FlatList from "../../../../../../components/app/menu/category/MeasurementUnits/MeasurementUnitsFlatList";

const MeasurementUnitsScreen = ({ navigation }: any) => {
  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcessed, setIsrequestProcessed] = useState<boolean>(false);
  const [allMeasurementUnits, setAllMeasurementUnits] = useState<
    MeasurementUnitProps[]
  >([]);
  const getMeasurementUnit = async () => {
    setIsrequestProcessed(false);
    const result = await requestToGetAllMeasurementUnits();
    if (result && typeof result !== "boolean") {
      setAllMeasurementUnits(result);
    } else {
      setConnectionStatus(false);
    }
    setIsrequestProcessed(true);
  };
  useFocusEffect(
    useCallback(() => {
      getMeasurementUnit();
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
      <FlatList
        data={allMeasurementUnits}
        navigation={navigation}
        getMeasurementUnit={getMeasurementUnit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingGif: {
    width: "100%",
  },
});

export default MeasurementUnitsScreen;
