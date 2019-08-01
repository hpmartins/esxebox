import { randomColor } from 'randomcolor';
import {
  SET_LAYERS,
} from '../actions'

import layersInitialState from './layersInitialState';

export function create_normalized_thickness(olist) {
  let out = {}
  let total_thickness = 0
  let z = 0

  const layers = olist.slice().reverse();
  layers.forEach((obj, idx, array) => {
    obj.Thickness = parseFloat(obj.Thickness);
    z = z + obj.Thickness/2
    out[obj.index] = [obj.Thickness, z]
    z = z + obj.Thickness/2
    total_thickness += obj.Thickness
  })

  for (let key in out) {
    out[key][0] /= total_thickness
    out[key][1] /= total_thickness
  }
  return out;
}

export default function layersReducer(state = layersInitialState.Layers, action) {
  switch (action.type) {
    case SET_LAYERS:
      const normalized_thickness = create_normalized_thickness(action.layers);
      return action.layers.map((layer, idx) => {
        layer.NormalizedThickness = normalized_thickness[layer.index];
        layer.index = idx;
        layer.Thickness = parseFloat(layer.Thickness);
        if (!layer.Color) {
          layer.Color = randomColor();
        }
        return layer;
      });

    default:
      return state;
  }
}
