import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import ListViewComponent from '../../components/listView';
import theme from '../../theme';

export default class StationsList extends Component {
    state = {
        isConnected: this.props.isConnected,
        latitude: null,
        longitude: null,
    };

    watchID = null;

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                this.setState({
                    latitude,
                    longitude,
                    disabled: false
                })
            },
            (error) => console.log(error.message),
            {timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const {latitude, longitude} = position.coords;
            this.setState({
                latitude,
                longitude,
                disabled: false
            })
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isConnected !== prevState.isConnected) {
            nextProps.fetchDataForStations();
            return {
                isConnected: nextProps.isConnected
            }
        }
        return null;
    }

    render() {
        const {latitude, longitude} = this.state;
        const {navigation, stations} = this.props;
        return (
            <View style={theme.container}>
                <Text style={theme.subHeader}>Dostępne stacje pomiarowe</Text>
                <ListViewComponent object={stations}
                                   col1='stationName'
                                   navigationTo='Details'
                                   navigation={navigation}
                                   filter={true}
                                   filterBy={'stationName'}
                                   location={true}
                                   locationData={{
                                       latitude,
                                       longitude
                                   }}
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('StationsList', () => StationsList);
