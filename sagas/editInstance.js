import { call, put, select } from 'redux-saga/effects';
import {
  setInstance,
  addMembership,
  editInstance as callEditInstance,
  sendWelcomeMessage,
  createIM,
} from './apiCalls';

export function* editInstance() {
  let imStream;
  let status;
  try {
    const state = yield select();
    yield call(setInstance, state.instance);
    const welcomeRooms = [];
    
    if (state.instance.streamType === 'IM') {
      imStream = yield call(createIM);
      if (imStream.id !== undefined) {
        status = 'ok';
        state.instance.streams = [imStream.id];
        welcomeRooms.push(imStream.id);
      }
    } else if (state.instance.streamType === 'CHATROOM') {
      // add room member ship
      if (state.instance.streams.length > 0) {
        for (const stream in state.instance.streams) {
          if (state.instance.streams[stream]) {
            status = yield call(addMembership, state.instance.streams[stream]);
          }
        }
      }

      // check if some room had receive the welcome message...
      state.instanceList.instances.some((item) => {
        if (item.name === state.instance.name) {
          state.instance.postingLocationRooms.map((room) => {
            let hasWelcome = true;
            item.postingLocationRooms.some((instRoom) => {
              if (instRoom.threadId === room.threadId) {
                hasWelcome = false;
                return true;
              }
              return false;
            });
            if (hasWelcome) {
              welcomeRooms.push(room.threadId);
            }
          });
          return true;
        }
        return false;
      });
    }

    if (status !== undefined) {
      yield call(callEditInstance, state);
      yield put({ type: 'SUCCESSFULLY_UPDATED' });
      if (
          state.instanceList.instances.filter(item => item.streamType === 'IM').length === 0 ||
          state.instance.streamType === 'CHATROOM'
      ) {
        if (welcomeRooms.length > 0) {
          try {
            yield call(sendWelcomeMessage, state.instance.instanceId, welcomeRooms);
          } catch(e) {}
        }
      }
    } else {
      yield put({ type: 'FAILED_OPERATION' });
    }
  } catch (error) {
    yield put({ type: 'FAILED_OPERATION' });
  }
}
