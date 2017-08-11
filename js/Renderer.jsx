import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Renderer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <entity>
        <card>
        <div className='setup-instructions-content'>
            ${this.props.template}
        </div>
        <h3>MyApp first custom renderer</h3>
        Click to say hello
        <hr/>
        <action id="sayhello"/>
        </card>
      </entity>
    );
  }
}

Renderer.propTypes = {
  template: PropTypes.element,
};

export default Renderer;