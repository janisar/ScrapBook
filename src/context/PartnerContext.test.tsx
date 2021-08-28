import React, {FunctionComponent, useContext} from 'react';
import {render} from '@testing-library/react-native';
import {PartnerContext, PartnerContextProvider} from './PartnerContext';

jest.mock('@react-native-async-storage/async-storage', () => ({}));
jest.mock('../storage/AsyncStorage', () => ({}));
jest.mock('./UserContext', () => ({
  ProfileContext: jest.fn().mockReturnValue({
    profile: {},
  }),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
}));

const Test: FunctionComponent = () => {
  const {partners} = useContext(PartnerContext);
  console.log(partners);
  return <></>;
};

describe('Partner context tests', () => {
  it('should add new partner', () => {
    const {queryByTestId} = render(
      <PartnerContextProvider>
        <Test />
      </PartnerContextProvider>,
    );
  });
});
