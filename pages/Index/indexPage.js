import Graph from "../Graph";
import Home from "../Home";
import {createStackNavigator} from "react-navigation";
import Details from "../Details";
import About from '../About';
import Settings from '../Settings';
import React, {Component, Fragment} from 'react';
import {NetInfo, Alert, Dimensions, StyleSheet} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import {backColorSecond, mainColor, backColor} from "../../theme";
import Icon from 'react-native-vector-icons/Feather'

const Navigator = createStackNavigator({
        Home: {
            screen: Home
        },
        Details: {
            screen: Details,
        },
        Graph: {
            screen: Graph,
        },
    },
    {
        initialRouteName: 'Home',
    }
);

const initialLayout = {
    height: 20,
    width: Dimensions.get('window').width,
};

class Index extends Component {
    state = {
        networkError: false,
        index: 0,
        routes: [
            {key: 'home', icon: 'wind'},
            {key: 'about',  icon: 'info'},
            {key: 'settings', icon: 'settings'},
        ],
    };

    _handleIndexChange = index => this.setState({index});

    _renderIcon = ({ route }) => (
        <Icon name={route.icon} size={24}  style={{color: mainColor}}/>
    );

    _renderFooter = props => {
        return <TabBar {...props}
                       indicatorStyle={styles.indicator}
                       style={styles.tabBar}
                       labelStyle={styles.label}
                       renderIcon={this._renderIcon}

        />
    };

    _renderScene = SceneMap({
        home: Navigator,
        about: About,
        settings: Settings,
    });

    componentDidMount() {

        NetInfo.getConnectionInfo().then(this.handleConnectivityChange);
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = async (status) => {
        if (status.type === 'none') {
            Alert.alert(
                'Alert',
                'Brak połączenia z internetem!',
                [
                    {text: 'OK'},
                ],
                {cancelable: true}
            )
        }
        this.props.setIntenetConnectionForApp(status.type !== 'none');
    };

    render() {
        return (
            <Fragment>
                <TabViewAnimated
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderFooter={this._renderFooter}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    indicator: {
        backgroundColor: mainColor
    },
    label: {
        color: mainColor
    },
    tabBar: {
        backgroundColor: backColorSecond
    }
});


export default Index;
