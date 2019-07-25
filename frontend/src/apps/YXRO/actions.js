import { dataProvider } from '../../internals';

export const SET_LAYERS = 'SET_LAYERS';
export function setLayers(layers) {
  return {
    type: SET_LAYERS,
    layers
  };
}

export const GET_LAYERS = 'GET_LAYERS';
export function getLayersSaga(parfile) {
  return {
    type: GET_LAYERS,
    parfile
  };
}

export async function getLayers(data) {
  return dataProvider('yxro/par2json', {parfile: data.parfile})
    .then(response => {
      const alldata = JSON.parse(response.parfile);
      return alldata.Layers;
    });
}