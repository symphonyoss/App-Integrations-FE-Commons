import { call, put } from 'redux-saga/effects';
import { getMessageTemplate as getMessageTemplateCall } from './apiCalls';
import {
    FETCH_FAILED,
    GET_MESSAGE_TEMPLATE,
} from '../actions';

export function* getMessageTemplate() {
  try {
    const messageTemplate = yield call(getMessageTemplateCall);
    yield put({ type: GET_MESSAGE_TEMPLATE, messageTemplate });
  } catch (error) {
    yield put({ type: FETCH_FAILED, error });
  }
}
