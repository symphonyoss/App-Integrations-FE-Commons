import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeStreamType,
} from '../../actions/';
import PostingLocation from './PostingLocation';

const mapStateToProps = state => ({
  streamType: state.instance.streamType,
  instance: state.instance,
  instanceList: state.instanceList.instances,
  appName: state.appParams.appName,
});

const mapDispatchToProps = dispatch => ({
  switchStreamType: st => dispatch(changeStreamType(st)),
});

const PostingLocationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostingLocation);

export default PostingLocationContainer;
