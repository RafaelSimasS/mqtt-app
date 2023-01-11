import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, Switch } from "react-native";

// Bibliotecas Externas:
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import AddUser from "../src/AddUser";
import Notifications from "../src/Notifications";
import Paho from "paho-mqtt";

const client = new Paho.Client("broker.emqx.io", Number(8083), "oi153");

function Home() {
  const [text, setText] = useState("Sem Novas Mensagens");

  client.onConnectionLost = OnConnectionLost;
  client.onMessageArrived = OnMessageArrived;

  function OnConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }
  // called when a message arrives
  function OnMessageArrived(message) {
    console.log("Mensagem Recebida:" + message.payloadString);
    setText(message.payloadString);
  }

  const [isEnabled, setIsEnabled] = React.useState(true);
  const handleToggle = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled === true) {
      console.log("Oi casada");
      client.connect({ onSuccess: onConnect });
      function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("Connected");
        client.subscribe("/teste");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        onValueChange={handleToggle}
        value={isEnabled}
      />
      <Text>{text}</Text>
      <AddUser />
    </View>
  );
}

const dist = 20;
const elipseValues = 68;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 50,
    position: "absolute",
  },
});
export default Home;
