import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useConnectionAlert } from "../../../../components/ConnectionAlertProvider";
import LoadingButton from "../../../../components/LoadingButton";
import ScrollViewEditing from "../../../../components/ScrollViewEditing";
import ActionConfirmation from "../../../../components/app/ActionConfirmation";
import GreenTextInputBlock from "../../../../components/app/GreenTextInputBlock";
import {
  requestToAddCategory,
  requestToDeleteCategory,
  requestToUpdateCategory,
} from "../../../../services/api/SupplyCategoryService";
import { SupplyCategoryProps } from "../../../../types/Types";

type SupplyInCategoryScreenProps = {
  navigation: any;
  route: RouteProp<
    Record<string, { category?: SupplyCategoryProps; type?: "T" | "C" }>,
    string
  >;
};

export default function EditSupplyCategoryScreen({
  navigation,
  route,
}: SupplyInCategoryScreenProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"T" | "C">(
    route.params?.category
      ? route.params?.category.type
      : route.params?.type
      ? route.params?.type
      : "T"
  );
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isNameFilled, setIsNameFilled] = useState(true);

  const handleSave = async () => {
    setIsRequestProcesed(false);
    if (name === "") {
      setIsNameFilled(false);
    } else {
      if (route.params?.category) {
        const result = await requestToUpdateCategory({
          name,
          description,
          type,
          id: route.params?.category?.id,
        });
        if (result && typeof result !== "boolean") {
          navigation.goBack();
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      } else {
        const result = await requestToAddCategory({ name, description, type });
        if (result && typeof result !== "boolean") {
          navigation.navigate("SupplyCategoryScreen", { type: type });
        } else {
          setConnectionStatus(false, "Не вдалось зберегти зміни");
        }
      }
    }
    setIsRequestProcesed(true);
  };

  const handleToDelete = async () => {
    setIsRequestProcesed(false);
    if (route.params?.category) {
      const result = await requestToDeleteCategory(route.params?.category.id);
      if (result && typeof result !== "boolean") {
        navigation.navigate("SupplyCategoryScreen", { type: type });
      } else {
        setConnectionStatus(false, "Не вдалось зберегти зміни");
      }
    }
    setIsRequestProcesed(true);
  };

  useEffect(() => {
    if (route.params?.category) {
      setName(route.params?.category.name);
      setDescription(route.params?.category.description);
      setType(route.params?.category.type);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <ScrollViewEditing>
        <View style={styles.main}>
          <View style={styles.underMain}>
            <GreenTextInputBlock
              value={name}
              onChangeText={(text) => setName(text)}
              header="Назва категорії"
              placeholder="Болгарки"
              valible={isNameFilled}
            />
            <GreenTextInputBlock
              value={description}
              onChangeText={(text) => setDescription(text)}
              header="Опис"
              placeholder="Дніпро-М"
              style={{ marginTop: 30 }}
            />
            <View style={styles.typeView}>
              <Text style={styles.typeText}>Вміст категорії</Text>
              <View style={styles.radioButtonsView}>
                <View style={styles.radioButtonView}>
                  <TouchableOpacity
                    style={styles.radioButtonTouchable}
                    onPress={() => setType("C")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        type === "C" && { backgroundColor: "#fff" },
                      ]}
                    />
                    <Text style={styles.radioButtonText}>матеріали</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.radioButtonTouchable}
                    onPress={() => setType("T")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        type === "T" && { backgroundColor: "#fff" },
                      ]}
                    />
                    <Text style={styles.radioButtonText}>інструменти</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.bottomView}>
              <TouchableOpacity
                style={[styles.bottomButton, { left: -10 }]}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={styles.textInButton}>скасувати зміни</Text>
              </TouchableOpacity>
              <LoadingButton
                style={[styles.bottomButton, styles.saveButton]}
                onPress={() => handleSave()}
                isProcessed={isRequestProcesed}
              >
                <Text style={styles.textInButton}>зберегти</Text>
              </LoadingButton>
            </View>
          </View>
        </View>
        {route.params?.category && (
          <>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => setIsConfirmationVisible(true)}
            >
              <Text style={styles.deleteText}>Видалити категорію</Text>
            </TouchableOpacity>
            <ActionConfirmation
              text="Впевнені, що хочете видалити"
              visible={isConfirmationVisible}
              nameOfItem={
                route.params.category ? route.params.category.name : ""
              }
              isProcessed={isRequestProcesed}
              handleCancle={() => setIsConfirmationVisible(false)}
              handleDelete={() => handleToDelete()}
            />
          </>
        )}
      </ScrollViewEditing>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: 366,
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingTop: 50,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  underMain: {
    width: 366,
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingTop: 50,
    alignSelf: "center",
    marginTop: -130,
  },
  typeView: {
    paddingHorizontal: 35,
    marginTop: 30,
  },
  typeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5EC396",
  },
  radioButtonView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  radioButtonTouchable: {
    flexDirection: "row",
    marginBottom: 10,
  },
  radioButton: {
    width: 21,
    height: 21,
    borderRadius: 3,
    borderWidth: 2.2,
    borderColor: "#fff",
  },
  radioButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  bottomView: {
    width: 370,
    marginTop: "auto",
    marginBottom: -30,
    flexDirection: "row",
  },
  bottomButton: {
    width: 165,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A5A5A",
  },
  saveButton: {
    marginRight: -10,
    marginLeft: "auto",
    backgroundColor: "#5EC396",
  },
  textInButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  textName: {
    color: "#5EC396",
    fontSize: 28,
    fontWeight: "600",
  },
  textAddress: {
    marginTop: 46,
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },
  deleteButton: {
    width: 290,
    height: 50,
    backgroundColor: "#CC4E4E",
    position: "absolute",
    bottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 20,
  },
  radioButtonsView: {
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
});
