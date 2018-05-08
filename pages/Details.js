import React from 'react';
import {AppRegistry, StyleSheet, ImageBackground, View} from 'react-native';
import DetailsList from '../components/detailsList';
import ImagesUri from '../assets/air.jpg';

export default class Home extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: `Detale #${params.stationName}`
        }
    };

    render() {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        return (
            <ImageBackground source={ImagesUri} style={styles.background} resizeMode='cover'>
                <View style={styles.container}>
                    <DetailsList stationId={id} navigation={navigation}/>
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
