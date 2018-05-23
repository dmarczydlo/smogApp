import {connect} from 'react-redux';
import Page from './indexPage';
import {setIntenetConnectionForApp} from '../../actions/fetch';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIntenetConnectionForApp: (isConnected) => dispatch(setIntenetConnectionForApp(isConnected))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
