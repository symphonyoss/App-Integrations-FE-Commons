import { call, put, select } from 'redux-saga/effects';
import {
  setInstance,
  addMembership,
  editInstance as callEditInstance,
  createIM,
  sendWelcomeMessage,
} from './apiCalls';

export function* editInstance() {
  let imStream;
  try {
    const state = yield select();
    yield call(setInstance, state.instance);
    if (state.instance.streamType === 'IM') {
      imStream = yield call(createIM);
      state.instance.streams.push(imStream.id);
    } else if (state.instance.streamType === 'CHATROOM') {
      if (state.instance.streams.length > 0) {
        for (const stream in state.instance.streams) {
          if (state.instance.streams[stream]) {
            try {
              yield call(addMembership, state.instance.streams[stream]);
            } catch (error) {
              yield put({ type: 'ADD_MEMBER_SHIP_FAILED', error });
            }
          }
        }
      }
    }
    yield call(callEditInstance, state);
    yield put({ type: 'SUCCESSFULLY_UPDATED' });
    if (
        state.instanceList.instances.filter(item => item.streamType === 'IM').length === 0 ||
        state.instance.streamType === 'CHATROOM'
      ) {
      try {
        yield call(sendWelcomeMessage, state.instance);
      } catch(e) {}
    }
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
    yield put({ type: 'FAILED_OPERATION' });
  }
}
