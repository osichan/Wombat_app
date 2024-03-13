import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface RoleDropDownProps {
  isOpen: any;
  items: any[] | undefined;
  handleOptionSelect: ((value: string) => void) | undefined;
  lastOptionToCreate?: boolean;
  navigation?: any;
  whereToNavigate?: string;
  style?: StyleProp<ViewStyle>;
}

export default function DropDown({
  isOpen,
  items,
  handleOptionSelect,
  lastOptionToCreate,
  navigation,
  whereToNavigate,
  style,
}: RoleDropDownProps) {
  return (
    <>
      {isOpen && (
        <View style={[styles.dropDown, style]}>
          {items?.map((role, index) => (
            <>
              {role.name !== "Власник" && (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleOptionSelect ? handleOptionSelect(role.name) : null;
                  }}
                  style={{ paddingVertical: 5 }}
                >
                  <Text style={styles.dropDownText}>{role.name}</Text>
                </TouchableOpacity>
              )}
            </>
          ))}
          {lastOptionToCreate && (
            <TouchableOpacity style={{ paddingVertical: 5 }}>
              <Text
                style={[styles.dropDownText, { color: "#5EC396" }]}
                onPress={() => navigation?.navigate(whereToNavigate)}
              >
                створити нову
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  dropDown: {
    width: 235,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 10,
    position: "absolute",
  },
  dropDownText: {
    width: 160,
    height: 25,
    flexShrink: 0,
    color: "#313131",
    fontFamily: "Judson-400",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 25 * 1.3,
  },
});
