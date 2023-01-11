import { View, StyleSheet } from "react-native";

const StatusIcon = (props) => {
  return (
    <View style={[styles.elipse, { backgroundColor: props.color }]}></View>
  );
};

const roundMetric = 11;

const styles = StyleSheet.create({
  elipse: {
    width: roundMetric,
    height: roundMetric,
    borderRadius: 50,
  },
});

export default StatusIcon;
