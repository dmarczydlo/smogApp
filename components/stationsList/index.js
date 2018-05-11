import {connect} from 'react-redux';
import Component from './stationsList';
import {fetchDataForStations} from "../../actions/fetch";

const mapStateToProps = (state) => {
    const {stations} = state.data;
    return {stations};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataForStations: () => dispatch(fetchDataForStations())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
