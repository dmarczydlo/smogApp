import Graph from "../Graph";
import Home from "../Home";
import {createStackNavigator} from "react-navigation";
import Details from "../Details";
import React, {Component, Fragment} from 'react';
import {NetInfo, Alert} from 'react-native';

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

class Index extends Component {
    state = {
        networkError: false
    };

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
                <Navigator/>
            </Fragment>
        )
    }
}


export default Index;
