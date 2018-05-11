import {
    FETCH_INDEXES_ERROR,
    FETCH_INDEXES_START,
    FETCH_INDEXES_SUCCESS,
    FETCH_SENSORS_START,
    FETCH_SENSORS_ERROR,
    FETCH_SENSORS_SUCCESS,
    REMOVE_SENSORS_AND_INDEXES,
    FETCH_STATIONS_SUCCESS,
    FETCH_STATIONS_START,
    FETCH_STATIONS_ERROR,
    FETCH_CHART_DATA_START,
    FETCH_CHART_DATA_ERROR,
    FETCH_CHART_DATA_SUCCESS
} from "../actions/fetch";

const initialState = {
    sensors: {
        fetching: false,
        source: [],
        error: ''
    },
    indexes: {
        fetching: false,
        source: [],
        error: ''
    },
    stations: {
        fetching: false,
        source: [],
        error: ''
    },
    chart: {
        fetching: false,
        source: [],
        error: ''
    }
};

const setStart = (object, state) => {
    return {...state, [object]: {...state[object], fetching: true}};
};

const setError = (object, state, action) => {
    return {...state, [object]: {...state[object], fetching: false, error: action.error}};
};

const setSuccess = (object, state, action) => {
    return {...state, [object]: {...state[object], fetching: false, source: action.data}};
};


const dataReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_SENSORS_START: {
            return setStart('sensors', state);
        }

        case FETCH_SENSORS_ERROR: {
            return setError('sensors', state, action);
        }

        case FETCH_SENSORS_SUCCESS: {
            return setSuccess('sensors', state, action);
        }

        case FETCH_INDEXES_START: {
            return setStart('indexes', state);
        }

        case FETCH_INDEXES_ERROR: {
            return setError('indexes', state, action);
        }

        case FETCH_INDEXES_SUCCESS: {
            return setSuccess('indexes', state, action);
        }

        case FETCH_STATIONS_START: {
            return setStart('stations', state);
        }

        case FETCH_STATIONS_ERROR: {
            return setError('stations', state, action);
        }

        case FETCH_STATIONS_SUCCESS: {
            return setSuccess('stations', state, action);
        }

        case FETCH_CHART_DATA_START: {
            return setStart('chart', state);
        }

        case FETCH_CHART_DATA_ERROR: {
            return setError('chart', state, action);
        }

        case FETCH_CHART_DATA_SUCCESS: {
            return setSuccess('chart', state, action);
        }

        case REMOVE_SENSORS_AND_INDEXES: {
            return {
                ...state, sensors: initialState.sensors, indexes: initialState.indexes
            }
        }

        default:
            return state;
    }
};

export default dataReducer;
