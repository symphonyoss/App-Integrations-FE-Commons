import React from 'react';
import './styles/styles.less';

const Spinner = () => (
  <div className='spinner'>
    <i className="fa fa-circle-o-notch fa-spin" />
    <p>Loading...</p>
  </div>
);

export default Spinner;
