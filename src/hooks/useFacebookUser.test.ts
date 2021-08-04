import {renderHook} from '@testing-library/react-hooks';
import {useFacebookUser} from './useFacebookUser';
import {User} from '../models/user';

jest.mock('react-native-fbsdk-next', () => ({
  Profile: {
    getCurrentProfile: async () => {
      return Promise.resolve({
        name: 'test user',
      });
    },
  },
}));

describe('USeFacebookUser.tests', () => {
  it('should create user', async () => {
    const user: User = {fbUserData: {accessToken: 'token'}};
    const {result, waitForNextUpdate} = renderHook(() => useFacebookUser(user));

    await waitForNextUpdate();
    expect(result.current[0]?.name).toBe('test user');
  });
});
