import React, {Component} from 'react';
import {AppRegistry, ListView, View, Text} from 'react-native';
import ListViewComponent from '../../components/listView';
import theme from '../../theme';

import axios from 'axios';

const API_PATH = 'http://api.gios.gov.pl/pjp-api/rest/station/findAll';

export default class StationsList extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: []
        };
    }

    fetchData = () => {
        axios.get(API_PATH).then((resp) => {
            this.setState({
                dataSource: resp.data
            });
        });
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {dataSource} = this.state;
        const {navigation} = this.props;
        return (
            <View style={theme.container}>
                <Text style={theme.subHeader}>Dostepne stacje pomiarowe</Text>
                <ListViewComponent dataSource={dataSource}
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
