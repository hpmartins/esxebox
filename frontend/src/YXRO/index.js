import { combineReducers } from 'redux'

import sampleReducer from './reducers/sampleReducer'
import calculationReducer from './reducers/calculationReducer'

import watchConvertParToJsonSaga from './sagas/convertParToJson'
import watchConvertJsonToParSaga from './sagas/convertJsonToPar'

import YXRO from './YXRO';

// YXRO main App
export default YXRO;

// yxroApp reducers
const yxroAppReducer = combineReducers({
  sample: sampleReducer,
  calculation: calculationReducer,
})
export { yxroAppReducer }

// yxroApp sagas
export { watchConvertParToJsonSaga, watchConvertJsonToParSaga }
