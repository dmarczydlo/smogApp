import {connect} from 'react-redux';
import Component from './stationsList';
import {fetchDataForStations} from "../../actions/fetch";

const mapStateToProps = (state) => {
    const {data} = state;
    return data;
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataForStations: () => dispatch(fetchDataForStations())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
