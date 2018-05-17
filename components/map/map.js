import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Dimensions, View, Text, Slider, AppRegistry} from "react-native";
import Button from '../button';
import MapView, {Circle, Marker} from 'react-native-maps';
import {mainColor, backColor} from "../../theme";
import {convertHex} from "../../utils/theme";

const buttonStyle = {
    height: 25,
    width: 25,
};


export default class MapComponent extends Component {

    state = {
        selectedMarker: null,
        radius: this.props.radius
    };

    onPressFilterBySelectedRadius = () => {
        this.props.onClose(this.state.radius);
    };

    onPressFilterBySelectedMarker = () => {
        if (this.state.selectedMarker) {
            this.props.onClose();
            this.props.navigation.navigate('Details', this.state.selectedMarker);
        } else {
            alert('Wybierz stację pomiarową');
        }
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
        console.log(convertHex(mainColor, 10));
        const {locationData, markers} = this.props;
        const {radius, selectedMarker} = this.state;
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
                            fillColor={convertHex(backColor, 30)}
                            strokeColor={convertHex(backColor, 30)}/>

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
                            thumbTintColor={backColor}
                            minimumTrackTintColor={backColor}
                        />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.text}>
                                Zasieg: {radius} km
                            </Text>
                            <Button
                                style={buttonStyle}
                                onPress={this.onPressFilterBySelectedRadius}
                                icon='check'
                            />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.text}>
                                Wybrano: {selectedMarker ? selectedMarker.title : 'brak'}
                            </Text>
                            <Button
                                style={buttonStyle}
                                onPress={this.onPressFilterBySelectedMarker}
                                icon='check'
                            />
                        </View>

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
        height: Dimensions.get('screen').height - 160,
    },
    details: {
        width: Dimensions.get('screen').width,
        height: 160,
        padding: 5,
        backgroundColor: convertHex(backColor, 10),
    },
    detailsContainer: {
        flexDirection: 'row',
        paddingTop: 5

    },
    text: {
        alignItems: 'center',
        marginRight: 10
    }
});

MapComponent.propTypes = {
    locationData: PropTypes.object.isRequired,
    radius: PropTypes.number,
    markers: PropTypes.array,
    navigation: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

MapComponent.defaultProps = {
    radius: 100,
    markers: []
};

AppRegistry.registerComponent('Map', () => MapComponent);
