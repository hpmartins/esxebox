import {
  SET_LAYERS,
} from '../actions'

import layersInitialState from './layersInitialState';

export default function layersReducer(state = layersInitialState.Layers, action) {
  switch (action.type) {
    case SET_LAYERS:
      return action.layers.map((layer, idx) => {
        layer.index = idx;
        layer.Thickness = parseFloat(layer.Thickness);
        return layer;
      });

    default:
      return state;
  }
}
