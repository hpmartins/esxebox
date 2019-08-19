import { put, call, takeEvery } from 'redux-saga/effects';
import { CONVERT_JSON_TO_PAR, convertJsonToPar } from '../actions';
import { saveAs } from 'file-saver';

function saveParFile(payload) {
    const blob = new Blob([payload], {type: "text/plain; charset=utf-8"});
    saveAs(blob, 'Template.par');
}

function* workerConvertJsonToParSaga(args) {
  const payload = yield call(convertJsonToPar, args);
  yield call(saveParFile, payload);
}

export default function* watchConvertJsonToParSaga() {
  yield takeEvery(CONVERT_JSON_TO_PAR, workerConvertJsonToParSaga);
}
