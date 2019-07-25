import { all, fork } from 'redux-saga/effects';

import { watchGetLayersSaga } from '../apps/YXRO';

export default function* root() {
  yield all([
    fork(watchGetLayersSaga),
  ]);
}
