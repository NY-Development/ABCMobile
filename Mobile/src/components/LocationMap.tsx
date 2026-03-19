import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

interface LocationMapProps {
  latitude?: number;
  longitude?: number;
  label?: string;
  height?: number | string;
}

const DEFAULT_LOCATION = {
  latitude: 9.061627,
  longitude: 38.763527,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function LocationMap({
  latitude = DEFAULT_LOCATION.latitude,
  longitude = DEFAULT_LOCATION.longitude,
  label = 'Our HQ in Addis Ababa',
  height = 400,
}: LocationMapProps) {
  const [showInfo, setShowInfo] = useState(false);

  const position = {
    latitude,
    longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={position}>
        <Marker coordinate={{ latitude, longitude }} onPress={() => setShowInfo(true)}>
          <Callout tooltip>
            <View style={styles.bubble}>
              <Text style={styles.name}>{label}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
