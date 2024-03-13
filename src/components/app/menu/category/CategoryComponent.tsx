import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { SupplyCategoryProps } from "../../../../types/Types";
import { LinearGradient } from "expo-linear-gradient";
import PermissionCheck from "../../PermissionCheck";

type CategoryComponentProps = {
  category: SupplyCategoryProps;
  navigation: any;
};

export default function CategoryComponent({
  category,
  navigation,
}: CategoryComponentProps) {
  return (
    <PermissionCheck
      permissionsToBeVisible={category.type === "T" ? [24] : [18]}
      elseChildren={
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.animatedMain}>
            <LinearGradient
              colors={["#4E4E4E", "rgba(78, 78, 78, 0)"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainView}
            >
              <Text style={styles.textName}>{category.name}</Text>
              <PermissionCheck permissionsToBeVisible={[29]}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    navigation.navigate("EditSupplyCategoryScreen", {
                      category: category,
                    })
                  }
                >
                  <Image
                    source={require("@assets/images/editIcon.png")}
                    style={styles.editButtonImage}
                  />
                </TouchableOpacity>
              </PermissionCheck>
            </LinearGradient>
          </View>
        </View>
      }
    >
      <TouchableOpacity
        style={{ flexDirection: "row", justifyContent: "center" }}
        activeOpacity={0.7}
        onPress={() =>
          category.type === "T"
            ? navigation.navigate("ToolInCategoryScreen", { category })
            : navigation.navigate("ConsumableUnitInCategoryScreen", {
                category,
              })
        }
      >
        <View style={styles.animatedMain}>
          <LinearGradient
            colors={["#4E4E4E", "rgba(78, 78, 78, 0)"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mainView}
          >
            <Text style={styles.textName}>{category.name}</Text>
            <PermissionCheck permissionsToBeVisible={[29]}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate("EditSupplyCategoryScreen", {
                    category: category,
                  })
                }
              >
                <Image
                  source={require("@assets/images/editIcon.png")}
                  style={styles.editButtonImage}
                />
              </TouchableOpacity>
            </PermissionCheck>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </PermissionCheck>
  );
}

const styles = StyleSheet.create({
  animatedMain: {
    width: 370,
    marginTop: 2,
    alignSelf: "center",
    zIndex: 2,
  },
  mainView: {
    width: "100%",
    backgroundColor: "#313131",
    borderRadius: 10,
    paddingLeft: 36,
    paddingRight: "20%",
    justifyContent: "center",
  },
  textName: {
    color: "#5EC396",
    fontSize: 28,
    fontWeight: "400",
    marginTop: 25,
    marginBottom: 25,
  },
  editButton: {
    position: "absolute",
    bottom: 23,
    right: 18,
  },
  editButtonImage: {
    width: 30,
    height: 30,
  },
});
