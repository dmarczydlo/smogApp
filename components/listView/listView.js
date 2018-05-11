import React, {Component, Fragment} from 'react';
import {ListView, StyleSheet, Text, View, TouchableHighlight, AppRegistry, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {getData, filterData} from "../../utils/object";
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
        search: '',
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {dataSource, filterBy, filter} = nextProps;
        if (nextProps.dataSource) {
            return {
                dataSource: prevState.dataSource.cloneWithRows(filter ? filterData(dataSource, filterBy, prevState.search) : nextProps.dataSource)
            }
        }
    }

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

    onChangeSearch = (search) => {
        const {dataSource, filterBy} = this.props;
        this.setState({
            search,
            dataSource: this.state.dataSource.cloneWithRows(filterData(dataSource, filterBy, this.state.search))
        });
    };


    render() {
        const {search, dataSource} = this.state;
        const {navigationTo, header, col1, col2, customRenderRow, filter, filterBy} = this.props;

        return (
            <View>
                {header && <Text style={theme.subHeader}>{header}</Text>}
                <Fragment>
                    {filter && <TextInput
                        autoCorrect={false}
                        placeholder="Szukaj"
                        value={search}
                        onChangeText={this.onChangeSearch}
                    />
                    }
                    {dataSource.getRowCount() ? <ListView
                            dataSource={dataSource}
                            renderRow={(rowData) => customRenderRow ? customRenderRow(rowData) : this.renderRow(rowData, col1, col2, navigationTo)}
                        /> :
                        <Loader/>}
                </Fragment>
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
    filter: PropTypes.bool,
    filterBy: PropTypes.string
};

ListViewComponent.defaultProps = {
    col2: '',
    navigationTo: '',
    navigation: {},
    customRenderRow: null,
    filter: false,
    filterBy: ''
};

AppRegistry.registerComponent('ListViewComponent', () => ListViewComponent);
