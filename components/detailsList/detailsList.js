import React, {Component} from 'react';
import {AppRegistry, ScrollView, View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import ListViewComponent from '../listView'
import {getIndex} from "../../utils/airIndex";
import {mainColor} from "../../theme";
import Icon from 'react-native-vector-icons/Feather';

export default class DetailsList extends Component {

    state = {
        isConnected: this.props.isConneted
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.isConnected !== prevState.isConnected) {
            nextProps.fetchDataForDetails();
            return {
                isConnected: nextProps.isConnected
            }
        }
        return null;
    }


    componentWillUnmount() {
        this.props.clearSensorsAndIndexes();
    }

    customRenderStatusRow = (rowData) => {
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

    onPress = (rowData, navigateTo) => {
        this.props.navigation.navigate(navigateTo, rowData);
    };

    customRenderSensorsRow = (rowData) => {
        return (
            <TouchableHighlight onPress={() => this.onPress(rowData, 'Graph')}>
                <View style={styles.item}>
                    <View style={{width: '20%'}}>
                        <Icon name={'wind'} style={{fontSize: 20}}/>
                    </View>
                    <View style={{width: '80%'}}>
                        <Text>{rowData.param.paramName}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    };

    render() {
        const {sensors, indexes} = this.props;
        return (
            <ScrollView
                vertical
                pagingEnabled
            >
                <ListViewComponent header='Dostępne sensory' object={sensors}
                                   col1='param.paramName' customRenderRow={this.customRenderSensorsRow}/>
                <ListViewComponent header='Status' object={indexes} col1='label' col2='value'
                                   customRenderRow={this.customRenderStatusRow}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginTop: 1,
        backgroundColor: mainColor,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    }
});

AppRegistry.registerComponent('DetailsList', () => DetailsList);

