import { GET_WEATHER_DATA } from "../actions/index";

export default function weatherReducer(state = {}, action) {
  switch (action.type) {
    case GET_WEATHER_DATA:
      return action.payload.data;
    default:
      return state;
  }
}
