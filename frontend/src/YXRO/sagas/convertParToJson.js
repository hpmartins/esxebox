import { put, call, takeEvery } from 'redux-saga/effects';

import { CONVERT_PAR_TO_JSON, setSample, setCalculation, convertParToJson } from '../actions';

function* workerConvertParToJsonSaga(args) {
  const payload = yield call(convertParToJson, args);
  yield put(setSample(payload));
  yield put(setCalculation(payload));
}

export default function* watchConvertParToJsonSaga() {
  yield takeEvery(CONVERT_PAR_TO_JSON, workerConvertParToJsonSaga);
}
