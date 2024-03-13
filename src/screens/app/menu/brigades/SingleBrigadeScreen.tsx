import { RouteProp, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import focusEffectToGetData from "../../../../components/focusEffectToGetData";
import { requestToGetAllStaffPersons } from "../../../../services/api/PersonApiService";
import { BrigadeProps, PersonProps } from "../../../../types/Types";

type SingleBrigadeScreenProps = {
  navigation: any;
  route: RouteProp<Record<string, { brigade: BrigadeProps }>, string>;
};

const SingleBrigadeScreen = ({
  navigation,
  route,
}: SingleBrigadeScreenProps) => {
  const [allPersons, setAllPersons] = useState<PersonProps[] | null>(null);
  const staffIds = route.params.brigade.staff.map((person) => person.id);
  const [isDataRequestProcessed, setIsDataRequestProcessed] =
    useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      focusEffectToGetData({
        request: requestToGetAllStaffPersons,
        setData: setAllPersons,
        setIsDataRequestProcessed,
      });
    }, [])
  );

  const staffPersons = allPersons
    ? allPersons.filter((person) => staffIds.includes(person.id))
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{route.params.brigade.name}</Text>
      <Text style={styles.addressText}>
        {route.params.brigade.foreman.fullName}
      </Text>
      <Text style={styles.headerText}>опис</Text>
      <View style={styles.clientsView}>
        <Text style={styles.clientNameText}>
          {route.params.brigade.description}
        </Text>
      </View>
      <Text style={styles.headerText}>склад бригади</Text>
      <View style={styles.managersView}>
        <FlatList
          nestedScrollEnabled={true}
          data={staffPersons}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.managerView}
                onPress={() =>
                  navigation.navigate("PersonStackNavigator", {
                    screen: "PersonInfoScreen",
                    params: {
                      person: item,
                    },
                  })
                }
              >
                <Text style={styles.clientNameText}>
                  {item.lastName} {item.firstName}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    paddingHorizontal: 55,
    paddingTop: 55,
  },
  nameText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "600",
  },
  addressText: {
    color: "#808080",
    fontSize: 20,
  },
  headerText: {
    marginTop: 25,
    color: "#5EC396",
    fontSize: 16,
  },
  clientsView: {
    height: 70,
  },
  clientNameText: {
    marginTop: 7,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    maxHeight: 80,
  },
  managersView: {
    height: 160,
    padding: 10,
  },
  managerView: {
    width: 189,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#515151",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    marginBottom: 18,
  },
  progressButton: {
    height: 50,
    marginTop: 40,
    backgroundColor: "#444444",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#5EC396",
    justifyContent: "center",
    alignItems: "center",
  },
  progressButtonText: {
    color: "#5EC396",
    fontSize: 20,
  },
});

export default SingleBrigadeScreen;
