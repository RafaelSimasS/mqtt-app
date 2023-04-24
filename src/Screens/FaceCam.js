import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Camera, CameraType } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as ImagePicker from "expo-image-picker";

import CircleButton from "../components/CircleButton";
import { horizontalScale, moderateScale, verticalScale } from "../components/Metrics";

const FaceCam = ({ route, navigation }) => {
  const [type, setType] = useState(CameraType.front);
  const { userArray } = route.params;
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

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
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
  } else return <View />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  camera: {
    width: horizontalScale(370),
    height: verticalScale(752),
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default FaceCam;
