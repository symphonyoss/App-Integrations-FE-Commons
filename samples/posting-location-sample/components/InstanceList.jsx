import React from 'react';
import { hashHistory } from 'react-router';
import {
  TableInstance,
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

const create = () => {
  hashHistory.push('/custom-create');
};

const InstanceList = () => (
  <div>
    <header style={styles.header}>
      <h1>My Custom Integration</h1>
      <div style={styles.content}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt a enim quis
        sagittis. Sed auctor nulla efficitur sollicitudin ullamcorper. Suspendisse faucibus velit et
        orci aliquam, quis pulvinar dui lobortis. Vivamus mattis tortor felis, vitae tristique
        libero dapibus eget. Vivamus gravida elit non varius facilisis. Mauris ac metus at erat
        facilisis laoreet. Morbi nec dignissim enim. Pellentesque vitae dui scelerisque, cursus
        magna interdum, lobortis lectus. Etiam convallis magna nec purus mattis volutpat. Cras
        tincidunt lorem nisl, sit amet mattis ex molestie placerat.</p>
      </div>
    </header>
    <TableInstance />
    <div style={styles.sub}>
      <button className='button' onClick={() => { create(); }}>Create Instance</button>
    </div>
  </div>
);

export default InstanceList;
