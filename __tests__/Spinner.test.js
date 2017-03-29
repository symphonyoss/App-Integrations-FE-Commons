import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Spinner from '../components/Spinner/Spinner.jsx';

function setup() {
  const props = {
    loading: true,
  }

  const enzymeWrapper = shallow(<Spinner {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('Spinner', () => {

    const { enzymeWrapper } = setup();

    it('Should show loading message when state loading is true!', () => {
      expect(enzymeWrapper.find('p').text()).not.toBeNull();
    });

    it('Should have the class "spinner" when loading is false!', () => {
      const { props } = setup();
      props.loading = false;
      expect(enzymeWrapper.find('div').hasClass('spinner')).toEqual(true);
    });

    it('Should NOT have the class "spinner-opacity-0" when loading is true!', () => {
      expect(enzymeWrapper.find('div').hasClass('spinner-opacity-0')).toEqual(false);
    });

  });
});