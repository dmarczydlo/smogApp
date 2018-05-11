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
        const {object, filterBy, filter, filterMethod} = nextProps;
        if (object.source) {
            return {
                dataSource: prevState.dataSource.cloneWithRows(filter ? filterData(object.source, filterBy, nextProps.query.length ? nextProps.query : prevState.search, filterMethod) : object.source)
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
        const {object, filterBy} = this.props;
        this.setState({
            search,
            dataSource: this.state.dataSource.cloneWithRows(filterData(object.source, filterBy, search))
        });
    };


    render() {
        const {search, dataSource} = this.state;
        const {navigationTo, header, col1, col2, customRenderRow, filter, object} = this.props;
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
                    {!object.fetching ? <ListView
                            enableEmptySections={true}
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
    object: PropTypes.object.isRequired,
    col1: PropTypes.string.isRequired,
    col2: PropTypes.string,
    navigationTo: PropTypes.string,
    navigation: PropTypes.object,
    customRenderRow: PropTypes.func,
    filter: PropTypes.bool,
    filterBy: PropTypes.string,
    query: PropTypes.array,
    filterMethod: PropTypes.string
};

ListViewComponent.defaultProps = {
    col2: '',
    navigationTo: '',
    navigation: {},
    customRenderRow: null,
    filter: false,
    filterBy: '',
    query: [],
    filterMethod: 'like'
};

AppRegistry.registerComponent('ListViewComponent', () => ListViewComponent);
