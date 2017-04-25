import { connect } from 'react-redux';
import {
  addStreamToInstance,
  removeStreamFromInstance,
  resetPostingLocationRooms,
  updateRooms as updatePostingRooms,
} from '../../../actions/';

import SuggestionsRooms from './SuggestionsRooms';

const mapStateToProps = state => ({
  userRooms: state.userRooms,
  filters: state.instance.postingLocationRooms,
});

const mapDispatchToProps = dispatch => ({
  addStreamToInstance: (room) => { dispatch(addStreamToInstance(room)); },
  removeStreamFromInstance: (room) => { dispatch(removeStreamFromInstance(room)); },
  resetPostingLocation: () => { dispatch(resetPostingLocationRooms()); },
  updateRooms: () => { dispatch(updatePostingRooms()); },
});

const SuggestionsRoomsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestionsRooms);

export default SuggestionsRoomsContainer;
