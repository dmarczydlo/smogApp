import {connect} from 'react-redux';
import Component from './listView';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
