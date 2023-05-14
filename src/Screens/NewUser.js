import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, Switch, Alert } from "react-native";
import CustomButtom from "../components/Button";
import InputField from "../components/InputField";

const NewUser = ({ navigation }) => {
  const [nome, setNome] = useState("");
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        onChangeText={setNome}
        value={nome}
      />
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
});

export default NewUser;
