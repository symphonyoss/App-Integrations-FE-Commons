import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';
import {
  operations,
} from '../../actions';
import '../../styles/main.less';

export class SubmitInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: 'Add',
      requireNameVisible: false,
      requireRoomsVisible: false,
    };
    this.dispatchActions = this.dispatchActions.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  componentWillMount() {
    switch (this.props.operation) {
      case operations.UPDATE:
        this.setState({
          label: 'Update',
        });
        break;
      case operations.REMOVE:
        this.setState({
          label: 'Remove',
        });
        break;
      default:
        this.setState({
          label: 'Add',
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.saved !== nextProps.saved) {
      if (nextProps.saved) {
        if (nextProps.operation === 'CREATE') {
          hashHistory.push('/instance-created');
        } else if (nextProps.operation === 'REMOVE' || nextProps.operation === 'UPDATE') {
          hashHistory.push('/');
        }
      } else {
        hashHistory.push('/');
      }
    }
  }

  onCancel() {
    this.props.resetMessage();
    hashHistory.push('/');
  }

  dispatchActions() {
    switch (this.props.operation) {
      case 'CREATE':
        this.props.saveInstance();
        break;
      case 'UPDATE':
        this.props.editInstance();
        break;
      case 'REMOVE':
        this.props.removeInstance();
        break;
      default:
        this.props.saveInstance();
    }
  }

  validateFields() {
    if (this.props.operation !== operations.REMOVE) {
      if (this.props.name === '') {
        this.props.showRequireName();
      } else {
        this.props.hideRequireName();
      }

      if (this.props.streamType === 'CHATROOM') {
        if (this.props.postingRooms.length === 0) {
          this.props.showRequireRooms();
        } else {
          this.props.hideRequireRooms();
        }
      } else {
        this.props.hideRequireRooms();
      }

      if (
        this.props.name === '' ||
        (this.props.streamType === 'CHATROOM' && this.props.postingRooms.length === 0)
      ) {
        return;
      }

      let _postingRooms = this.props.postingRooms;
      if (_postingRooms.length > 0) {
        //Remove duplicates
        _postingRooms.sort();
        alert(_postingRooms.length);
        /*
        for(let i = 0, n = _postingRooms.length; i <= n -1; i++) {
          if(_postingRooms[i].threadId == _postingRooms[i+1].threadId) {
            _postingRooms.splice(i,1);
            n--;
            i--;
          }
        }*/
      }

      this.setState({
        postingRooms: _postingRooms
      })
    }

    this.dispatchActions();
  }

  render() {
    return (
        <div className='submit-container'>
          <button
            className={this.props.instanceList.length > 0 ? 'button cancel-link' : 'hidden'}
            onClick={this.onCancel}
          >
            Cancel
          </button>
          <button className='button' onClick={this.validateFields}>{this.state.label}</button>
      </div>
    );
  }
}

SubmitInstance.propTypes = {
  saveInstance: PropTypes.func.isRequired,
  editInstance: PropTypes.func.isRequired,
  removeInstance: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  showRequireName: PropTypes.func.isRequired,
  showRequireRooms: PropTypes.func.isRequired,
  hideRequireName: PropTypes.func.isRequired,
  hideRequireRooms: PropTypes.func.isRequired,
  instanceList: PropTypes.arrayOf(PropTypes.object).isRequired,
  saved: PropTypes.bool,
  name: PropTypes.string,
  streamType: PropTypes.string,
  postingRooms: PropTypes.arrayOf(PropTypes.string),
  operation: PropTypes.string,
};

SubmitInstance.defaultProps = {
  saved: false,
  firstScreen: true,
};

export default SubmitInstance;
