import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function InputField(props) {
  return (
    <View style={styles.InputBox}>
      <TextInput
        style={{ paddingLeft: 10 }}
        placeholderTextColor="#605f61"
        editable
        multiline={false}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  InputBox: {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    width: 267,
    height: 38,
    justifyContent: "center",
  },
});

export default InputField;
