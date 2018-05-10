import React, {Component} from 'react';
import {AppRegistry, StyleSheet, ScrollView} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';
import axios from 'axios';
import {parse} from "../../utils/object";
import theme from '../../theme';

const API_VALUE_PATH = 'http://api.gios.gov.pl/pjp-api/rest/data/getData/';

export default class Chart extends Component {

    state = {
        chartData: [],
        dimensions: {
            height: 0,
            width: 0,
        },
        chart: {
            type: 'spline',
            width: 3000,
            height: '100%',
            dataFormat: 'json'
        },
        dataSource: {}
    };


    fetchData = () => {
        const {sensorId} = this.props;
        axios.get(`${API_VALUE_PATH}${sensorId}`).then((resp) => {
            let {values} = resp.data;
            values = parse(values);
            this.setState({
                dataSource: {
                    "chart": {
                        "theme": "fint"
                    },
                    data: values
                }
            });
        });
    };

    componentDidMount() {
        this.fetchData();
    }


    onLayout = (e) => {
        const dimensions = {
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        };

        this.setState({
            dimensions
        });

    };

    render() {
        return (
            <ScrollView horizontal={true} style={theme.container} onLayout={this.onLayout}>
                <FusionCharts
                    type={this.state.chart.type}
                    width={this.state.chart.width}
                    height={this.state.chart.height}
                    dataFormat={this.state.chart.dataFormat}
                    dataSource={this.state.dataSource}
                    libraryPath={{uri: 'file:///android_asset/fusioncharts.html'}}
                />
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('Chart', () => Chart);


