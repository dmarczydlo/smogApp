import React from 'react';
import {AppRegistry, ImageBackground, View} from 'react-native';
import DetailsList from '../../components/detailsList';
import theme from '../../theme';
import ImagesUri from '../../assets/air.jpg';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: `Detale #${params.stationName || params.title}`
        }
    };

    render() {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        return (
            <ImageBackground source={ImagesUri} style={theme.background} resizeMode='cover'>
                <View style={theme.container}>
                    <DetailsList stationId={id} navigation={navigation}/>
                </View>
            </ImageBackground>
        );
    }
}
AppRegistry.registerComponent('Home', () => Home);
