import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Button, Dimensions, View, Text, Slider} from "react-native";
import MapView, {Circle, Marker} from 'react-native-maps';

export default class MapComponent extends Component {

    state = {
        selectedMarker: null,
        radius: this.props.radius
    };

    onPressFilterBySelected = () => {
    };

    onMarkerClick = (marker) => {
        this.setState({
            selectedMarker: marker
        })
    };

    updateRadius = (value) => {
        this.setState({
            radius: value
        });
    };

    render() {
        const {locationData, markers} = this.props;
        const {radius, selectedMarker} = this.state;
        console.log(selectedMarker);
        return (
            <View accessible={true} style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: locationData.latitude || 0,
                        longitude: locationData.longitude || 0,
                        latitudeDelta: 3.5,
                        longitudeDelta: 3.5,
                    }}
                    showsUserLocation={true}
                    compass={true}
                >
                    <Circle
                        center={{
                            latitude: locationData.latitude || 0,
                            longitude: locationData.longitude || 0
                        }}
                        radius={radius * 1000}
                        fillColor="rgba(132, 21, 132, 0.3)"
                        strokeColor="rgba(132, 21, 132, 0.4)"/>

                    {markers && markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => this.onMarkerClick(marker)}
                        />
                    ))}
                </MapView>
                <View style={styles.details}>
                    <Slider
                        step={1}
                        maximumValue={1000}
                        onValueChange={this.updateRadius}
                        value={radius}
                    />
                    <Text>
                        Wybrano: {selectedMarker ? selectedMarker.title : 'brak'}
                    </Text>
                    <Text>
                        Zasieg: {radius} km
                    </Text>
                    <Button
                        onPress={this.onPressFilterBySelected}
                        title="Wybierz"
                        color="#841584"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('screen').height * 2 / 3,
    },
    details: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 1 / 3,
        backgroundColor: 'red'
    }
});

MapComponent.propTypes = {
    locationData: PropTypes.object.isRequired,
    radius: PropTypes.number,
    markers: PropTypes.array,
};

MapComponent.defaultProps = {
    radius: 100,
    markers: []
};
