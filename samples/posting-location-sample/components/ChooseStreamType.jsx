import React from 'react';
import {
  PostingLocation,
  SubmitInstance,
} from 'symphony-integration-commons';

const styles = {
  header: {
    paddingLeft: 15,
    maxWidth: 840,
  },
};

const ChooseStreamType = () => (
  <div>
    <header style={styles.header}>
      <h1>My Custom Integration</h1>
      <p>Choose a Chat one on one or IM type.</p>
    </header>
    <PostingLocation />
    <SubmitInstance operation='CREATE' />
  </div>
);

export default ChooseStreamType;
