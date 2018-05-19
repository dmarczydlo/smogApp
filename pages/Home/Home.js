import React from 'react';
import {AppRegistry, View} from 'react-native';
import StationsList from '../../components/stationsList';
import theme, {getNavbar} from '../../theme';

export default class Home extends React.Component {

    static navigationOptions = getNavbar('SmogApp');


    render() {
        return (
                <View style={theme.container}>
                    <StationsList navigation={this.props.navigation}/>
                </View>
        );
    }
}

AppRegistry.registerComponent('Home', () => Home);
