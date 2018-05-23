import React, {Component} from 'react';
import {AppRegistry, ScrollView, RefreshControl} from 'react-native';
import ListViewComponent from '../../components/listView';
import theme from '../../theme';

export default class StationsList extends Component {
    state = {
        isConnected: this.props.isConnected,
        latitude: null,
        longitude: null,
        refreshing: false
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

    onRefresh = () => {
        this.props.fetchDataForStations();
    };

    render() {
        const {latitude, longitude} = this.state;
        const {navigation, stations} = this.props;
        return (
            <ScrollView style={theme.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
            >
                <ListViewComponent object={stations}
                                   header={'Dostępne stacje pomiarowe'}
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
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('StationsList', () => StationsList);
