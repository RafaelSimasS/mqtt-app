import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, FlatList, Image } from "react-native";

// Bibliotecas Externas:
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import Paho from "paho-mqtt";
import * as Speech from "expo-speech";

// Components Locais
import CircleButton from "../src/CircleButton";
import Notifications from "../src/Notifications";
import { horizontalScale, moderateScale, verticalScale } from "../src/Metrics";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Home({ navigation }) {
  const [text, setText] = useState("Sem Novas Mensagens");
  const [arrivedMessage, setArrivedMessage] = useState([]);

  const [ipValue, setIPValue] = useState("");
  const [portValue, setPortValue] = useState(0);
  const [topicValue, setTopicValue] = React.useState("");

  const [conncet1, setConnect1] = useState(false);
  const [conncet2, setConnect2] = useState(false);
  const [conncet3, setConnect3] = useState(false);

  const [isConnected, setIsConnected] = useState(false);

  const appendMessageFeed = [];
  const DATA = [
    {
      Message: "Rafael Está Na porta",
      ImageBS: "",
      id: "2",
    },
  ];

  const handleStorageValue = (key, setConnect, setValue) => {
    AsyncStorage.getItem(key).then((value) => {
      if (value) {
        setConnect(true);
        setValue(value);
      } else {
        setConnect(false);
        setValue("");
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleStorageValue("ipKey", setConnect2, setIPValue);
      handleStorageValue("portKey", setConnect1, setPortValue);
      handleStorageValue("topicKey", setConnect3, setTopicValue);
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
        const client = new Paho.Client(ipValue, Number(portValue), id_Client);
        client.onConnectionLost = OnConnectionLost;
        client.onMessageArrived = OnMessageArrived;
        function OnConnectionLost(responseObject) {
          if (responseObject.errorCode !== 0) {
            console.log("Desconectado" + responseObject.errorMessage);
            setIsConnected(false);
          }
        }
        // called when a message arrives
        function OnMessageArrived(message) {
          console.log(
            "Mensagem Recebida - Home Instantaneo:" + message.payloadString
          );
          appendMessageFeed.push(JSON.parse(message.payloadString));
          setArrivedMessage(appendMessageFeed);

          // setText(message.payloadString);
        }
        client.connect({ onSuccess: onConnect });
        function onConnect() {
          console.log("Conectado ao Boker");
          setIsConnected(true);
          client.subscribe(topicValue);
        }
      }
    });
    return unsubscribe;
  }, [conncet1, conncet2, conncet3, navigation, isConnected]);

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

    if (ipValue && portValue && topicValue) {
      const client = new Paho.Client(ipValue, Number(portValue), id_Client);
      client.onConnectionLost = OnConnectionLost;
      client.onMessageArrived = OnMessageArrived;
      function OnConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("Desconectado" + responseObject.errorMessage);
          setIsConnected(false);
        }
      }
      // called when a message arrives
      function OnMessageArrived(message) {
        console.log("Mensagem Recebida - Home:" + message.payloadString);
        appendMessageFeed.push(JSON.parse(message.payloadString));
        setArrivedMessage(appendMessageFeed);

        // setText(message.payloadString);
      }
      client.connect({ onSuccess: onConnect });
      function onConnect() {
        console.log("Conectado ao Boker");
        setIsConnected(true);
        client.subscribe(topicValue);
      }
    } else {
      Alert.alert(
        "Não foi possível atualizar o Feed!",
        "Gostaria de tentar novamente?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelar Pressionado"),
            style: "cancel",
          },
          {
            text: "Sim",
            onPess: UpdateFeed,
          },
        ]
      );
    }
  };

  useEffect(() => {
    if (DATA.length > 0) {
      Speech.speak(DATA[DATA.length - 1].Message, {
        language: "pt-BR ",
        pitch: 0.7,
        rate: 0.85,
        voice: "Enhanced",
      });
    } else {
      Speech.speak(text, {
        language: "pt-BR",
        pitch: 0.7,
        rate: 0.85,
        voice: "Enhanced",
      });
    }
  }, [text, DATA]);

  const MessageBox = (props) => {
    const base64 = props.Image.toString("utf-8");
    return (
      <View style={styles.item}>
        <Text>{props.Message}</Text>
        <Image
          style={styles.image}
          source={{ uri: "data:image/png;base64," + base64 }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={styles.TextStyle}>Feed de Mensagens</Text>
      </View>
      <View style={styles.messageBox}>
        {DATA.length < 1 ? (
          <Text>{text}</Text>
        ) : (
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <MessageBox Message={item.Message} Image={item.ImageBS} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

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
    justifyContent: "flex-start",
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
  item: {
    backgroundColor: "#859b9e",
    minWidth: horizontalScale(150),
    minHeight: verticalScale(70),
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    minWidth: horizontalScale(100),
    minHeight: verticalScale(100),
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "red",
  },
  messageBox: {
    minWidth: horizontalScale(250),
    minHeight: verticalScale(300),
    marginTop: moderateScale(30),
    backgroundColor: "#004751",
    borderRadius: 20,
    paddingBottom: 10,
  },
});
export default Home;
