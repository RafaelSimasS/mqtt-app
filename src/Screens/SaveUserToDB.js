import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import CustomButtom from "../components/Button";
import { useEffect, useState } from "react";

import axios from "axios";
import { encode, decode } from "base-64";
const horizontalPixels = Dimensions.get("window").width * (1 / 20);
const verticalPixels = Dimensions.get("window").height * (1 / 50);
import { useNavigation } from "@react-navigation/native";

const SaveUser = ({ route, navigation }) => {
  const { dataSend } = route.params;
  const navigate = useNavigation();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(Boolean(dataSend));
  const [isSaving, setIsSaving] = useState(false);

  const Gallery = ({ images }) => {
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          {Object.entries(images).map(([key, value]) => {
            if (key.startsWith("image")) {
              return (
                <Image
                  key={key}
                  source={{ uri: "data:image/png;base64," + encode(value) }}
                  style={{ width: 100, height: 100, margin: 5 }}
                />
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
    );
  };

  const saveUserToDb = async () => {
    if (isSaving) return;

    console.log("Enviando para o db!");
    const HOST = "http://192.168.1.10:3333";
    setIsSaving(true);
    try {
      const response = await axios.post(HOST + "/create-user", dataSend);
      console.log("Res: " + response.data);
      showAlert("Sucesso", "Usuário salvo com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
  const showAlert = (title, message) => {
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => {
          setHasUnsavedChanges(false);
          navigate.navigate("NewUser");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {isSaving ? (
        <ActivityIndicator size={"large"} color={"#2ab179"} />
      ) : (
        <>
          <Gallery images={dataSend?.images} />
          <CustomButtom
            Title="Salvar Usuário"
            onPress={saveUserToDb}
            disabled={isSaving}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default SaveUser;
