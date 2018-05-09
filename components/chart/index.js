import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
import PureChart from 'react-native-pure-chart';
import axios from 'axios';
import {parse} from "../../utils/object";
import Loader from '../loader';

const API_VALUE_PATH = 'http://api.gios.gov.pl/pjp-api/rest/data/getData/';

export default class Chart extends Component {

    state = {
        chartData: [],
        dimensions: {
            height: 0,
            width: 0
        }
    };

    fetchData = () => {
        const {sensorId} = this.props;
        axios.get(`${API_VALUE_PATH}${sensorId}`).then((resp) => {
            let {values} = resp.data;
            values = parse(values);
            this.setState({
                chartData: values
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
        const {chartData, dimensions} = this.state;

        return (
            <View style={styles.container} onLayout={this.onLayout}>
                {chartData.length ? <PureChart data={chartData} height={dimensions.height} type='line'/> : <Loader/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

AppRegistry.registerComponent('Chart', () => Chart);


