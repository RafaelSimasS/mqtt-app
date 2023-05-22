import { StyleSheet, Text, View, PermissionsAndroid } from "react-native";
import React, { Component } from "react";

// Screens:
import HomeScreen from "./src/Screens/Home";
import AjustesScreen from "./src/Screens/Ajustes";
import NewUser from "./src/Screens/Cadastro";
import FaceCam from "./src/Screens/FaceCam";
import SettingsAPI from "./src/Screens/AjustesAPI";
// Bibliotecas Externas:
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AddUser from "./src/Screens/AddUser";
import SaveUser from "./src/Screens/SaveUserToDB";
import TrainModel from "./src/Screens/TrainModel";
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs({ navigation, route }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#00f800"
      inactiveColor="#ffffff"
      labelStyle={{ fontSize: 28 }}
      barStyle={{ backgroundColor: "#004751" }}
      backBehavior="history"
    >
      <Tab.Screen
        name="SettingsAPI"
        component={SettingsAPI} // Profile Screen
        options={{
          tabBarLabel: "API",
          tabBarAccessibilityLabel: "Ajustes da API",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="database" color={color} size={30} />
          ),
          title: "API",
        }}
      />
      <Tab.Screen
        name="Feed"
        component={HomeScreen} //Home Screen
        options={{
          title: "Início",
          tabBarLabel: "Inicio",
          tabBarAccessibilityLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={AjustesScreen} // Profile Screen
        options={{
          tabBarLabel: "MQTT",
          tabBarAccessibilityLabel: "Ajustes do MQTT",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" color={color} size={30} />
          ),
          title: "MQTT",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#71ccc7",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "400",
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{ title: "Inicio" }}
          />

          <Stack.Screen
            name="NewUser"
            component={NewUser}
            options={{
              title: "Cadastro",
            }}
          />
          <Stack.Screen
            name="AddUser"
            component={AddUser}
            options={{
              title: "Adicionar Usuário",
            }}
          />
          <Stack.Screen
            name="FaceCam"
            component={FaceCam}
            options={{
              title: "Coleta de Rosto",
            }}
          />
          <Stack.Screen
            name="SaveUser"
            component={SaveUser}
            options={{
              title: "Salvar Usuário",
            }}
          />

          <Stack.Screen
            name="TrainModel"
            component={TrainModel}
            options={{
              title: "Treinar Reconhecimento",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
