import {connect} from 'react-redux';
import Component from './stationsList';
import {fetchDataForStations} from "../../actions/fetch";

const mapStateToProps = (state) => {
    const {stations, isConnected} = state.data;
    return {stations, isConnected};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataForStations: () => dispatch(fetchDataForStations())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
