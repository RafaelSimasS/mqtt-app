import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, Switch } from "react-native";

// Bibliotecas Externas:
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import AddUser from "../src/AddUser";
import Notifications from "../src/Notifications";
import Paho from "paho-mqtt";

function Home({ navigation }) {
  const [text, setText] = useState("Sem Novas Mensagens");

  // const client = new Paho.Client(
  //   navigation.params.IpValueKey,
  //   Number(navigation.params.portKey),
  //   "mqttx_2b8173ac"
  // );
  // client.onConnectionLost = OnConnectionLost;
  // client.onMessageArrived = OnMessageArrived;

  // function OnConnectionLost(responseObject) {
  //   if (responseObject.errorCode !== 0) {
  //     console.log("onConnectionLost:" + responseObject.errorMessage);
  //   }
  // }
  // // called when a message arrives
  // function OnMessageArrived(message) {
  //   console.log("Mensagem Recebida:" + message.payloadString);
  //   setText(message.payloadString);
  // }
  const handleToggle = () => {
    console.log("Oi");
  };
  const [isEnabled, setIsEnabled] = React.useState(true);

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
      <AddUser onPress={() => navigation.navigate("NewUser")} />
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
