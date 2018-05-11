import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import ListViewComponent from '../../components/listView';
import theme from '../../theme';

export default class StationsList extends Component {
    state = {
        isConnected: this.props.isConnected
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
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('StationsList', () => StationsList);
