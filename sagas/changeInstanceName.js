import { put } from 'redux-saga/effects';

export function* changeInstanceName(value) {
  try {
    yield put({ type: 'CHANGE_INSTANCE_NAME', name: value });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}
