import React from 'react';
import { shallow } from 'enzyme';
import PostingLocation from '../components/PostingLocation/PostingLocation.jsx';

function setup() {
  const props = {
    streamType: 'IM',
    instance: { instanceId: 0 },
    instanceList: [],
    switchStreamType: jest.fn(),
    appName: 'Jira',
  }

  const enzymeWrapper = shallow(<PostingLocation {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Testing PostingLocation behavior', () => {
  
  it('When streamType is "IM", then the radio button "IM" must be checked!', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('input#IM').prop('checked')).toEqual(true);
  });

  it('When streamType is "CHATROOM", then the radio button "CHATROOM" must be checked!', () => {
    const { props } = setup();
    props.streamType = 'CHATROOM';
    const enzymeWrapper = shallow(<PostingLocation {...props} />);
    expect(enzymeWrapper.find('input#chat-room').prop('checked')).toEqual(true);
  });

});