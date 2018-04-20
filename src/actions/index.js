export const ADD_100MS = 'ADD_MS';
export const CLEAR = 'CLEAR';

export function add_100ms() {
  return { type: ADD_100MS };
}

export function clear() {
  return { type: CLEAR };
}
