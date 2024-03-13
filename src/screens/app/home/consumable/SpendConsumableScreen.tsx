import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import GreenTextInputBlock from "../../../../components/app/GreenTextInputBlock";
import { requestToSpendConsumables } from "../../../../services/api/ConsumablesApiService";
import { ConsumableProps } from "../../../../types/Types";

type SpendConsumableScreenProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<string, { consumable: ConsumableProps }>, string>;
};

const SpendConsumableScreen = ({
  navigation,
  route,
}: SpendConsumableScreenProps) => {
  const [quantityToSpend, setQuantityToSpend] = useState<string>("");
  const [isQuantityValid, setIsQuantityValid] = useState<boolean>(true);

  const { setConnectionStatus } = useConnectionAlert();
  const [isRequestProcesed, setIsRequestProcesed] = useState<boolean>(true);

  const onSetup = async () => {
    setIsRequestProcesed(false);
    if (parseFloat(quantityToSpend) <= 0) {
      setIsQuantityValid(false);
    } else {
      if (
        await requestToSpendConsumables({
          id: route.params.consumable.id,
          unit_quantity: parseFloat(quantityToSpend),
        })
      ) {
        navigation.goBack();
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
        true;
      }
    }
    setIsRequestProcesed(true);
  };
  const onChangeQuantity = (newNumber: string) => {
    let numericValue = newNumber.replace(/[^0-9.]/g, "");
    if (parseFloat(numericValue) > route.params.consumable.unitQuantity) {
      setQuantityToSpend(numericValue.slice(0, -1));
    } else {
      setQuantityToSpend(numericValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{ marginTop: "auto", marginBottom: "auto" }}>
          <GreenTextInputBlock
            value={quantityToSpend}
            onChangeText={(text) => onChangeQuantity(text)}
            header="Кількість"
            valible={isQuantityValid}
            keyboardType="numeric"
            style={{ marginTop: 35 }}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.cancleButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textInButton}>Скасувати зміни</Text>
          </TouchableOpacity>
          <LoadingButton
            style={styles.addButton}
            isProcessed={isRequestProcesed}
            onPress={() => onSetup()}
          >
            <Text style={styles.textInButton}>Витратити</Text>
          </LoadingButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    width: 360,
    height: 250,
    backgroundColor: "#313131",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonView: {
    marginTop: "auto",
    marginBottom: -20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cancleButton: {
    backgroundColor: "#5A5A5A",
    width: "40%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 10,
  },
  addButton: {
    backgroundColor: "#5EC396",
    width: "40%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 10,
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
  },
});

export default SpendConsumableScreen;
