import { put, call, takeEvery } from 'redux-saga/effects';

import { GET_LAYERS, setLayers, getLayers } from '../actions';

function* workerGetLayersSaga(args) {
  const layers = yield call(getLayers, args);
  yield put(setLayers(layers));
}

export default function* watchGetLayersSaga() {
  yield takeEvery(GET_LAYERS, workerGetLayersSaga);
}
