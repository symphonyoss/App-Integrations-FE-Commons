import { connect } from 'react-redux';
import {
  getInstanceList as getList,
  getInstanceInfo,
  showNoInstancesFound as showNotFound,
  resetMessage as callResetMessage,
  defaultError as showError,
} from '../../actions';

import TableInstance from './TableInstance';

const mapStateToProps = state => ({
  userId: state.userId,
  appName: state.appParams.appName,
  appIMShortHand: state.appParams.appIMShortHand,
  rooms: state.userRooms,
  instanceList: state.instanceList.instances,
  firstScreen: state.instanceList.firstScreen,
  loading: state.instanceList.loading,
  typeMessage: state.message.type,
  baseWebHookURL: state.instance.baseWebHookURL,
  messageType: state.message.type,
  messageText: state.message.text,
});

const mapDispatchToProps = dispatch => ({
  getInstanceList: () => { dispatch(getList()); },
  showEditInstanceView: (_instance) => { dispatch(getInstanceInfo(_instance)); },
  showNoInstancesFound: () => { dispatch(showNotFound()); },
  resetMessage: () => { dispatch(callResetMessage()); },
  defaultError: () => { dispatch(showError()); },
});

const TableInstanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableInstance);

export default TableInstanceContainer;
