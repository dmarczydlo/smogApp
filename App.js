import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import StationsList from './components/stationsList';


export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle = "dark-content" hidden = {false} />
                <StationsList/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 20
    },
});
