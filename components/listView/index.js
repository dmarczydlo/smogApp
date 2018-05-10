import React, {Component, Fragment} from 'react';
import {ListView, StyleSheet, Text, View, TouchableHighlight, AppRegistry, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {getData} from "../../utils/object";
import Loader from '../loader';
import theme from '../../theme';


const child = (rowData, col1, col2 = '') => {
    return (
        <View style={styles.item}>
            <Text>{col2 ? `${getData(rowData, col1)} : ${getData(rowData, col2)}` : getData(rowData, col1)} </Text>
        </View>
    );
};

export default class ListViewComponent extends Component {

    state = {
        search: ''
    };

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

    onChangeSearch = (value) => {
        console.log(value);
    };

    render() {
        const {navigationTo, header, col1, col2, dataSource, customRenderRow} = this.props;

        return (
            <View>
                {header && <Text style={theme.subHeader}>{header}</Text>}
                {dataSource.getRowCount() ? <Fragment>
                        <TextInput
                            autoCorrect={false}
                            placeholder="Szukaj"
                            value={this.state.search}
                            onChangeText={this.onChangeSearch}
                        />
                        <ListView
                            dataSource={dataSource}
                            renderRow={(rowData) => customRenderRow ? customRenderRow(rowData) : this.renderRow(rowData, col1, col2, navigationTo)}
                        />
                    </Fragment> :
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
