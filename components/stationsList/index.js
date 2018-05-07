import React, {Component} from 'react';
import {ListView, StyleSheet, Text, View} from 'react-native';

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

    renderRow = (rowData) => {
        return (
            <View style={styles.item}>
                <Text>{rowData.stationName}</Text>
            </View>
        )
    };

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#ffe4c4',
        alignItems: 'center',
    }
});

