import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMessageTemplate,
} from '../../actions/';
import Renderer from './Renderer';

const mapStateToProps = state => ({
  template: state.messageTemplate,
});

const mapDispatchToProps = dispatch => ({
  getMessageTemplate: () => dispatch(getMessageTemplate()),
});

const RendererContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Renderer);

export default RendererContainer;
