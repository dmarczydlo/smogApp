import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import theme from "../../theme";

export default class Settings extends Component {

    render() {
        return (
            <View style={theme.container}>
                <Text style={theme.headerBox}>Ustawienia</Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('Settings', () => Settings);
