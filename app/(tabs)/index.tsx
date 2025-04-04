import 'expo-dev-client'
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

interface Shop {
  id: number;
  name: string;
  address: string;
  coordinates: {
    latitude: string;  
    longitude: string;
  };
}

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [data, setData] = useState<Shop[]>([]); // Use the defined type

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await fetch('https://api.test.cutters.no/v2/salons');
        const apiData: Shop[] = await apiResponse.json();
        console.log(apiData)
        setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {location && data.length > 0 ? (
        <MapView
          style={styles.map}
          showsUserLocation
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          
        >
          {data.map((marker) => {
            const latitude = parseFloat(marker.coordinates.latitude);
            const longitude = parseFloat(marker.coordinates.longitude);
  
            if (isNaN(latitude) || isNaN(longitude)) {
              console.log(`Invalid coordinates for marker ${marker.id}`);
              return null;
            }
  
            return (
              <Marker
                key={marker.id}
                coordinate={{ latitude, longitude }}
                title={marker.name}
                description={marker.address}
              />
            );
          })}
        </MapView>
      ) : (
        <Text>Loading location or markers...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
