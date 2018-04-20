import { ADD_100MS, CLEAR } from '../actions';

const initialState = {
  milliseconds: 0,
}

export default function chronometer(state = initialState, action) {
  switch (action.type) {
    case ADD_100MS:
      return {
        ...state,
        milliseconds: state.milliseconds += 10,
      };
    case CLEAR:
      return {
        ...state,
        intervalID: clearInterval(state.intervalID),
        milliseconds: 0
      };
    default:
      return {
        ...state
      };
  }
}