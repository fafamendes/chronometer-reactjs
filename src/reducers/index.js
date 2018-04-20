import { UPDATE, CLEAR } from '../actions';

const initialState = {
  milliseconds: 0,
  initial: Date.now()
}

export default function chronometer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        milliseconds: Date.now() - state.initial,
      };
    case CLEAR:
      return {
        ...state,
        intervalID: clearInterval(state.intervalID),
        initial: Date.now(),
        milliseconds: 0,
      };
    default:
      return {
        ...state
      };
  }
}