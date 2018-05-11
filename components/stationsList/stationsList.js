import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import ListViewComponent from '../../components/listView';
import theme from '../../theme';

export default class StationsList extends Component {
    componentDidMount() {
        this.props.fetchDataForStations();
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
