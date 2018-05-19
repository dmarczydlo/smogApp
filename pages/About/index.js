import React, {Component} from 'react';
import {AppRegistry, View, Text, Image, StyleSheet} from 'react-native';
import theme, {mainColor} from "../../theme";
import Logo from '../../assets/logo.png';


export default class About extends React.Component {

    render() {
        return (
            <View style={theme.container}>
                <Text style={theme.headerBox}>SmogApp Info</Text>
                <Text style={styles.text}>SmogApp to aplikacja prezentująca jakość powietrza dla wybranej stacji pomiarowej.</Text>
                <Text style={styles.text}>Aplikacja została wykonana przy pomocy frameworka ReactNative.</Text>
                <Text style={styles.text}>Autor: Daniel Marczydło</Text>
                <Text style={styles.text}>Wersja: 1.0.0</Text>
                <View style={[styles.box, styles.center]}>
                    <Image source={Logo} style={styles.image} resizeMode="cover"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center'
    },
    box: {
        flex: 1,
        justifyContent: 'center',

    },
    image: {
        height: 200
    },
    text: {
        color: mainColor,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop:5,
        lineHeight: 20,
        textAlign: 'justify'
    }
});

AppRegistry.registerComponent('About', () => About);
