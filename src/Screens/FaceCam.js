import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

import { Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as ImagePicker from "expo-image-picker";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../components/Metrics";
import CustomButtom from "../components/Button";
import CircleButton from "../components/CircleButton";

const FaceCam = ({ route, navigation }) => {
  const { nome } = route.params;
  const [dataSend, setDataSend] = useState({ user: nome, images: {} });

  const [type, setType] = useState(Camera.Constants.Type.front);
  const toggleCameraType = () => {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  /* 
  const [type, setType] = useState(CameraType.front);
  const isFocused = useIsFocused();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Conceda acesso à câmera para continuar.
        </Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  const handleFaceDetect = ({ faces }) => {
    if (faces && faces.length > 0) {
      console.log(JSON.stringify(faces));
    }
  };

  if (isFocused) {
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          onFacesDetected={handleFaceDetect}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 2500,
            tracking: true,
          }}
        >
          <CircleButton
            onPress={toggleCameraType}
            backgroundColor="#004751"
            IconName="autorenew"
            IconColor="#fff"
            right={20}
            bottom={20}
          />
        </Camera>
      </View>
    );
  } else return <View />; */

  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data.uri);
      data;
      let imageCount = Object.keys(dataSend.images).length;
      dataSend.images[`image${imageCount + 1}`] = data.base64;
    }
  };
  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  useEffect(() => {
    askForCameraPermission();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }
  const goToSaveUser = () => {
    if (nome && nome.length > 0) navigation.navigate("SaveUser", { dataSend });
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <CircleButton
          onPress={toggleCameraType}
          backgroundColor="#004751"
          IconName="autorenew"
          IconColor="#fff"
          right={20}
          bottom={20}
        />
        {!capturedImage && (
          <CircleButton
            onPress={takePicture}
            backgroundColor="#004751"
            IconName="camera"
            IconColor="#fff"
            left={20}
            bottom={20}
            // style={styles.takePic}
          />
          // <TouchableOpacity style={styles.takePic} onPress={takePicture}>
          //   <Text style={{ fontSize: 15, fontWeight: "bold" }}>Tirar foto</Text>
          // </TouchableOpacity>
        )}
      </Camera>
      {capturedImage && (
        <View style={styles.feed}>
          <TouchableOpacity
            style={[styles.buttonsRect, { bottom: 0 }]}
            onPress={() => setCapturedImage(null)}
          >
            <Text style={styles.text}>Tirar novamente</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: capturedImage }}
            style={{ width: 200, height: 200 }}
          />
          {/* <CircleButton
                style={[styles.takePic, { width: 100, height: 100 }]}
                IconName="camera"
                IconColor="#fff"
                onPress={() => setCapturedImage(null)}
              /> */}
          <TouchableOpacity
            style={[styles.buttonsRect, { bottom: 0 }]}
            onPress={() => setCapturedImage(null)}
          >
            <Text style={styles.text}>Finalizar Coleta</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  camera: {
    width: horizontalScale(370),
    height: verticalScale(452),
  },
  text: {
    fontSize: 19,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
  },
  buttonsRect: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 50,
    width: 100,
    minHeight: 28,
  },
  feed: {
    flex: 1,
    flexDirection: "row",
  },
});

export default FaceCam;
