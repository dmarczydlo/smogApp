import React, {Component} from 'react';
import {AppRegistry, ScrollView, View, Text, StyleSheet} from 'react-native';
import ListViewComponent from '../listView'
import {getIndex} from "../../utils/airIndex";

export default class DetailsList extends Component {

    componentDidMount() {
        this.props.fetchDataForDetails();
    }

    componentWillUnmount() {
        this.props.clearSensorsAndIndexes();
    }

    customRenderRow = (rowData) => {
        return (
            <View style={styles.item}>
                <View style={{
                    backgroundColor: getIndex(rowData.value).color,
                    borderRadius: 100,
                    height: 20,
                    width: 20,
                    marginRight: 10
                }}>
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
        const {navigation, sensors, indexes} = this.props;
        return (
            <ScrollView
                vertical
                pagingEnabled
            >
                <ListViewComponent header='Dostępne sensory' dataSource={sensors.source}
                                   col1='param.paramName' navigationTo='Graph' navigation={navigation}/>
                <ListViewComponent header='Status' dataSource={indexes.source} col1='label' col2='value'
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

