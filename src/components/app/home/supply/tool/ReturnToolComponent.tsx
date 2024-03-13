import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { requestToTransferTool } from "../../../../../services/api/ToolApiService";
import { requestToGetAllWareHouses } from "../../../../../services/api/WarehouseApiService";
import { ToolProps, WarehouseProps } from "../../../../../types/Types";
import { useConnectionAlert } from "../../../../ConnectionAlertProvider";
import LoadingButton from "../../../../LoadingButton";
import focusEffectToGetData from "../../../../focusEffectToGetData";

type ReturnToolComponentProps = {
  isReturnToolModalVisible: boolean;
  setIsReturnToolModalVisible: Dispatch<SetStateAction<boolean>>;
  tool: ToolProps;
  navigation: NavigationProp<any, any>;
};

export default function ReturnToolComponent({
  isReturnToolModalVisible: isReturnToolModalVisible,
  setIsReturnToolModalVisible: setIsReturnToolModalVisible,
  tool,
  navigation,
}: ReturnToolComponentProps) {
  const [isRequestProcesed, setIsRequestProcesed] = useState<boolean>(true);
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  const [allWarehouses, setAllWarehouses] = useState<WarehouseProps[] | null>(
    null
  );
  const [choosenWarehouse, setChoosenWarehouse] =
    useState<WarehouseProps | null>(allWarehouses ? allWarehouses[0] : null);
  const [isChoosenWarehouseValid, setIsChoosenWarehouseValid] =
    useState<boolean>(true);
  const { setConnectionStatus } = useConnectionAlert();

  const [isWhereToReturnOpen, setIsWhereToTakeOpen] = useState<boolean>(false);

  const takeTool = async () => {
    setIsRequestProcesed(false);
    if (choosenWarehouse === null) {
      setIsChoosenWarehouseValid(false);
    } else {
      setIsChoosenWarehouseValid(true);
      if (
        await requestToTransferTool({
          id: tool.id,
          warehouse: choosenWarehouse.name,
        })
      ) {
        navigation.goBack();
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcesed(true);
  };

  const [topValue, setTopValue] = useState(180);
  const mainViewnRef = useRef<View | null>(null);
  const warehouseButtonRef = useRef<TouchableOpacity | null>(null);

  const onLayout = () => {
    let topValue = 0;
    mainViewnRef.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      topValue = pageY;
    });
    warehouseButtonRef.current?.measure(
      (_x, _y, _width, _height, _pageX, pageY) => {
        setTopValue(pageY - topValue + 44);
      }
    );
  };

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllWareHouses,
        setData: setAllWarehouses,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  return (
    <Modal visible={isReturnToolModalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.main} ref={mainViewnRef}>
          <Text style={styles.headText}>{"Повернути інструмент"}</Text>

          <TouchableOpacity
            ref={warehouseButtonRef}
            onLayout={onLayout}
            style={[
              styles.dropdownInput,
              !isChoosenWarehouseValid && { borderColor: "red" },
            ]}
            onPress={() => setIsWhereToTakeOpen(!isWhereToReturnOpen)}
          >
            <Text style={styles.dropdownText}>
              {choosenWarehouse ? choosenWarehouse.name : "поле обовязкове"}
            </Text>
            <Image
              source={require("@assets/images/openRectangleIcon.png")}
              style={styles.dropdownImage}
            />
          </TouchableOpacity>
          {isWhereToReturnOpen && (
            <View
              style={[
                styles.dropdown,
                { top: topValue, zIndex: 2, height: 140 },
              ]}
            >
              <FlatList
                nestedScrollEnabled={true}
                data={allWarehouses}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropDownElement}
                    onPress={() => {
                      setChoosenWarehouse(item);
                      setIsWhereToTakeOpen(!isWhereToReturnOpen);
                    }}
                  >
                    <Text style={styles.dropDownElementText}>{item.name}</Text>
                    <View style={styles.line} />
                  </TouchableOpacity>
                )}
                ListFooterComponent={
                  <>
                    {allWarehouses?.length !== 0 ? (
                      <View style={styles.dropDownFooter} />
                    ) : (
                      <View style={styles.dropDownElement}>
                        <Text style={styles.dropDownElementText}>
                          У вас немає дозволу на перегляд об'єктів
                        </Text>
                      </View>
                    )}
                  </>
                }
              />
            </View>
          )}

          <View style={styles.buttonView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancleButton}
              onPress={() => setIsReturnToolModalVisible(false)}
            >
              <Text style={styles.textInButton}>Скасувати</Text>
            </TouchableOpacity>
            <LoadingButton
              isProcessed={isRequestProcesed}
              activeOpacity={0.7}
              style={styles.settupButton}
              onPress={() => takeTool()}
            >
              <Text style={styles.textInButton}>Повернути</Text>
            </LoadingButton>
          </View>
        </View>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: 366,
    height: 410,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 120,
    padding: 25,
    alignItems: "center",
  },
  headText: {
    fontSize: 23,
    textAlign: "center",
    lineHeight: 28,
    width: 220,
  },
  dropdownInput: {
    width: 340,
    height: 45,
    borderRadius: 23,
    borderWidth: 2,
    backgroundColor: "#fff",
    elevation: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  dropdownText: {
    color: "rgba(0, 0, 0, 0.30)",
    fontSize: 18,
  },
  dropdownImage: {
    width: 16,
    height: 16,
  },
  dropdown: {
    position: "absolute",
    alignSelf: "center",
    left: 15,
    right: 15,
    paddingHorizontal: 15,
  },
  dropDownElement: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    height: 34,
  },
  dropDownElementText: {
    paddingHorizontal: 26,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "auto",
  },
  dropDownFooter: {
    height: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    marginBottom: 0,
    marginTop: "auto",
  },
  buttonView: {
    marginBottom: 0,
    marginTop: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  cancleButton: {
    width: 135,
    height: 52,
    backgroundColor: "rgba(49, 49, 49, 0.8)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settupButton: {
    width: 135,
    height: 52,
    backgroundColor: "#5EC396",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  quantityTextInput: {
    width: 80,
    borderBottomWidth: 2,
    borderColor: "#000",
    height: 17,
  },
  quantitAfterText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
    marginLeft: 5,
  },
});
