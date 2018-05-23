import React, {Component} from 'react';
import {AppRegistry, ScrollView} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';
import theme from '../../theme';

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
        }
    };

    componentDidMount() {
        this.props.fetchChartData();
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
        const {chart} = this.props;
        return (
            <ScrollView horizontal={true} style={theme.container} onLayout={this.onLayout}>
                <FusionCharts
                    type={this.state.chart.type}
                    width={this.state.chart.width}
                    height={this.state.chart.height}
                    dataFormat={this.state.chart.dataFormat}
                    dataSource={chart.source}
                    libraryPath={{uri: 'file:///android_asset/fusioncharts.html'}}
                />
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('Chart', () => Chart);


