import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../components/InputField";
import CustomButtom from "../components/Button";
import StatusIcon from "../components/StatusIcon";
import Paho from "paho-mqtt";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Ajustes({ navigation }) {
  const [iPvalue, setIpValue] = React.useState("");
  const [ipStatus, setIpStatus] = React.useState("");

  const [topicValue, setTopicValue] = React.useState("");
  const [topicStatus, setTopicStatus] = React.useState("");

  const [portValue, setPortValue] = React.useState("");
  const [portStatus, setPortStatus] = React.useState("");

  const [conncet1, setConnect1] = useState(false);
  const [conncet2, setConnect2] = useState(false);
  const [conncet3, setConnect3] = useState(false);

  const [isConnected, setIsConnected] = React.useState(false);
  const [statusBadge, setStatusBadge] = useState("red");
  const [statusText, setStatusText] = useState("Não Conectado!");

  const handleStorageValue = (key, setConnect, setValue, setStatus) => {
    AsyncStorage.getItem(key).then((value) => {
      if (value) {
        setConnect(true);
        setValue(value);
        setStatus(value);
      } else {
        setConnect(false);
        setValue("");
        setStatus("");
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleStorageValue("ipKey", setConnect2, setIpValue, setIpStatus);
      handleStorageValue("portKey", setConnect1, setPortValue, setPortStatus);
      handleStorageValue(
        "topicKey",
        setConnect3,
        setTopicValue,
        setTopicStatus
      );
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (conncet1 && conncet2 && conncet3 && !isConnected) {
        const id_Client =
          "mqtt_" +
          Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        const client = new Paho.Client(iPvalue, Number(portValue), id_Client);

        client.onConnectionLost = OnConnectionLost;
        client.onMessageArrived = OnMessageArrived;
        function OnConnectionLost(responseObject) {
          if (responseObject.errorCode !== 0) {
            setIsConnected(false);
            setStatusBadge("red");
            setStatusText("Não Conectado!");
          }
        }
        // called when a message arrives
        function OnMessageArrived(message) {}

        client.connect({ onSuccess: onConnect });
        function onConnect() {
          setIsConnected(true);
          setStatusBadge("green");
          setStatusText("Conectado!");
          client.subscribe(topicValue);
        }
      }
    });
    return unsubscribe;
  }, [conncet1, conncet2, conncet3, navigation, isConnected]);

  const handlePress = () => {
    if (iPvalue && portValue && topicValue) {
      const id_Client =
        "mqtt_" +
        Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);

      const client = new Paho.Client(iPvalue, Number(portValue), id_Client);

      client.onConnectionLost = OnConnectionLost;
      client.onMessageArrived = OnMessageArrived;

      function OnConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          setIsConnected(false);
          setStatusBadge("red");
          setStatusText("Não Conectado!");
        }
      }
      // called when a message arrives
      function OnMessageArrived(message) {}

      client.connect({ onSuccess: onConnect });
      function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        AsyncStorage.setItem("ipKey", iPvalue);
        AsyncStorage.setItem("portKey", portValue.toString());
        AsyncStorage.setItem("topicKey", topicValue);

        client.subscribe(topicValue);
        setIsConnected(true);
        setStatusBadge("green");
        setStatusText("Conectado!");
        setIpStatus(iPvalue);
        setPortStatus(portValue);
        setTopicStatus(topicValue);
        // navigation.navigate("Feed");
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
      {/* Form Box */}
      <View
        style={{ flexDirection: "column", alignItems: "center", marginTop: 50 }}
      >
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
              placeholder="8083"
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
          <Text>{statusText} </Text>
          <StatusIcon color={statusBadge} />
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
    width: 150,
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
