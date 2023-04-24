import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, Switch, Alert } from "react-native";
import CustomButtom from "../components/Button";
import InputField from "../components/InputField";

const NewUser = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userArray, setUserArray] = useState(["None"]);
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Buscando Usuários Cadastrados.");

      AsyncStorage.getItem("NamesUsers").then((value) => {
        const jsonValue = value;
        if (jsonValue != null) {
          const myArray = JSON.parse(jsonValue);
          setUserArray(myArray);
          console.log("Achou");
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const handleNameInput = () => {
    const doesMatch = userArray.find((element) => element === userName);
    if (!doesMatch) {
      /* Adiciona o nome no inputField ao Array de Nomes */
      const currentArray = userArray;
      currentArray.push(userName);
      setUserArray(currentArray);

      /* Salva o novo Array de Nomes no AsyncStorage */
      const jsonValue = JSON.stringify(userArray);
      AsyncStorage.setItem("NamesUsers", jsonValue);
      console.log(jsonValue);

      /* Envia o Array de Nomes para a Screen de Camera */
      navigation.navigate("FaceCam", {
        userArray: userArray,
      });
      // ---
    } else console.log("Esse Nome Já Existe.");

    // navigation.navigate("Home");
  };
  const deleteKeys = () => {
    AsyncStorage.clear();
    console.log("Deletou tudo cara");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text accessibilityLabel="Nome da Pessa a Ser Cadastrada">Nome</Text>
        <InputField
          placeholder="Nome da Pessoa"
          onChangeText={(name) => {
            setUserName(name);
          }}
          value={userName}
        />
      </View>

      <View style={styles.Button}>
        <CustomButtom onPress={handleNameInput} Title="Adicionar" />
      </View>
      <View style={styles.Button}>
        <CustomButtom onPress={deleteKeys} Title="Deletar" />
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
});

export default NewUser;
