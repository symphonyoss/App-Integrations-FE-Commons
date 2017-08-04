import {
  GET_MESSAGE_TEMPLATE,
} from '../actions';

const messageTemplate = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGE_TEMPLATE:
      return action.messageTemplate;
    default:
      return state;
  }
};

export default messageTemplate;
