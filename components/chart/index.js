import {connect} from 'react-redux';
import Component from './chart';
import {fetchChartData} from "../../actions/fetch";

const mapStateToProps = (state) => {
    const {chart} = state.data;
    return {chart};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchChartData: () => dispatch(fetchChartData(ownProps.sensorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
