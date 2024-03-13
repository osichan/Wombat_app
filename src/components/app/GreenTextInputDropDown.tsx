import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/reducers/userInfoReducer";

interface GreenTextInputDropDownProps {
  header: string;
  style?: StyleProp<ViewStyle>;
  items: any[] | null;
  placeholder: string;
  valible?: boolean;
  onPressToElement: (element: any) => void;
  onPressToLastElement?: () => void;
  onPressSecondTime?: (element: any) => void;
  whatToShow?: string[];
  choosen?: any[];
  lastElementPermission?: number;
}

export default function GreenTextInputDropDown({
  header,
  style,
  items,
  placeholder,
  onPressToLastElement,
  onPressSecondTime,
  onPressToElement,
  whatToShow = ["name"],
  valible,
  choosen,
  lastElementPermission,
}: GreenTextInputDropDownProps) {
  const userInfo = useSelector(selectUserInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [sortedData, setSortedData] = useState<any[] | null>(
    items === null ? [] : null
  );

  useEffect(() => {
    if (items === null) {
      return;
    }
    setSortedData([
      ...(choosen ? choosen : []),
      ...items.filter(
        (item) => !choosen?.some((element) => element.id === item.id)
      ),
    ]);
  }, [choosen, items]);

  return (
    <View style={[styles.mainView, style, isOpen && { height: 200 }]}>
      <Text style={styles.headerText}>{header}</Text>
      <TouchableOpacity
        style={styles.input}
        activeOpacity={0.8}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.inputText}>{placeholder}</Text>
        <Image
          source={require("@assets/images/dropDownIcon.png")}
          style={styles.inputImage}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.line,
          valible === false && { backgroundColor: "#CC4E4E" },
        ]}
      />
      {isOpen && (
        <View style={styles.dropDown}>
          <FlatList
            nestedScrollEnabled={true}
            data={sortedData}
            renderItem={({ item }) => {
              if (choosen?.some((element) => element.id === item.id)) {
                return (
                  <TouchableOpacity
                    style={styles.dropDownComponent}
                    activeOpacity={0.9}
                    onPress={() => {
                      setIsOpen(false);
                      onPressSecondTime && onPressSecondTime(item);
                    }}
                  >
                    <Text
                      style={[
                        styles.textInDropDownComponent,
                        { color: "#fff" },
                      ]}
                    >
                      {`${item[whatToShow[0]]}  ${
                        whatToShow.length === 2 ? item[whatToShow[1]] : ""
                      }`}
                    </Text>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  style={styles.dropDownComponent}
                  activeOpacity={0.9}
                  onPress={() => {
                    setIsOpen(false);
                    onPressToElement(item);
                  }}
                >
                  <Text style={styles.textInDropDownComponent}>
                    {`${item[whatToShow[0]]}  ${
                      whatToShow.length === 2 ? item[whatToShow[1]] : ""
                    }`}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={
              <>
                {onPressToLastElement &&
                  lastElementPermission &&
                  userInfo.permissionIds.includes(lastElementPermission) && (
                    <TouchableOpacity
                      style={styles.lastDropDownComponent}
                      activeOpacity={0.9}
                      onPress={onPressToLastElement}
                    >
                      <Text style={styles.textInLastDropDownComponent}>
                        створити нову
                      </Text>
                    </TouchableOpacity>
                  )}
              </>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    width: 290,
    alignSelf: "center",
    zIndex: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5EC396",
  },
  line: {
    height: 2,
    backgroundColor: "#fff",
  },
  input: {
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 25,
    alignItems: "center",
  },
  inputImage: {
    width: 16,
    height: 16,
  },
  inputText: {
    color: "#fff",
  },
  dropDown: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    top: 48,
    height: 150,
  },
  dropDownComponent: {
    backgroundColor: "rgba(220, 220, 220, 0.96)",
    height: 37,
    borderBottomWidth: 1,
    borderColor: "rgb(200, 200, 200)",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  textInDropDownComponent: {
    fontSize: 16,
    fontWeight: "600",
  },
  lastDropDownComponent: {
    backgroundColor: "rgba(220, 220, 220, 0.96)",
    height: 37,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textInLastDropDownComponent: {
    color: "#5EC396",
    fontSize: 16,
    fontWeight: "600",
  },
});
