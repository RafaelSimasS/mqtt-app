import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, Switch } from "react-native";
import CustomButtom from "../src/Button";
const NewUser = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <CustomButtom
        onPress={() => navigation.navigate("Home")}
        Title="Voltar"
      />
    </View>
  );
};

export default NewUser;
