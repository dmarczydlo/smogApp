import React, {Component} from 'react';
import {AppRegistry, ListView, ScrollView} from 'react-native';
import ListViewComponent from '../listView';

import axios from 'axios';
import {isObject} from "../../utils/object";
import Chart from "../chart";

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
                <ListViewComponent header='Status' dataSource={indexesSource} col1='label' col2='value'/>
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('DetailsList', () => DetailsList);

