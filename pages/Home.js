import React from 'react';
import {AppRegistry, StyleSheet, Text, View, ImageBackground} from 'react-native';
import StationsList from '../components/stationsList';
import ImagesUri from '../assets/air.jpg';

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Stacje pomiarowe'
    };

    render() {
        return (
            <ImageBackground source={ImagesUri} style={styles.background} resizeMode='cover'>
                <View style={styles.container}>
                    <StationsList navigation={this.props.navigation}/>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1
    }
});

AppRegistry.registerComponent('Home', () => Home);
