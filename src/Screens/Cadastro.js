import React from "react";
import { StyleSheet, View } from "react-native";
import CustomButtom from "../components/Button";

const NewUser = ({ navigation }) => {
  const goToAddUser = () => {
    navigation.navigate("AddUser");
  };
  const goToTrainModel = () => {
    navigation.navigate("TrainModel");
  };

  return (
    <View style={styles.container}>
      <CustomButtom Title="Adicionar pessoa" onPress={goToAddUser} />
      <CustomButtom Title="Treinar IA" onPress={goToTrainModel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    rowGap: 20,
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
