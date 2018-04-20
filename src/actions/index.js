export const UPDATE = 'ADD_MS';
export const CLEAR = 'CLEAR';

export function update() {
  return { type: UPDATE };
}

export function clear() {
  return { type: CLEAR };
}
