import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import PureChart from 'react-native-pure-chart';
import axios from 'axios';
import {parse} from "../../utils/object";
import Loader from '../loader';

const API_VALUE_PATH = 'http://api.gios.gov.pl/pjp-api/rest/data/getData/';

export default class Chart extends Component {

    state = {
        chartData: []
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

    render() {

        const {chartData} = this.state;

        return (
            <View style={styles.container}>
                {chartData.length ? <PureChart data={chartData} type='line'/> : <Loader/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
});

AppRegistry.registerComponent('Chart', () => Chart);


