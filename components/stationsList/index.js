import React, {Component} from 'react';
import {AppRegistry, ListView, View, Text} from 'react-native';
import ListViewComponent from '../../components/listView';
import theme from '../../theme';

import axios from 'axios';

const API_PATH = 'http://api.gios.gov.pl/pjp-api/rest/station/findAll';

export default class StationsList extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds
        };
    }

    fetchData = () => {
        axios.get(API_PATH).then((resp) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(resp.data)
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
                <ListViewComponent  dataSource={dataSource}
                                   col1='stationName' navigationTo='Details' navigation={navigation}/>
            </View>
        );
    }
}

AppRegistry.registerComponent('StationsList', () => StationsList);
