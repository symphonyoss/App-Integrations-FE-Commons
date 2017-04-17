import { connect } from 'react-redux';
import {
  getInstanceList,
  getInstanceInfo,
  showNoInstancesFound as showNotFound,
  resetMessage as callResetMessage,
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
});

const mapDispatchToProps = dispatch => ({
  getInstanceList: () => { dispatch(getInstanceList()); },
  showEditInstanceView: (_instance) => { dispatch(getInstanceInfo(_instance)); },
  showNoInstancesFound: () => { dispatch(showNotFound()); },
  resetMessage: () => { dispatch(callResetMessage()); },
});

const TableInstanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableInstance);

export default TableInstanceContainer;
