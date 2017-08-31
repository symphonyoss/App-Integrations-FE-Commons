/* eslint-disable react/no-unused-prop-types */
import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import DataRow from './DataRow';
import Spinner from '../../components/Spinner/Spinner';
import '../../styles/main.less';
import './styles/styles.less';

class TableInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 10,
    };
    this._timer = this._timer.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  componentWillMount() {
    this.props.getInstanceList();
  }

  componentDidMount() {
    this.intervalId = setInterval(this._timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.firstScreen &&
      nextProps.instanceList.length === 0 &&
      !nextProps.loading
    ) {
      hashHistory.push('/create-view');
      return;
    }
    if (nextProps.instanceList.length === 0 && !nextProps.loading) {
      this.props.showNoInstancesFound();
    }
  }

  onClickEdit(_instance) {
    this.props.resetMessage();
    this.props.showEditInstanceView(_instance);
    hashHistory.push('/edit-view');
  }

  onClickRemove(_instance) {
    this.props.showEditInstanceView(_instance);
    hashHistory.push('/remove-view');
  }

  _timer() {
    if (this.state.counter > 0) {
      this.setState({
        counter: this.state.counter - 1,
      });
      if (this.state.counter === 0 && this.props.loading) {
        this.props.defaultError();
      }
      return;
    }
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        {
          this.props.loading && this.state.counter > 0 && (<Spinner />)
        }
        <div className='wrapper table-instance'>
          <table className={this.props.loading ? 'instances' : 'instances table-opacity-1'}>
            <thead>
              <tr>
                <th><span>Description</span></th>
                <th><span>Active in</span></th>
                <th><span>Webhook URL</span></th>
                <th><span>Last Posted</span></th>
                <th><span>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {this.props.instanceList.map((item, index) => {
                // Validate posting location Rooms
                let seen = {};
                let uniqueArray = item.postingLocationRooms.filter(item => {
                  return seen.hasOwnProperty(item.threadId) ? false : (seen[item.threadId] = true);
                });

                const _instance = {
                  name: item.name,
                  appName: this.props.appName,
                  imShortHand: this.props.appIMShortHand,
                  streamType: item.streamType,
                  instanceId: item.instanceId,
                  baseWebHookURL: this.props.baseWebHookURL,
                  postingLocationRooms: uniqueArray,
                  lastPosted: item.lastPosted,
                };
                return (
                  <DataRow
                    instance={_instance}
                    onClickEdit={this.onClickEdit}
                    onClickRemove={this.onClickRemove}
                    key={index}
                    id={index}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TableInstance.propTypes = {
  appName: PropTypes.string.isRequired,
  appIMShortHand: PropTypes.string.isRequired,
  instanceList: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  baseWebHookURL: PropTypes.string,
  getInstanceList: PropTypes.func.isRequired,
  firstScreen: PropTypes.bool.isRequired,
  showEditInstanceView: PropTypes.func.isRequired,
  resetMessage: PropTypes.func.isRequired,
  typeMessage: PropTypes.string.isRequired,
  showNoInstancesFound: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
  messageText: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultError: PropTypes.func.isRequired,
};

export default TableInstance;
