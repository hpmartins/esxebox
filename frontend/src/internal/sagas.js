import { all, fork } from 'redux-saga/effects';

import { watchConvertParToJsonSaga, watchConvertJsonToParSaga } from '../YXRO';
import watchUserAuthentication from '../auth/authSaga';

export default function* root() {
  yield all([
    fork(watchConvertParToJsonSaga),
    fork(watchConvertJsonToParSaga),
    fork(watchUserAuthentication),
  ]);
}
