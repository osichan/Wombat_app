import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type SearchBarProps = {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  dropDownElements?: {
    icon: ImageSourcePropType;
    text: string;
    onPress: () => void;
  }[];
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  filterElements?: {
    headText: string;
    onChangeText: (text: string) => void;
    isChoosen: boolean;
    setChoosen: React.Dispatch<React.SetStateAction<boolean>>;
    value: string;
  }[];
  handleToFilter?: () => void;
  handleToCancle?: () => void;
};

const SearchBar = ({
  searchText,
  onSearchTextChange,
  dropDownElements,
  placeholder,
  style,
}: SearchBarProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  return (
    <View style={[style, { zIndex: 4 }]}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={"rgba(0, 0, 0, 0.30)"}
          value={searchText}
          onChangeText={onSearchTextChange}
        />
        {!(dropDownElements === undefined || dropDownElements.length === 0) && (
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              dropDownElements?.length === 1
                ? dropDownElements[0].onPress()
                : setIsDropDownVisible(!isDropDownVisible);
            }}
          >
            {dropDownElements?.length === 1 ? (
              <Image
                source={dropDownElements[0].icon}
                style={{ width: 28, height: 28 }}
              />
            ) : (
              <Image
                source={require("@assets/images/dropDownIcon.png")}
                style={styles.dropDownImage}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {isDropDownVisible && (
        <View style={styles.dropDownView}>
          <FlatList
            nestedScrollEnabled={true}
            data={dropDownElements}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.dropDownElementView}
                  onPress={item.onPress}
                >
                  <Image
                    source={item.icon}
                    style={styles.dropDownElementImage}
                  />
                  <Text style={styles.dropDownElementText}>{item.text}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    height: 55,
    backgroundColor: "#313131",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  searchInput: {
    width: 340,
    height: 44,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 23,
    paddingLeft: 25,
    fontSize: 18,
  },
  dropDownImage: {
    width: 23,
    height: 23,
  },
  dropDownView: {
    width: 255,
    backgroundColor: "#EAEAEA",
    position: "absolute",
    right: 0,
    top: 55,
    borderBottomLeftRadius: 10,
    zIndex: 4,
  },
  dropDownElementView: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  dropDownElementImage: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
  },
  dropDownElementText: {
    fontSize: 17,
  },
  filterButton: {
    position: "absolute",
    left: 315,
  },
  filterImage: {
    width: 21,
    height: 21,
  },
  filterView: {
    width: 325,
    backgroundColor: "rgba(49, 49, 49, 0.98)",
    position: "absolute",
    top: 55,
    right: 0,
  },
  filterComponent: {
    paddingLeft: 20,
    flexDirection: "row",
    marginTop: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: "#5EC396",
    borderWidth: 2,
    borderRadius: 3,
  },
  filterButtonsContainer: {
    marginBottom: 7,
    marginTop: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 7,
  },
  filterButtons: {
    width: 150,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default SearchBar;
