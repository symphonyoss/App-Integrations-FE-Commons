import { connect } from 'react-redux';
import {
  saveInstance,
  editInstance,
  removeInstance,
  resetMessage as callResetMessage,
  showRequireName as showName,
  showRequireRooms as showRooms,
  hideRequireName as hideName,
  hideRequireRooms as hideRooms,
} from '../../actions';
import SubmitInstance from './SubmitInstance';

let store = {};

const mapStateToProps = (state) => {
  store = Object.assign({}, state.instance);
  return {
    saved: state.instance.saved,
    name: state.instance.name,
    streamType: state.instance.streamType,
    postingRooms: state.instance.streams,
    instanceList: state.instanceList.instances,
  };
};

const mapDispatchToProps = dispatch => ({
  saveInstance: () => { dispatch(saveInstance(store)); },
  editInstance: () => { dispatch(editInstance(store)); },
  removeInstance: () => { dispatch(removeInstance(store)); },
  resetMessage: () => { dispatch(callResetMessage()); },
  showRequireName: () => { dispatch(showName()); },
  showRequireRooms: () => { dispatch(showRooms()); },
  hideRequireName: () => { dispatch(hideName()); },
  hideRequireRooms: () => { dispatch(hideRooms()); },
});

const SubmitInstanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitInstance);

export default SubmitInstanceContainer;
