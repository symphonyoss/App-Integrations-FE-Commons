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
  let status = {};
  try {
    const state = yield select();
    yield call(setInstance, state.instance);
    if (state.instance.streamType === 'IM') {
      imStream = yield call(createIM);
      if (imStream.id !== undefined) {
        status.message = 'Member added';
        state.instance.streams = [imStream.id];
      }
    } else if (state.instance.streamType === 'CHATROOM') {
      if (state.instance.streams.length > 0) {
        for (const stream in state.instance.streams) {
          if (state.instance.streams[stream]) {
            status = yield call(addMembership, state.instance.streams[stream]);
          }
        }
      }
    }
    if (
      status.message === 'Member added' ||
      status.message === 'Member already part of the room or Xpod request will be processed asynchronously'
    ) {
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
  } else {
    yield put({ type: 'FAILED_OPERATION' });
  }
  } catch (error) {
    yield put({ type: 'FAILED_OPERATION' });
  }
}
