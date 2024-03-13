import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  requestToDeletePerson,
  requestToGetAllPersones,
} from "../../../../services/api/PersonApiService";
import { PersonProps } from "../../../../types/Types";
import { usePanResponder } from "../../../../utils/helpers/PanResponderUtils";
import formatPhoneNumber from "../../../../utils/helpers/formatPhoneNumber";
import { useConnectionAlert } from "../../../ConnectionAlertProvider";
import ActionConfirmation from "../../ActionConfirmation";
import PermissionCheck from "../../PermissionCheck";

type PersonDeleteComponentProps = {
  person: PersonProps;
  setAllPersons: Dispatch<SetStateAction<PersonProps[] | null>>;
  navigation: any;
};

export default function PersonDeleteComponent({
  person,
  navigation,
  setAllPersons,
}: PersonDeleteComponentProps) {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { pan, panResponder } = usePanResponder(setIsConfirmationVisible);
  const [isRequestProcesed, setIsRequestProcesed] = useState(true);
  const { setConnectionStatus } = useConnectionAlert();
  const [height, setHeight] = useState(40);

  const mainRef = useRef<TouchableOpacity | null>(null);

  const deleteLineBackgroundColor = pan.x.interpolate({
    inputRange: [-200, 0],
    outputRange: ["#CC4E4E", "#313131"],
    extrapolate: "clamp",
  });

  const handleCancle = () => {
    setIsConfirmationVisible(false);
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const handleDelete = async () => {
    setIsRequestProcesed(false);
    const deleteResult = await requestToDeletePerson(person.id);
    const result = await requestToGetAllPersones();
    if (result && deleteResult) {
      Animated.spring(pan, {
        toValue: { x: -1000, y: 0 },
        useNativeDriver: false,
      }).start(() => setAllPersons(result));
    } else {
      setConnectionStatus(false, "Не вдалось зберегти зміни");
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    }
    setIsRequestProcesed(true);
    setIsConfirmationVisible(false);
  };

  const onLayout = () => {
    mainRef.current?.measure((_x, _y, _width, height, _pageX, _pageY) => {
      setHeight(height);
    });
  };
  return (
    <>
      <View style={[{ flexDirection: "row", paddingHorizontal: 20 }]}>
        <PermissionCheck
          permissionsToBeVisible={[5]}
          elseChildren={
            <View style={styles.animatedMain}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.main}
                onPress={() => {
                  navigation.navigate("PersonInfoScreen", { person });
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={styles.nameText}
                  >{`${person.firstName} ${person.lastName}`}</Text>
                  <View style={styles.line} />
                  <Text style={styles.phoneText}>
                    {person.phoneNumber
                      ? formatPhoneNumber(person.phoneNumber)
                      : "номер не записаний"}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.roleText}>{person.role}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        >
          <Animated.View
            style={[pan.getLayout(), styles.animatedMain]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              ref={mainRef}
              activeOpacity={0.7}
              style={styles.main}
              onPress={() => {
                navigation.navigate("PersonInfoScreen", { person });
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={styles.nameText}
                >{`${person.firstName} ${person.lastName}`}</Text>
                <View style={styles.line} />
                <Text style={styles.phoneText}>
                  {person.phoneNumber
                    ? formatPhoneNumber(person.phoneNumber)
                    : "номер не записаний"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.roleText}>{person.role}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            onLayout={onLayout}
            style={[
              styles.deleteLine,
              {
                backgroundColor: deleteLineBackgroundColor,
                transform: [{ translateX: pan.x }],
              },
              {
                height: height,
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
        nameOfItem={`${person.firstName} ${person.lastName}`}
        isProcessed={isRequestProcesed}
        handleCancle={() => handleCancle()}
        handleDelete={() => handleDelete()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  animatedMain: {
    width: "100%",
    marginTop: 4,
    zIndex: 2,
  },
  main: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#313131",
    flexDirection: "row",
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  nameText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "600",
  },
  phoneText: {
    color: "#5EC396",
    fontSize: 15,
    fontWeight: "600",
  },
  roleText: {
    color: "#5EC396",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  editButton: {
    position: "absolute",
    right: 17,
    bottom: 17,
  },
  editButtonImage: {
    width: 30,
    height: 30,
  },
  line: {
    backgroundColor: "#5EC396",
    height: 1,
    width: 120,
    left: -6,
    marginTop: 2,
    marginBottom: 7,
  },
  deleteLine: {
    width: 400,
    height: 75,
    top: 4,
    left: -10,
    zIndex: 1,
    justifyContent: "center",
  },
  deleteLineText: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 70,
  },
});
