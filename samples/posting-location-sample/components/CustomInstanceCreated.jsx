import React from 'react';
import { hashHistory } from 'react-router';
import {
  WebHookURL,
} from 'symphony-integration-commons';

const styles = {
  header: {
    paddingLeft: 15,
    maxWidth: 840,
  },
  sub: {
    paddingTop: 20,
    paddingLeft: 15,
    maxWidth: 840,
  },
};

const submit = () => {
  hashHistory.push('/');
};

const CustomInstanceCreated = () => (
  <div>
    <header style={styles.header}>
      <h1>My Custom Integration</h1>
      <h2>Webhook URL</h2>
    </header>
    <WebHookURL />
    <div style={styles.sub}>
      <button className='button' onClick={() => { submit(); }}>Done</button>
    </div>
  </div>
);

export default CustomInstanceCreated;
