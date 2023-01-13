import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

// Bibliotecas Externas:
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function CircleButton(props) {
  return (
    <TouchableOpacity
      style={[
        styles.elipse,
        {
          backgroundColor: props.backgroundColor,
          right: props.right,
          left: props.left,
          bottom: props.bottom,
          top: props.top,
        },
      ]}
      {...props}
    >
      {/* account-multiple-plus */}
      <MaterialCommunityIcons
        name={props.IconName}
        color={props.IconColor || "#fff"}
        size={35.1}
      />
    </TouchableOpacity>
  );
}
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
  },
  //   button: {
  //     width: 30,
  //     height: 30,
  //     borderRadius: 50,
  //     position: "absolute",
  //   },
});

export default CircleButton;
