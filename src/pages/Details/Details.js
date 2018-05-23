import React from 'react';
import {AppRegistry, View} from 'react-native';
import DetailsList from '../../components/detailsList';
import theme, {getNavbar} from '../../theme';

export default class Home extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return getNavbar(`Detale #${params.stationName || params.title}`);
    }

    render() {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        return (
                <View style={theme.container}>
                    <DetailsList stationId={id} navigation={navigation}/>
                </View>
        );
    }
}
AppRegistry.registerComponent('Home', () => Home);
