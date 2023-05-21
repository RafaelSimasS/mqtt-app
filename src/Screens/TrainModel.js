import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  Text,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import CustomButtom from "../components/Button";
import axios from "axios";
import Modal from "react-native-modal";
import * as Speech from "expo-speech";

const TrainModel = () => {
  const [isSaving, setIsSaving] = useState(false);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getTrainFile = async () => {
    const HOST = "http://192.168.1.3:3333";
    setIsSaving(true);
    try {
      const response = await axios.get(HOST + "/train-model");
      console.log(response.data);
    } catch (error) {
      let errorValue = "";
      if (error.response) {
        errorValue = error.response.data;
        setErrorMessage(errorValue); // Mensagem de erro enviada pelo servidor
      } else {
        errorValue = "Ocorreu um erro na requisição.";
        setErrorMessage(errorValue); // Erro de requisição
      }
      setErrorModalVisible(true);
      Speech.speak(errorValue, {
        language: "pt-BR ",
        pitch: 1,
        rate: 0.85,
        voice: "Enhanced",
      });
    } finally {
      setIsSaving(false);
    }
  };
  const hideErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isSaving ? (
        <ActivityIndicator size={"large"} color={"#2ab179"} />
      ) : (
        <CustomButtom
          Title="Treinar Modelo"
          onPress={getTrainFile}
          disabled={isSaving}
        />
      )}
      <Modal
        isVisible={errorModalVisible}
        animationIn={"fadeInDownBig"}
        animationOut={"fadeOutDownBig"}
        animationInTiming={500}
        animationOutTiming={500}
      >
        <View style={styles.errorModalContainer}>
          <Text style={styles.errorModalText}>{errorMessage}</Text>
          <Button title="OK" onPress={hideErrorModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  errorModalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  errorModalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
export default TrainModel;
