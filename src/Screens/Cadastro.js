import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import CustomButtom from "../components/Button";
import InputField from "../components/InputField";

const NewUser = ({ navigation }) => {
  const goToAddUser = () => {
    navigation.navigate("AddUser");
  };

  return (
    <View style={styles.container}>
      <CustomButtom Title="Adicionar pessoa" onPress={goToAddUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  Button: {
    marginTop: 40,
  },
  TextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  formBox: {
    top: 0,
    flexDirection: "column",
  },
});

export default NewUser;
