import React, {Component, Fragment} from 'react';
import {ListView, StyleSheet, Text, View, TouchableHighlight, AppRegistry} from 'react-native';
import PropTypes from 'prop-types';
import {getData} from "../../utils/object";
import Loader from '../loader';


const child = (rowData, col1, col2 = '') => {
    return (
        <View style={styles.item}>
            <Text>{col2 ? `${getData(rowData, col1)} : ${getData(rowData, col2)}` : getData(rowData, col1)} </Text>
        </View>
    );
};

export default class ListViewComponent extends Component {

    renderRow = (rowData, col1, col2 = '', navigateTo = '') => {
        return (
            <Fragment>
                {navigateTo ?
                    <TouchableHighlight onPress={() => this.onPress(rowData, navigateTo)}>
                        {child(rowData, col1, col2)}
                    </TouchableHighlight> :
                    child(rowData, col1, col2)
                }
            </Fragment>
        );
    };

    onPress = (rowData, navigateTo) => {
        this.props.navigation.navigate(navigateTo, rowData);
    };

    render() {
        const {navigationTo, header, col1, col2, dataSource, customRenderRow} = this.props;

        return (
            <View>
                {header && <Text style={styles.header}>{header}</Text>}
                {dataSource.getRowCount() ? <ListView
                        dataSource={dataSource}
                        renderRow={(rowData) => customRenderRow ? customRenderRow(rowData) : this.renderRow(rowData, col1, col2, navigationTo)}
                    /> :
                    <Loader/>
                }
            </View>
        );
    };
}


const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    header: {
        fontSize: 16,
        padding: 4,
        textAlign: 'center'
    }
});

ListViewComponent.propTypes = {
    header: PropTypes.string,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    col1: PropTypes.string.isRequired,
    col2: PropTypes.string,
    navigationTo: PropTypes.string,
    navigation: PropTypes.object,
    customRenderRow: PropTypes.func,
};

ListViewComponent.defaultProps = {
    col2: '',
    navigationTo: '',
    navigation: {},
    customRenderRow: null
};

AppRegistry.registerComponent('ListViewComponent', () => ListViewComponent);
