import { combineReducers } from 'redux';
import weather from './weather.reducers';

const rootReducer = combineReducers({
    weather: weather
});

export default rootReducer;