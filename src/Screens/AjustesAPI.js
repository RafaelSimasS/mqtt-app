import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "../components/InputField";
import CustomButtom from "../components/Button";
const SettingsAPI = ({ navigation }) => {
  const [hostValue, setHostValue] = React.useState("");
  const [hostStatus, setHostStatus] = React.useState("");

  const [portValue, setPortValue] = React.useState("");
  const [portStatus, setPortStatus] = React.useState("");

  const handleStorageValue = (key, setStatus) => {
    AsyncStorage.getItem(key).then((value) => {
      if (value) {
        setStatus(value);
      } else {
        setStatus("");
      }
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleStorageValue("HostName", setHostStatus);
      handleStorageValue("port", setPortStatus);
    });

    return unsubscribe;
  }, [navigation]);
  const saveHost = () => {
    AsyncStorage.setItem("HostName", hostValue);
    AsyncStorage.setItem("port", portValue);
    setHostStatus(hostValue);
    setPortStatus(portValue);
  };
  return (
    <View style={styles.container}>
      <View style={styles.formBox}>
        <View style={styles.formBoxField}>
          <>
            <Text style={styles.TextStyle}>HOST</Text>
            <InputField
              style={styles.InputFildForm}
              placeholder="XXX.XXX.XXX.XXX"
              onChangeText={(host) => setHostValue(host)}
              value={hostValue}
            />
          </>
          <>
            <Text style={styles.TextStyle}>PORTA</Text>
            <InputField
              placeholder="3333"
              style={styles.InputFildForm}
              onChangeText={(port) => setPortValue(port)}
              value={portValue}
            />
          </>
        </View>
        <View style={{ borderRadius: 50 }}>
          <CustomButtom Title="Salvar" onPress={saveHost} />
        </View>
      </View>
      <View style={styles.BrokerBox}>
        {/* Broker Info */}
        <View style={styles.BrokerInfoBox}>
          <View style={styles.statusBoxes}>
            <Text style={styles.Title}>Host: {hostStatus}</Text>
          </View>
          <View style={styles.statusBoxes}>
            <Text style={styles.handle}>Porta: {portStatus}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  TextStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  formBoxField: {
    top: 0,
    flexDirection: "column",
  },
  formBox: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    rowGap: 20,
  },
  InputFildForm: {
    paddingLeft: 5,
    borderColor: "#1f9161",
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
  statusBoxes: {
    padding: 2,
    minWidthwidth: 150,
    minHeight: 22,
  },
});
export default SettingsAPI;
