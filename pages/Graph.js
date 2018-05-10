import React from 'react';
import {AppRegistry, StyleSheet, Text, View, ImageBackground, Dimensions} from 'react-native';
import theme from '../theme';
import Chart from '../components/chart';
import ImagesUri from '../assets/air.jpg';
import BestAir from '../assets/best_air.jpg';
import BadAir from '../assets/bad_air.jpg';

import Carousel from 'react-native-snap-carousel';

export default class Graph extends React.Component {

    state = {
        entries: [
            {
                name: 'Maksimum',
                value: 10,
                image: BestAir
            },
            {
                name: 'Minimum',
                value: 120,
                image: BadAir
            },

        ]
    };

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: params.param.paramName
        }
    };


    _renderItem({item}) {
        return (
            <ImageBackground source={item.image} style={theme.background} resizeMode='cover' blurRadius={0.2}>
                <View style={styles.slide}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            </ImageBackground>
        );
    }

    render() {
        const {navigation} = this.props;
        const {id, param} = navigation.state.params;
        const {width} = Dimensions.get('screen');
        return (
            <ImageBackground source={ImagesUri} style={theme.background} resizeMode='cover'>
                <View style={theme.container}>
                    <View style={styles.top}>
                        <Carousel
                            ref={(c) => {
                                this._carousel = c;
                            }}
                            data={this.state.entries}
                            renderItem={this._renderItem}
                            itemWidth={width}
                            sliderWidth={width}
                        />
                    </View>
                    <View style={styles.bottom}>
                        <Text style={theme.header}>{`Wykres dla ${param.paramName}`}</Text>
                        <Chart style={{flex: 2}} sensorId={id}/>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    top: {
        height: '50%'
    },
    bottom: {
        height: '50%'
    }
});

AppRegistry.registerComponent('Graph', () => Graph);
