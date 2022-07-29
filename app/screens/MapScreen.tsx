import React, { Fragment, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { AppBar } from '../components/theme';
import { DrawerNavProps } from '../core/types';

const MapScreen = ({ navigation }: DrawerNavProps) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <Fragment>
      <AppBar title="Maps" subtitle="maps description" onPress={navigation.toggleDrawer} actions={[{ id: 'menu', icon: 'menu', side: 'left' }]} />

      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={region} onRegionChange={setRegion} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 100,
  },
});

export default MapScreen;
