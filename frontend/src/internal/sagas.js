import { all, fork } from 'redux-saga/effects';

import { watchGetLayersSaga } from '../YXRO';
import watchUserAuthentication from '../auth/authSaga';

export default function* root() {
  yield all([
    fork(watchGetLayersSaga),
    fork(watchUserAuthentication),
  ]);
}
