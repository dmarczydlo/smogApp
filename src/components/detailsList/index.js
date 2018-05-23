import {connect} from 'react-redux';
import Component from './detailsList';
import {fetchDataForDetails, clearSensorsAndIndexes} from "../../actions/fetch";

const mapStateToProps = (state) => {
    const {sensors, indexes, isConnected} = state.data;
    return {sensors, indexes, isConnected};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchDataForDetails: () => dispatch(fetchDataForDetails(ownProps.stationId)),
        clearSensorsAndIndexes: () => dispatch(clearSensorsAndIndexes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
