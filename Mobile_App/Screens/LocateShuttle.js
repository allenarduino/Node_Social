import React from "react";
import { View, Text, StyleSheet, Geolocation } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.00009;
const LATITUDE = 11.7934829;
const LONGITUDE = 111.9867401;

class LocateShuttle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      longitudeDelta: 0.09,
      latitudeDelta: 0.02,
      error: null,
      routeCoordinate: []
    };
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    longitudeDelta: LONGITUDE_DELTA,
    latitudeDelta: LATITUDE_DELTA
  });

  componentDidMount() {
    /* navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      });
    });*/

    navigator.geolocation.watchPosition(position => {
      const { latitude, longitude } = position.coords;
      const { routeCoordinates } = this.state;
      const newCoordinate = {
        latitude,
        longitude
      };
      this.setState({
        latitude,
        longitude,
        routeCoordinates: routeCoordinates.concat([newCoordinate])
      });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={this.getMapRegion()}
          style={{ flex: 1 }}
        >
          <Marker coordinate={this.getMapRegion()} />
          {/*<Polyline
            coordinates={this.state.routeCoordinates}
            strokeWidth={2}
            strokeColor="#000"
          />*/}
        </MapView>
      </View>
    );
  }
}
export default LocateShuttle;
/*
const LocateShuttle = () => {
  const [longitude, setLongitude] = React.useState(LONGITUDE);
  const [latitude, setLatitude] = React.useState(LATITUDE);
  const [routeCoordinate, setRouteCoordinate] = React.useState(0.0);
  const [coordinates] = React.useState(
    {
      latitude: 48.8587741,
      longitude: 2.2069771
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663
    }
  );

  const getMapRegion = () => ({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        coordinates[0].latitude = position.coords.latitude;
        coordinates[0].longitude = position.coords.longitude;
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );

    navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const newCoordinate = { latitude, longitude };
        setRouteCoordinate(routeCoordinate);
        routeCoordinate.concat(newCoordinate);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coordinates[0],
          longitude: coordinates[0],
          latitudeDelta: 0.009,
          longitudeDelta: 0.00009
        }}
        style={{ flex: 1 }}
      >
        <Marker coordinate={coordinates[1]} />
        <Polyline
          coordinates={coordinates[0]}
          strokeWidth={2}
          strokeColor="#000"
        />
      </MapView>
    </View>
  );
};
export default LocateShuttle;*/
