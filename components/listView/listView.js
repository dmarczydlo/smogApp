import React, {Component, Fragment} from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AppRegistry,
    TextInput,
    Modal
} from 'react-native';
import Button from '../button';
import Map from '../map';
import PropTypes from 'prop-types';
import {getData, filterData, markersParse} from "../../utils/object";
import Loader from '../loader';
import theme, {mainColor, backColor, backColorSecond} from '../../theme';

const child = (rowData, col1, col2 = '') => {
    return (
        <View style={styles.item}>
            <Text>{col2 ? `${getData(rowData, col1)} : ${getData(rowData, col2)}` : getData(rowData, col1)} </Text>
        </View>
    );
};

const icon = {
    width: '50%',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    fontSize: 30
};

const close = {
    width: '15%',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    fontSize: 30
};

export default class ListViewComponent extends Component {

    state = {
        showModal: false,
        showSearch: false,
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

    onButtonPress = () => {
        this.setState({
            showModal: true
        });
    };

    onSearchPress = () => {
        this.setState({
            showSearch: true
        });
    };

    onSearchClose = () => {
        const {object, filterBy} = this.props;
        this.setState({
            showSearch: false,
            search: '',
            dataSource: this.state.dataSource.cloneWithRows(filterData(object.source, filterBy, ''))
        });
    };

    onCloseModal = (radius) => {
        if (Number.isInteger(radius)) {
            const {object} = this.props;
            const {latitude, longitude} = this.props.locationData;

            if (latitude && longitude) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(filterData(object.source, ['gegrLat', 'gegrLon'], [latitude, longitude, radius], 'distance'))
                });
            }
        }
        this.setState({showModal: false});
    };

    render() {
        const {showSearch, search, dataSource, showModal} = this.state;
        const {navigationTo, navigation, header, col1, col2, customRenderRow, filter, object, location, locationData} = this.props;
        return (
            <View style={styles.main}>
                <Fragment>
                    {filter && <View style={styles.topContainer}>
                        <View style={styles.search}>
                            {showSearch && <View style={styles.topContainer}>
                                <TextInput
                                    autoCorrect={false}
                                    style={styles.searchText}
                                    placeholderTextColor={'white'}
                                    underlineColorAndroid={'white'}
                                    placeholder="Szukaj"
                                    value={search}
                                    onChangeText={this.onChangeSearch}
                                />
                                <Button
                                    onPress={this.onSearchClose}
                                    icon='close'
                                    style={close}

                                /></View>
                            }
                        </View>
                        <View style={styles.icons}>
                            <Button
                                onPress={this.onSearchPress}
                                icon='search'
                                style={icon}

                            />
                            {location && <Button
                                disabled={locationData.latitude === null}
                                onPress={this.onButtonPress}
                                icon='edit-location'
                                style={icon}
                            />}
                        </View>
                    </View>}

                    {header && <View style={styles.headerBox}><Text style={theme.subHeader}>{header}</Text></View>}
                    {filter && location && <Modal
                        animationType="slide"
                        transparent={false}
                        visible={showModal}
                        onRequestClose={this.onCloseModal}>
                        <View>
                            <Map onClose={this.onCloseModal} navigation={navigation} locationData={locationData}
                                 markers={markersParse(object.source)}/>
                        </View>
                    </Modal>}
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
        marginTop: 1,
        backgroundColor: mainColor,
        alignItems: 'center',
    },
    icons: {
        width: '30%',
        flexDirection: 'row',
        marginLeft: 'auto',
        height: 50
    },
    search: {
        width: '75%',
        height: 50,
        marginLeft: 10,
        marginRight: 10
    },
    searchText: {
        width: '80%',
        color: mainColor
    },
    topContainer: {
        flexDirection: 'row',
    },
    headerBox: {
        backgroundColor: backColorSecond,
    },
    main: {
        marginTop: 5,
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
    filterBy: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    query: PropTypes.array,
    filterMethod: PropTypes.string,
    location: PropTypes.bool,
    locationData: PropTypes.object
};

ListViewComponent.defaultProps = {
    col2: '',
    navigationTo: '',
    navigation: {},
    customRenderRow: null,
    filter: false,
    filterBy: '',
    query: [],
    filterMethod: 'like',
    location: false,
    locationData: {}
};

AppRegistry.registerComponent('ListViewComponent', () => ListViewComponent);
