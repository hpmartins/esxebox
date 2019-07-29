import { combineReducers } from 'redux'

import { layersReducer } from './_reducers'
import { watchGetLayersSaga } from './_sagas'

import YXRO from './YXRO';

// YXRO main App
export default YXRO;

// yxroApp reducers
const yxroAppReducer = combineReducers({
  layers: layersReducer,
})
export { yxroAppReducer }

// yxroApp sagas
export { watchGetLayersSaga }
