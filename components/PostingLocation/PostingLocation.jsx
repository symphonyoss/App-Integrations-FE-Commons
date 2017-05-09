import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuggestionsRoomsContainer from './SuggestionsRooms/SuggestionsRoomsContainer';
import './styles/styles.less';

// Use named export for unconnected component (for tests)
export class PostingLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (this.props.instance.instanceId !== null && this.props.streamType === 'CHATROOM') {
      this.setState({
        suggestions: true,
      });
    }
  }

  onChange(e) {
    this.setState({
      suggestions: e.target.id !== 'IM',
    });
    this.props.switchStreamType(e.target.id === 'IM' ? 'IM' : 'CHATROOM');
  }

  render() {
    return (
      <div className='wrapper posting-location'>
        <header>
          <h2>Active In</h2>
        </header>
        <div className='radio-group'>
          <div className='radio'>
            <input
              type="radio"
              id='IM'
              name='posting'
              onChange={this.onChange}
              checked={this.props.streamType === 'IM'}
            />
            <label htmlFor="IM">
              {
                this.props.instanceList.filter(item => item.streamType === 'IM').length > 0 ? (
                  `Existing one-on-one chat with ${this.props.appName}`
                ) : `New one-on-one chat ${this.props.appName}`
              }
            </label>
          </div>
          <div className='radio'>
            <input
              type="radio"
              id='chat-room'
              name='posting'
              onChange={this.onChange}
              checked={this.props.streamType === 'CHATROOM'}
            />
            <div className='chat-room-info'>
              <label htmlFor="chat-room">Existing chat room</label>
              <p>
                You can only add this integration to a room of which you are an owner.
                You can choose one or more rooms.
              </p>
            </div>
          </div>
        </div>
        { this.state.suggestions && (<SuggestionsRoomsContainer />) }
      </div>
    );
  }
}

PostingLocation.propTypes = {
  streamType: PropTypes.string.isRequired,
  instance: PropTypes.shape(),
  instanceList: PropTypes.arrayOf(PropTypes.object).isRequired,
  switchStreamType: PropTypes.func.isRequired,
  appName: PropTypes.string.isRequired,
};

export default PostingLocation;
