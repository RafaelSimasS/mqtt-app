import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../src/InputField";
import CustomButtom from "../src/Button";
import StatusIcon from "../src/StatusIcon";
import { Appearance } from "react-native";
import Paho from "paho-mqtt";

function Ajustes({ navigation }) {
  const [iPvalue, setIpValue] = React.useState("");
  const [ipStatus, setIpStatus] = React.useState("");

  const [topicValue, setTopicValue] = React.useState("");
  const [topicStatus, setTopicStatus] = React.useState("");

  const [portValue, setPortValue] = React.useState(0);
  const [portStatus, setPortStatus] = React.useState(0);

  const [isConnected, setIsConnected] = React.useState("red");

  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === "dark") {
    console.log("Oi: " + typeof styles);
  }

  const handlePress = () => {
    if (
      iPvalue !== undefined &&
      iPvalue !== "" &&
      portValue !== undefined &&
      portValue !== "" &&
      topicValue !== undefined &&
      topicValue !== ""
    ) {
      console.log("Entrou");
      setIpStatus(iPvalue);
      setPortStatus(portValue);
      setTopicStatus(topicValue);

      const client = new Paho.Client(
        iPvalue,
        Number(portValue),
        "mqttx_2b8173ac"
      );

      client.onConnectionLost = OnConnectionLost;
      client.onMessageArrived = OnMessageArrived;

      function OnConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:" + responseObject.errorMessage);
          setIsConnected("red");
        }
      }
      // called when a message arrives
      function OnMessageArrived(message) {
        console.log("Mensagem Recebida:" + message.payloadString);
      }

      client.connect({ onSuccess: onConnect });
      function onConnect() {
        // Once a connection has been made, make a subscription and send a message.

        console.log("onConnect");
        client.subscribe(topicValue);
        setIsConnected("green");
        navigation.navigate("HomeScreen", {
          portKey: portValue,
          IpValueKey: iPvalue,
        });
      }
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ marginTop: 53 }}>
        <Text style={styles.TextStyle}>Ajustes</Text>
      </View>
      {/* Form Box */}
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        {/* Form Field */}
        <View style={styles.formBox}>
          <View>
            <Text style={styles.TextStyle}>IP</Text>
            <InputField
              placeholder="XXX.XXX.XXX.XXX"
              onChangeText={(ip) => setIpValue(ip)}
              value={iPvalue}
            />
          </View>
          <View>
            <Text style={styles.TextStyle}>Tópico</Text>
            <InputField
              placeholder="/nomes"
              onChangeText={(topic) => setTopicValue(topic)}
              value={topicValue}
            />
          </View>
          <View>
            <Text style={styles.TextStyle}>Porta</Text>
            <InputField
              placeholder="1883"
              onChangeText={(port) => setPortValue(port)}
              value={portValue}
            />
          </View>
        </View>

        {/* Form Buttom*/}
        <View style={{ borderRadius: 50, marginTop: 30 }}>
          <CustomButtom Title="Conectar" onPress={handlePress} />
        </View>
      </View>

      {/* Broker Box */}
      <View style={styles.BrokerBox}>
        {/* Broker Info */}
        <View style={styles.BrokerInfoBox}>
          <View style={styles.statusBoxes}>
            <Text style={styles.Title}>Broker Atual:</Text>
          </View>
          <View style={styles.statusBoxes}>
            <Text style={styles.handle}>Tópico: {topicStatus}</Text>
          </View>
          <View style={styles.statusBoxes}>
            <Text style={styles.handle}>IP: {ipStatus}</Text>
          </View>
          <View style={styles.statusBoxes}>
            <Text style={styles.handle}>PORTA: {portStatus}</Text>
          </View>
        </View>
        {/* Broker Status */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text>Status </Text>
          <StatusIcon color={isConnected} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  formBox: {
    top: 0,
    flexDirection: "column",
  },
  BrokerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 328,
    height: 121,
    marginBottom: 20,
  },
  BrokerInfoBox: {
    flexDirection: "column",
    flex: 0.5,
    minWidth: 150,
  },
  handle: {
    fontSize: 18,
    minHeight: 22,
  },
  Title: {
    Width: 150,
    minHeight: 22,
    fontSize: 16,
  },
  statusBoxes: {
    padding: 2,
    minWidthwidth: 150,
    minHeight: 22,
  },
  TextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Ajustes;
