import {connect} from 'react-redux';
import Page from './Details';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
