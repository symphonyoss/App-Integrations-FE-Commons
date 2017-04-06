import React from 'react';
import { hashHistory } from 'react-router';
import {
  InputDescription,
} from 'symphony-integration-commons';

const styles = {
  header: {
    paddingLeft: 15,
    maxWidth: 840,
  },
  content: {
    marginBottom: 30,
  },
  sub: {
    paddingTop: 20,
    paddingLeft: 15,
    maxWidth: 840,
  },
};

const submit = () => {
  hashHistory.push('/choose-stream-type');
};

const cancel = () => {
  hashHistory.push('/');
};

const CustomCreate = () => (
  <div>
    <header style={styles.header}>
      <h1>My Custom Integration</h1>
      <div style={styles.content}>
        <p>This is my custom configurator App. Please, create an instance.</p>
      </div>
    </header>
    <InputDescription />
    <div style={styles.sub}>
      <button className='button cancel-link' onClick={() => { cancel(); }}>Cancel</button>
      <button className='button' onClick={() => { submit(); }}>Next</button>
    </div>
  </div>
);

export default CustomCreate;
