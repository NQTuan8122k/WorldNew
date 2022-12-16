import {all, fork} from 'redux-saga/effects';

import rootUser from './user/user.saga';

export default function* rootSaga() {
  yield all([
    // fork(listProductSaga),
    fork(rootUser),
  ]);
}
