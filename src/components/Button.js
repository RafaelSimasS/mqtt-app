import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const CustomButtom = (props) => {
  return (
    <TouchableOpacity style={style.buttom} {...props}>
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{props.Title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttom: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#004751",
    width: 188,
    height: 38,
    borderRadius: 12,
  },
});

export default CustomButtom;
