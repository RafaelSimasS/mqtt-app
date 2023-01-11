import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

// Bibliotecas Externas:
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function AddUser(props) {
  return (
    <TouchableOpacity style={styles.elipse} {...props}>
      <MaterialCommunityIcons
        name="account-multiple-plus"
        color={"#fff"}
        size={35.1}
      />
    </TouchableOpacity>
  );
}

const dist = 20;
const elipseValues = 68;
const styles = StyleSheet.create({
  elipse: {
    width: elipseValues,
    height: elipseValues,
    borderRadius: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#004751",
    right: dist,
    bottom: dist,
  },
  //   button: {
  //     width: 30,
  //     height: 30,
  //     borderRadius: 50,
  //     position: "absolute",
  //   },
});

export default AddUser;
