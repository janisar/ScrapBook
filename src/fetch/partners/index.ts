import {Partner} from '../../models';
import {post} from '../post';

const AddPartnerEndpoint =
  'https://cxcnyn3v82.execute-api.ap-southeast-2.amazonaws.com/dev';

export const addPartnerFetch = (
  partner: Partner,
  userId: string,
): Promise<Response> => {
  return post(AddPartnerEndpoint, {...partner, userId: userId});
};
