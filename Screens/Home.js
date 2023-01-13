import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, Switch, Alert } from "react-native";

// Bibliotecas Externas:
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import CircleButton from "../src/CircleButton";
import Notifications from "../src/Notifications";
import Paho from "paho-mqtt";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ navigation }) {
  const [text, setText] = useState("Sem Novas Mensagens");
  const [ipValue, setIPValue] = useState("");
  const [portValue, setPortValue] = useState(0);
  const [topicValue, setTopicValue] = React.useState("");
  const [conncet1, setConnect1] = useState(false);
  const [conncet2, setConnect2] = useState(false);
  const [conncet3, setConnect3] = useState(false);

  const handleStorageValue = (key, setConnect, setValue) => {
    AsyncStorage.getItem(key).then((value) => {
      if (value !== null && value !== "") {
        setConnect(true);
        setValue(value);
      } else {
        setConnect(false);
        setValue("");
      }
    });
  };

  useEffect(() => {
    handleStorageValue("ipKey", setConnect2, setIPValue);
    handleStorageValue("portKey", setConnect1, setPortValue);
    handleStorageValue("topicKey", setConnect3, setTopicValue);
  }, []);
  useEffect(() => {
    if (conncet1 === true && conncet2 === true && conncet3 === true) {
      const id_Client =
        "mqtt_" +
        Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      const client = new Paho.Client(ipValue, Number(portValue), id_Client);
      client.onConnectionLost = OnConnectionLost;
      client.onMessageArrived = OnMessageArrived;
      function OnConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("Desconectado" + responseObject.errorMessage);
        }
      }
      // called when a message arrives
      function OnMessageArrived(message) {
        console.log(
          "Mensagem Recebida - Home Instantaneo:" + message.payloadString
        );
        setText(message.payloadString);
      }
      client.connect({ onSuccess: onConnect });
      function onConnect() {
        console.log("Conectado ao Boker");

        client.subscribe(topicValue);
      }
    }
  }, [conncet1, conncet2, conncet3]);

  const UpdateFeed = () => {
    AsyncStorage.getItem("ipKey").then((value) => setIPValue(value));
    AsyncStorage.getItem("portKey").then((value) => setPortValue(value));
    AsyncStorage.getItem("topicKey").then((value) => setTopicValue(value));
    const id_Client =
      "mqtt_" +
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

    console.log("Debbug");
    console.log(id_Client);
    console.log(ipValue);
    console.log(portValue);

    if (ipValue && portValue && topicValue) {
      const client = new Paho.Client(ipValue, Number(portValue), id_Client);
      client.onConnectionLost = OnConnectionLost;
      client.onMessageArrived = OnMessageArrived;
      function OnConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("Desconectado" + responseObject.errorMessage);
        }
      }
      // called when a message arrives
      function OnMessageArrived(message) {
        console.log("Mensagem Recebida - Home:" + message.payloadString);
        setText(message.payloadString);
      }
      client.connect({ onSuccess: onConnect });
      function onConnect() {
        console.log("Conectado ao Boker");

        client.subscribe(topicValue);
      }
    } else {
      Alert.alert(
        "Não foi possível atualizar o Feed!",
        "Gostaria de tentar novamente?"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={styles.TextStyle}>Feed de Mensagens</Text>
      </View>
      <View>
        <Text>{text}</Text>
      </View>
      <View></View>
      <CircleButton
        onPress={() => navigation.navigate("NewUser")}
        backgroundColor="#004751"
        IconName="account-multiple-plus"
        IconColor="#fff"
        bottom={20}
        right={20}
      />
      <CircleButton
        onPress={UpdateFeed}
        backgroundColor="#004751"
        IconName="autorenew"
        IconColor="#fff"
        right={20}
        bottom={102}
      />
    </View>
  );
}

const dist = 20;
const elipseValues = 68;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: "absolute",
  },
  TextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Home;
