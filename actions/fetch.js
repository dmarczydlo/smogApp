import axios from "axios/index";
import {isObject, parse} from "../utils/object";
import {API_SENSORS_PATH, API_INDEX_PATH, API_STATIONS_PATH, API_VALUE_PATH} from "../utils/paths";


const FETCH_SENSORS_START = 'FETCH_SENSORS_START';
const FETCH_SENSORS_SUCCESS = 'FETCH_SENSORS_SUCCESS';
const FETCH_SENSORS_ERROR = 'FETCH_SENSORS_ERROR';

const FETCH_INDEXES_START = 'FETCH_INDEXES_START';
const FETCH_INDEXES_SUCCESS = 'FETCH_INDEXES_SUCCESS';
const FETCH_INDEXES_ERROR = 'FETCH_INDEXES_ERROR';

const FETCH_STATIONS_START = 'FETCH_STATIONS_START';
const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS';
const FETCH_STATIONS_ERROR = 'FETCH_STATIONS_ERROR';

const FETCH_CHART_DATA_START = 'FETCH_CHART_DATA_START';
const FETCH_CHART_DATA_SUCCESS = 'FETCH_CHART_DATA_SUCCESS';
const FETCH_CHART_DATA_ERROR = 'FETCH_CHART_DATA_ERROR';

const REMOVE_SENSORS_AND_INDEXES = 'REMOVE_SENSORS_AND_INDEXES';


const setFetchSensorStart = () => {
    return {
        type: FETCH_SENSORS_START
    };
};

const setFetchSensorError = (error) => {
    return {
        type: FETCH_SENSORS_ERROR,
        error
    };
};

const setFetchSensorSuccess = (data) => {
    return {
        type: FETCH_SENSORS_SUCCESS,
        data
    };
};

const setFetchIndexesStart = () => {
    return {
        type: FETCH_INDEXES_START
    };
};

const setFetchIndexesError = (error) => {
    return {
        type: FETCH_INDEXES_ERROR,
        error
    };
};

const setFetchIndexesSuccess = (data) => {
    return {
        type: FETCH_INDEXES_SUCCESS,
        data
    };
};

const setFetchStationsStart = () => {
    return {
        type: FETCH_STATIONS_START
    };
};

const setFetchStationsError = (error) => {
    return {
        type: FETCH_STATIONS_ERROR,
        error
    };
};

const setFetchStationsSuccess = (data) => {
    return {
        type: FETCH_STATIONS_SUCCESS,
        data
    };
};

const setFetchChartDataStart = () => {
    return {
        type: FETCH_CHART_DATA_START
    };
};

const setFetchChartDataError = (error) => {
    return {
        type: FETCH_CHART_DATA_ERROR,
        error
    };
};

const setFetchChartDataSuccess = (data) => {
    return {
        type: FETCH_CHART_DATA_SUCCESS,
        data
    };
};

const removeSensorsAndIndexes = () => {
    return {
        type: REMOVE_SENSORS_AND_INDEXES
    };
};

const clearSensorsAndIndexes = () => {
    return (dispatch) => {
        dispatch(removeSensorsAndIndexes());
    };
};

const fetchDataForStations = () => {
    return (dispatch) => {
        dispatch(setFetchStationsStart());
        axios.get(API_STATIONS_PATH).then((resp) => {
            if (resp.data) {
                dispatch(setFetchStationsSuccess(resp.data));
            } else {
                dispatch(setFetchStationsError('Empty data'));
            }
        }).catch(error => setFetchStationsError(error.message));
    }
};

const fetchDataForDetails = (stationId) => {
    return (dispatch) => {
        dispatch(setFetchSensorStart());
        axios.get(`${API_SENSORS_PATH}${stationId}`).then((resp) => {
            if (resp.data) {
                dispatch(setFetchSensorSuccess(resp.data));
            } else {
                dispatch(setFetchSensorError('Empty data'));
            }
        }).catch(error => dispatch(setFetchSensorError(error.message)));

        dispatch(setFetchIndexesStart());
        axios.get(`${API_INDEX_PATH}${stationId}`).then((resp) => {
            if (resp.data) {
                const indexesData = [];
                Object.keys(resp.data).map((elem) => {
                    if (isObject(resp.data[elem])) {
                        indexesData.push({
                            label: elem.replace('IndexLevel', ''),
                            value: resp.data[elem].indexLevelName
                        });
                    }
                });
                dispatch(setFetchIndexesSuccess(indexesData));
            } else {
                dispatch(setFetchIndexesError('Empty data'));
            }
        }).catch(error => dispatch(setFetchIndexesError(error.message)));
    }
};

const fetchChartData = (sensorId) => {
    return (dispatch) => {
        dispatch(setFetchChartDataStart());
        axios.get(`${API_VALUE_PATH}${sensorId}`).then((resp) => {
            if (resp.data) {
                const dataSource = {
                    "chart": {
                        "theme": "fint"
                    },
                    data: parse(resp.data.values)
                };
                dispatch(setFetchChartDataSuccess(dataSource));
            } else {
                dispatch(setFetchChartDataError('Empty data'));
            }
        }).catch(error => dispatch(setFetchChartDataError(error.message)));
    }
};

export {
    fetchDataForDetails,
    clearSensorsAndIndexes,
    fetchDataForStations,
    fetchChartData,
    FETCH_SENSORS_SUCCESS,
    FETCH_SENSORS_ERROR,
    FETCH_SENSORS_START,
    FETCH_INDEXES_SUCCESS,
    FETCH_INDEXES_ERROR,
    FETCH_INDEXES_START,
    REMOVE_SENSORS_AND_INDEXES,
    FETCH_STATIONS_ERROR,
    FETCH_STATIONS_START,
    FETCH_STATIONS_SUCCESS,
    FETCH_CHART_DATA_SUCCESS,
    FETCH_CHART_DATA_ERROR,
    FETCH_CHART_DATA_START
}
