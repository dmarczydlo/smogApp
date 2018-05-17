import React from 'react'
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    View
} from 'react-native'
import {mainColor} from '../../theme';

const Loader = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={mainColor} />
        </View>
    )
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

AppRegistry.registerComponent('Loader', () => Loader);
