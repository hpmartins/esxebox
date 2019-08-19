import {
    randomColor
} from 'randomcolor';

import {
    SET_SAMPLE,
    SET_SAMPLE_LAYERS,
} from '../actions';

import sampleInitialState from './sampleInitialState';

export function create_normalized_thickness(olist) {
    let out = {}
    let total_thickness = 0
    let z = 0

    const layers = olist.slice().reverse();
    layers.forEach((obj, idx, array) => {
        obj.Thickness = parseFloat(obj.Thickness);
        z = z + obj.Thickness / 2
        out[obj.index] = [obj.Thickness, z]
        z = z + obj.Thickness / 2
        total_thickness += obj.Thickness
    })

    for (let key in out) {
        out[key][0] /= total_thickness
        out[key][1] /= total_thickness
    }
    return out;
}

function unique_sample_colors(layers) {
    const unique_colors = [...new Set(layers.map(layer => layer.Color))];
    const colors = {};
    if (unique_colors.length === 1 && !unique_colors[0]) {
        const unique_layers = [...new Set(layers.map(layer => layer.Name))];
        unique_layers.forEach((obj, idx, array) => {
            colors[obj] = randomColor();
        })
    }
    return colors;
}

function redefine_sample_layers(layers) {
    const new_layers = layers.slice();
    const normalized_thickness = create_normalized_thickness(new_layers);
    const colors = unique_sample_colors(new_layers);
    return new_layers.map((layer, idx) => {
        layer.NormalizedThickness = normalized_thickness[layer.index];
        layer.index = idx;
        layer.Thickness = parseFloat(layer.Thickness);
        if (!layer.Color) {
            layer.Color = colors[layer.Name] || randomColor();
        }
        return layer;
    });
}

export default function sampleReducer(state = sampleInitialState, action) {
    switch (action.type) {
        case SET_SAMPLE_LAYERS:
            return {...state, layers: redefine_sample_layers(action.payload)};

        case SET_SAMPLE:
            return {
                vacuum: action.payload.vacuum,
                layers: redefine_sample_layers(action.payload.layers),
                substrate: action.payload.substrate,
            }

        default:
            return state;
    }
}
