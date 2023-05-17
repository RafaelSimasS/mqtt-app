import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Image, ImageBackground } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as ImagePicker from "expo-image-picker";
import CircleButton from "../components/CircleButton";
import { abs } from "react-native-reanimated";

const horizontalPixels = Dimensions.get("window").width * (1 / 20);
const verticalPixels = Dimensions.get("window").height * (1 / 50);
const FaceCam = ({ route, navigation }) => {
  const { nome } = route.params;
  const [dataSend, setDataSend] = useState({ user: nome, images: {} });

  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.front);

  const toggleCameraType = () => {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const [counter, setCounter] = useState(0);
  const handleFaceDetect = async ({ faces }) => {
    if (faces && faces.length > 0) {
      if (counter < 10) {
        await takePicture();
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        console.log("Já foram tiradas 10 fotos.");
      }
    } else {
      console.log("Sem faces");
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data.uri);
      setDataSend((prevDataSend) => {
        const imageCount = Object.keys(prevDataSend.images).length;
        const updatedImages = {
          ...prevDataSend.images,
          [`image${imageCount + 1}`]: data.uri,
        };
        return { ...prevDataSend, images: updatedImages };
      });
      console.log(dataSend);
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
      <Text style={styles.counter}>{counter} imagens tiradas</Text>
      {!capturedImage && counter < 10 && (
        <Camera
          style={styles.camera}
          type={type}
          autoFocus={Camera.Constants.AutoFocus.on}
          ref={cameraRef}
          onFacesDetected={handleFaceDetect}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.accurate,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 7500,
            tracking: true,
          }}
        >
          <CircleButton
            onPress={toggleCameraType}
            backgroundColor="#004751"
            IconName="camera-flip"
            IconColor="#fff"
            right={horizontalPixels}
            bottom={verticalPixels}
          />
          <CircleButton
            onPress={takePicture}
            backgroundColor="#004751"
            IconName="camera"
            IconColor="#fff"
            left={horizontalPixels}
            bottom={verticalPixels}
          />
        </Camera>
      )}
      {capturedImage && counter >= 10 && (
        <View style={styles.feed}>
          <ImageBackground source={{ uri: capturedImage }} style={styles.feed}>
            <CircleButton
              onPress={() => setCapturedImage(null)}
              backgroundColor="#004751"
              IconName="camera-retake"
              IconColor="#fff"
              left={horizontalPixels}
              bottom={verticalPixels}
            />
            <CircleButton
              onPress={toggleCameraType}
              backgroundColor="#004751"
              IconName="account-check"
              IconColor="#fff"
              right={horizontalPixels}
              bottom={verticalPixels}
            />
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    // flexDirection: "column",
  },
  camera: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    aspectRatio: 9 / 16,
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    aspectRatio: 9 / 16,
  },
  counter: {
    position: "absolute",
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    bottom: 0,
  },
});

export default FaceCam;
