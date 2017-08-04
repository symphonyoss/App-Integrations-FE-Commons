import React, { Component } from 'react';
import { connect } from 'react-redux';

class JiraComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Renderer>
          <div>
              "Hello"
          </div>    
      </Renderer>
    );
  }
}

export default connect(
  null,
)(JiraComponent);