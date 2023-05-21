import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomButtom from "../components/Button";
import InputField from "../components/InputField";

const AddUser = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [invalidName, setInvalidName] = useState("");

  const goToCam = () => {
    if (nome && nome.length > 0) {
      setNome((prevNome) => {
        const trimmedNome = prevNome.endsWith(" ")
          ? prevNome.trimEnd()
          : prevNome;
        return trimmedNome;
      });
      navigation.navigate("FaceCam", { nome });
    } else {
      setInvalidName(" (Nome Inválido)");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.TextStyle}>
          Nome
          <Text
            style={[
              styles.invalidName,
              { color: invalidName ? "#fc3434" : "black" },
            ]}
          >
            {invalidName}
          </Text>
        </Text>
        <InputField
          placeholder="Nome da pessoa"
          onChangeText={(nome) => setNome(nome)}
        />
      </View>
      <View style={{ borderRadius: 50, marginTop: 30 }}>
        <CustomButtom Title="Continuar" onPress={goToCam} />
      </View>
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
  invalidName: {
    fontWeight: "100",
  },
});

export default AddUser;
