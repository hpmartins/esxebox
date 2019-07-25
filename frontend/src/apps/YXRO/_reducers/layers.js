import {
  SET_LAYERS,
} from '../actions'

const initialState = [];

export default function setLayersInfo(state = initialState, action) {
  switch (action.type) {
    case SET_LAYERS:
      return action.layers;

    default:
      return state;
  }
}
