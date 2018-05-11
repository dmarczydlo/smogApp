import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import ListViewComponent from '../../components/listView';
import {Button} from 'react-native';
import theme from '../../theme';

export default class StationsList extends Component {
    state = {
        isConnected: this.props.isConnected,
        latitude: null,
        longitude: null,
        filterBy: 'stationName',
        disabled: true,
        query: [],
        filterMethod: 'like'
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

    onButtonPress = () => {
        const {latitude, longitude} = this.state;
        if (latitude && longitude) {
            this.setState({
                query: [latitude, longitude],
                filterBy: ['gegrLat', 'gegrLon'],
                filterMethod: 'distance'
            })
        }
    };

    render() {
        const {filterBy, query, disabled, filterMethod} = this.state;
        const {navigation, stations} = this.props;
        return (
            <View style={theme.container}>
                <Text style={theme.subHeader}>Dostępne stacje pomiarowe</Text>
                <Button
                    onPress={this.onButtonPress}
                    title="Lokalizacja"
                    color="#841584"
                    disabled={disabled}
                />
                <ListViewComponent object={stations}
                                   col1='stationName'
                                   navigationTo='Details'
                                   navigation={navigation}
                                   filter={true}
                                   filterBy={filterBy}
                                   query={query}
                                   filterMethod={filterMethod}
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('StationsList', () => StationsList);
