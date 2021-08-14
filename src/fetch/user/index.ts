import {User} from '../../models/user';
import {post} from '../post';

const AddUserEndpoint =
  'https://jv5hh62j8b.execute-api.ap-southeast-2.amazonaws.com/dev/';

export const addUserFetch = (user: User): Promise<Response> => {
  return post<User>(AddUserEndpoint, user);
};

export const registerUser = (user: User): Promise<Response> => {
  return post<User>(AddUserEndpoint, user);
}
