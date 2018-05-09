import React, {Component} from 'react';
import {AppRegistry, ListView, ScrollView, View, Text, StyleSheet} from 'react-native';
import ListViewComponent from '../listView';

import axios from 'axios';
import {isObject} from "../../utils/object";
import {getIndex} from "../../utils/airIndex";

const API_SENSORS_PATH = 'http://api.gios.gov.pl/pjp-api/rest/station/sensors/';
const API_INDEX_PATH = 'http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/';


export default class DetailsList extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            sensorsSource: ds,
            indexesSource: ds

        };
    }

    fetchData = () => {
        const {stationId} = this.props;
        axios.get(`${API_SENSORS_PATH}${stationId}`).then((resp) => {
            this.setState({
                sensorsSource: this.state.sensorsSource.cloneWithRows(resp.data)
            });
        });

        axios.get(`${API_INDEX_PATH}${stationId}`).then((resp) => {
            if (resp.data) {
                const indexesData = [];
                Object.keys(resp.data).map((elem) => {
                    if (isObject(resp.data[elem])) {

                        indexesData.push({
                            label: elem.replace('IndexLevel', ''),
                            value: resp.data[elem].indexLevelName
                        });
                    }
                });
                this.setState({
                    indexesSource: this.state.indexesSource.cloneWithRows(indexesData)
                });
            }
        });
    };

    componentDidMount() {
        this.fetchData();
    }

    customRenderRow = (rowData) => {
        return (
            <View style={styles.item}>
                <View style={{backgroundColor: getIndex(rowData.value).color, borderRadius: 100, height: 20, width: 20, marginRight: 10}}>
                </View>
                <View style={{width: '20%'}}>
                    <Text>{rowData.label}</Text>
                </View>
                <View style={{width: '70%'}}>
                    <Text>{rowData.value}</Text>
                </View>
            </View>
        )
    };

    render() {
        const {navigation} = this.props;
        const {sensorsSource, indexesSource} = this.state;
        return (
            <ScrollView
                vertical
                pagingEnabled
            >
                <ListViewComponent header='Dostępne sensory' dataSource={sensorsSource}
                                   col1='param.paramName' navigationTo='Graph' navigation={navigation}/>
                <ListViewComponent header='Status' dataSource={indexesSource} col1='label' col2='value'
                                   customRenderRow={this.customRenderRow}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    }
});

AppRegistry.registerComponent('DetailsList', () => DetailsList);

