import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  // const { longitude, latitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.449671,
          // latitude: latitude,
          longitude: 30.523624,
          // longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.007,
        }}
      >
        <Marker
          coordinate={{ latitude: 50.449671, longitude: 30.523624 }}
          // coordinate={{ latitude: latitude, longitude: longitude }}
          title="travel photo"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
});
